import shortid from 'shortid';
import {
    CreateReadStreamOptions,
    CreateWriteStreamOptions,
    GenerateSignedPostPolicyV4Options,
    Storage
} from '@google-cloud/storage';
import { PasteData } from './types';

let authData: {
    credentials?: { client_email?: string; private_key?: string };
} = {};

if (process.env.GCLOUD_CREDENTIALS) {
    authData = {
        credentials: JSON.parse(process.env.GCLOUD_CREDENTIALS)
    };
}

const storage = new Storage(authData);

const PasteBucket = 'enginehub-paste-data';
const PastePrefix = 'paste/';

export async function createPaste(
    content: string,
    metadata?: PasteData['metadata']
): Promise<string> {
    const id = shortid.generate();

    const options: CreateWriteStreamOptions = {
        gzip: true,
        public: true,
        resumable: false,
        contentType: 'text/plain',
        metadata: {
            metadata
        }
    };

    return await new Promise((resolve, reject) => {
        const stream = storage
            .bucket(PasteBucket)
            .file(`${PastePrefix}${id}`)
            .createWriteStream(options);

        stream.on('finish', () => resolve(id));

        stream.on('error', reject);

        stream.end(content);
    });
}

export async function getPaste(pasteId: string): Promise<PasteData> {
    const options: CreateReadStreamOptions = {
        decompress: true
    };

    const file = storage.bucket(PasteBucket).file(`${PastePrefix}${pasteId}`);

    const dataPromise = new Promise<Buffer>((resolve, reject) => {
        const stream = file.createReadStream(options);

        const buffers: Buffer[] = [];

        stream.on('data', chunk => {
            buffers.push(chunk);
        });
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(buffers)));
    });

    const [data, [metadata]] = await Promise.all([
        dataPromise,
        file.getMetadata()
    ]);

    if (!data) {
        throw new Error('Failed to find paste');
    }
    return {
        content: data.toString('utf-8'),
        metadata: metadata.metadata
    };
}

export async function signedUploadUrl(fields?: {
    [key: string]: string;
}): Promise<{
    pasteId: string;
    uploadUrl: string;
    uploadFields: { [key: string]: string };
}> {
    const id = shortid.generate();

    const options: GenerateSignedPostPolicyV4Options = {
        expires: Date.now() + 60 * 10 * 1000, // 10 minutes
        conditions: [['content-length-range', 0, 1024 * 1024 * 10]], // 10MB
        fields
    };

    const [data] = await storage
        .bucket(PasteBucket)
        .file(`${PastePrefix}${id}`)
        .generateSignedPostPolicyV4(options);

    return {
        pasteId: id,
        uploadUrl: data.url,
        uploadFields: data.fields
    };
}

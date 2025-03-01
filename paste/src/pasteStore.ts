import type {
    CreateReadStreamOptions,
    CreateWriteStreamOptions,
    GenerateSignedPostPolicyV4Options,
    GetSignedUrlConfig
} from '@google-cloud/storage';
import { Storage } from '@google-cloud/storage';
import shortid from 'shortid';

import { decryptGCloud } from '../../shared/src/utils/encryptedSecrets';
import { EXPIRY, MAX_SIZE, type PasteData } from './types';

let authData: {
    credentials?: { client_email?: string; private_key?: string };
    projectId?: string;
} = {};

if (process.env.GCLOUD_CREDENTIALS) {
    authData = {
        credentials: JSON.parse(
            Buffer.from(process.env.GCLOUD_CREDENTIALS, 'base64').toString(
                'utf8'
            )
        )
    };
} else {
    const decryptedData = decryptGCloud();
    if (decryptedData) {
        authData = {
            credentials: decryptedData,
            projectId: decryptedData.project_id
        };
    }
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

export async function getPaste(
    pasteId: string
): Promise<PasteData | undefined> {
    const options: CreateReadStreamOptions = {
        decompress: true
    };

    const file = storage.bucket(PasteBucket).file(`${PastePrefix}${pasteId}`);

    const dataPromise = new Promise<Buffer<ArrayBuffer>>((resolve, reject) => {
        const stream = file.createReadStream(options);

        const buffers: Buffer[] = [];

        stream.on('data', (chunk: Buffer) => {
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
        return undefined;
    }
    return {
        content: data.toString('utf8'),
        metadata: metadata.metadata || undefined
    };
}

export async function signedUploadUrl(headers?: {
    [key: string]: string;
}): Promise<{
    pasteId: string;
    uploadUrl: string;
}> {
    const id = shortid.generate();

    const options: GetSignedUrlConfig = {
        expires: Date.now() + EXPIRY,
        version: 'v4',
        action: 'write',
        extensionHeaders: headers
    };

    const [data] = await storage
        .bucket(PasteBucket)
        .file(`${PastePrefix}${id}`)
        .getSignedUrl(options);

    return {
        pasteId: id,
        uploadUrl: data
    };
}

export async function signedUploadUrlOld(fields?: {
    [key: string]: string;
}): Promise<{
    pasteId: string;
    uploadUrl: string;
    uploadFields: { [key: string]: string };
}> {
    const id = shortid.generate();

    const options: GenerateSignedPostPolicyV4Options = {
        expires: Date.now() + EXPIRY,
        conditions: [['content-length-range', 0, MAX_SIZE]],
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

import shortid from 'shortid';
import {
    CreateReadStreamOptions,
    CreateWriteStreamOptions,
    GenerateSignedPostPolicyV4Options,
    Storage
} from '@google-cloud/storage';

const storage = new Storage();

const PasteBucket = 'enginehub-paste-data';
const PastePrefix = 'paste/';

export async function createPaste(
    content: string,
    from?: string
): Promise<string> {
    const id = shortid.generate();

    const options: CreateWriteStreamOptions = {
        gzip: true,
        public: true,
        resumable: false,
        contentType: 'text/plain',
        metadata: {
            from: from ?? 'unknown'
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

export async function getPaste(pasteId: string): Promise<string> {
    const options: CreateReadStreamOptions = {
        decompress: true
    };

    const data = await new Promise<Buffer>((resolve, reject) => {
        const stream = storage
            .bucket(PasteBucket)
            .file(`${PastePrefix}${pasteId}`)
            .createReadStream(options);

        const buffers: Buffer[] = [];

        stream.on('data', chunk => {
            buffers.push(chunk);
        });
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(buffers)));
    });

    if (!data) {
        throw new Error('Failed to find paste');
    }
    return data.toString('utf-8');
}

export async function signedUploadUrl(): Promise<{
    pasteId: string;
    uploadUrl: string;
    uploadFields: { [key: string]: string };
}> {
    const id = shortid.generate();

    const options: GenerateSignedPostPolicyV4Options = {
        expires: Date.now() + 60 * 5 * 1000, // 5 minutes
        conditions: [['content-length-range', 0, 5242880]]
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

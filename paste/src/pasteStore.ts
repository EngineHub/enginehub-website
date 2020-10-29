import AWS from 'aws-sdk';
import shortid from 'shortid';

AWS.config.update({
    region: 'us-central1'
});

const s3 = new AWS.S3({
    endpoint: 'storage.googleapis.com'
});

const PasteS3Bucket = 'enginehub-paste-data';
const PastePrefix = 'paste/';

// 1 Month
const EXPIRY_TIME = 60 * 60 * 24 * 31 * 1;

export async function createPaste(
    content: string,
    from?: string
): Promise<string> {
    const created_at = Math.floor(Date.now() / 1000);
    const ttl = created_at + EXPIRY_TIME;
    const id = shortid.generate();

    await s3
        .putObject({
            Bucket: PasteS3Bucket,
            Key: `${PastePrefix}${id}`,
            Body: content,
            Expires: new Date(ttl * 1000),
            Metadata: {
                from: from || 'unknown'
            }
        })
        .promise();

    return id;
}

export async function getPaste(pasteId: string): Promise<string> {
    const data = await s3
        .getObject({
            Bucket: PasteS3Bucket,
            Key: `${PastePrefix}${pasteId}`
        })
        .promise();
    if (!data.Body) {
        throw new Error('Failed to find paste');
    }
    return data.Body.toString('utf-8');
}

export async function signedUploadUrl(): Promise<{
    pasteId: string;
    uploadUrl: string;
    uploadFields: { [key: string]: string };
}> {
    const id = shortid.generate();

    const data = s3.createPresignedPost({
        Bucket: PasteS3Bucket,
        Fields: {
            Key: `${PastePrefix}${id}`
        },
        Conditions: [
            ['content-length-range', 0, 5242880],
        ],
        Expires: 60 * 5
    });

    console.log(JSON.stringify(data.fields));

    return {
        pasteId: id,
        uploadUrl: data.url,
        uploadFields: data.fields
    };
}

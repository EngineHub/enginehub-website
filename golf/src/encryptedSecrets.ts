import crypto from 'crypto';

const encryptedGcloudCredentials = `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`;

const algorithm = 'aes-128-cbc';

export function decryptGCloud() {
    if (!process.env.GCLOUD_AES_IV || !process.env.GCLOUD_AES_SECRET) {
        return undefined;
    }

    const decipher = crypto.createDecipheriv(
        algorithm,
        process.env.GCLOUD_AES_SECRET,
        process.env.GCLOUD_AES_IV
    );

    let decrypted = decipher.update(
        encryptedGcloudCredentials,
        'base64',
        'utf8'
    );

    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
}

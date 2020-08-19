import { NextApiRequest, NextApiResponse } from 'next';
import { signedUploadUrl } from '@paste/pasteStore';

export default async function handle(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { pasteId, uploadUrl, uploadFields } = await signedUploadUrl();
        res.json({
            viewUrl: `https://paste.enginehub.org/${pasteId}`,
            uploadUrl,
            uploadFields
        });
    } catch (e) {
        console.log(e);
        res.json({ error: 'An unknown error occurred.' });
    }
}

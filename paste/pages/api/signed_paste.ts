import type { NextApiRequest, NextApiResponse } from 'next';

import { signedUploadUrlOld } from '../../src/pasteStore';

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const googleMetaHeaders = Object.keys(req.headers)
            .filter(key => key.startsWith('x-paste-meta-'))
            .reduce(
                (a, key) => {
                    const modifiedKey = key.replace(
                        'x-paste-meta-',
                        'x-goog-meta-'
                    );
                    a[modifiedKey] = req.headers[key] as string;
                    return a;
                },
                {} as { [key: string]: string }
            );
        const { pasteId, uploadUrl, uploadFields } =
            await signedUploadUrlOld(googleMetaHeaders);
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

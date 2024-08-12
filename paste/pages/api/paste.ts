import type { NextApiRequest, NextApiResponse } from 'next';

import { createPaste } from '../../src/pasteStore';

const MAX_CONTENT_LENGTH = 1024 * 1024; // 1MB (API Gateway Limit, for larger use the signed paste)

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // eslint-disable-next-line prefer-const
    let { content, ...metadata } = req.body;

    if (!content) {
        res.writeHead(400, 'Field "content" must be provided.');
        res.end();
        return;
    }

    if (content.length > MAX_CONTENT_LENGTH) {
        res.writeHead(413, `Content larger than ${MAX_CONTENT_LENGTH}`);
        res.end();
        return;
    }

    // Normalise line endings
    content = content.replace('\r\n', '\n');
    content = content.replace('\r', '\n');

    if (!content.trim()) {
        res.status(400);
        res.end();
        return;
    }

    try {
        const pasteResponse = await createPaste(content, metadata);
        res.json({
            url: `https://paste.enginehub.org/${pasteResponse}${
                metadata?.extension ? `.${metadata.extension}` : ''
            }`
        });
    } catch (e) {
        console.log(e);
        res.json({ error: 'An unknown error occurred.' });
    }
}

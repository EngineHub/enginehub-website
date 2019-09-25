import { NextApiRequest, NextApiResponse } from 'next';
import { createPaste } from '@paste/pasteStore';

const MAX_CONTENT_LENGTH = 5242880; // 5MB

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let { content, from } = req.body;

    if (!content) {
        res.writeHead(400, 'Field "content" must be provided.');
        res.end();
        return;
    }

    if (content.length > MAX_CONTENT_LENGTH) {
        res.writeHead(503, `Content larger than ${MAX_CONTENT_LENGTH}`);
        res.end();
        return;
    }

    // Normalise line endings
    content = content.replace('\r\n', '\n');
    content = content.replace('\r', '\n');

    if (!content.trim()) {
        res.writeHead(400);
        res.end();
        return;
    }

    try {
        const pasteResponse = await createPaste(content, from);
        res.json({ url: `https://paste.enginehub.org/${pasteResponse}` });
    } catch (e) {
        console.log(e);
        res.json({ error: 'An unknown error occurred.' });
    }
}

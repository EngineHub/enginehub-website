import { NextApiRequest, NextApiResponse } from 'next-server/dist/lib/utils';

const MAX_CONTENT_LENGTH = 5242880; // 5MB
// const MAX_PER_HOUR = 100;

export default function handle(req: NextApiRequest, res: NextApiResponse) {
    let { content } = req.body;
    console.log(content);

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

    res.end(JSON.stringify({ url: 'https://paste.enginehub.org/' }));
}

export const config = {

}
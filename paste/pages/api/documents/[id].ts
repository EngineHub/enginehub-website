import { NextApiRequest, NextApiResponse } from 'next';
import { loadPaste } from '@paste/loadPaste';

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    let pasteId = `${id}`;
    const dotIndex = id.lastIndexOf('.');
    if (dotIndex !== -1) {
        pasteId = pasteId.substring(0, dotIndex);
    }
    const pasteContents = await loadPaste(pasteId);
    if (!pasteContents) {
        res.setHeader('content-type', 'text/plain');
        res.write('Invalid Paste ID');
        res.status(404);
        res.end();
        return;
    }
    res.setHeader('content-type', 'text/plain');
    res.write(pasteContents.content);
    res.status(200);
    res.end();
}

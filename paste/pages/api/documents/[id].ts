import { NextApiRequest, NextApiResponse } from 'next';
import { loadPaste } from '../../../src/loadPaste';

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
    try {
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
    } catch (e) {
        res.setHeader('content-type', 'text/plain');
        res.write(JSON.stringify(e));
        res.status(500);
        res.end();
    }
}

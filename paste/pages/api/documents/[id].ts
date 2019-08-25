import {
    NextApiRequest,
    NextApiResponse
} from 'next-server/dist/lib/utils';
import { getPaste } from '@paste/loadPaste';

export default function handle(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    let pasteId = `${id}`;
    const dotIndex = id.lastIndexOf('.');
    if (dotIndex !== -1) {
        pasteId = pasteId.substring(0, dotIndex);
    }
    const pasteContents = getPaste(pasteId);
    if (!pasteContents) {
        res.end('Invalid Paste ID');
    }
    res.end(pasteContents);
}

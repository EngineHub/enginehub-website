import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllGolfs } from '../../src/databaseConnector';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        const golfs = await getAllGolfs();
        res.status(200);
        res.end(JSON.stringify(golfs));
    } catch (e) {
        console.error(e);
        res.status(500);
        res.end(JSON.stringify({ error: 'An unknown error occurred' }));
    }
};

export default handler;

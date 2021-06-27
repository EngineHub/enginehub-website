import { getAllGolfs } from '../../src/dynamoDb';
import { NextApiRequest, NextApiResponse } from 'next';

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

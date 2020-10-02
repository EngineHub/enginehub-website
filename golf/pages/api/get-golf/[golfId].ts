import { getGolfData } from '@golf/dynamoDb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { golfId } = req.query;

    try {
        const data = await getGolfData(golfId as string);

        if (!data) {
            res.status(404);
            res.end(JSON.stringify({ error: 'Unknown golf! ' }));
            return;
        }

        res.status(200);
        res.end(
            JSON.stringify(data)
        );
    } catch (e) {
        console.error(e);
        res.status(500);
        res.end(JSON.stringify({ error: 'An unknown error occurred' }));
    }
};

export default handler;

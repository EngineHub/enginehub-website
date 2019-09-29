import { getGolf, getLeaderboard, getUsers } from '@golf/dynamoDb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { golfId } = req.query;

    try {
        const [golf, leaderboards] = await Promise.all([
            getGolf(golfId as string),
            getLeaderboard(golfId as string)
        ]);

        if (!golf) {
            res.status(404);
            res.end(JSON.stringify({ error: 'Unknown golf! ' }));
            return;
        }

        let userMap = {};

        if (leaderboards && leaderboards.length > 0) {
            const sortedLeaderboards = leaderboards.sort((a, b) => {
                return a.score - b.score || a.submitted_time - b.submitted_time;
            });
            const leaderUsers = sortedLeaderboards.map(lead => lead.user_id);
            const users = await getUsers(leaderUsers);
            userMap = users.reduce((a, b) => {
                a[b.user_id] = b;
                return a;
            }, {});
        }

        res.status(200);
        res.end(
            JSON.stringify({
                golf,
                leaderboards,
                userMap
            })
        );
    } catch (e) {
        console.error(e);
        res.status(500);
        res.end(JSON.stringify({ error: 'An unknown error occurred' }));
    }
};

export default handler;

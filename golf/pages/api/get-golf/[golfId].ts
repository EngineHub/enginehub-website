import { getGolf, getLeaderboard, getUsers } from '@golf/dynamoDb';
import { NextApiRequest, NextApiResponse } from 'next-server/dist/lib/utils';

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

        if (leaderboards) {
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
        res.status(500);
        res.end(JSON.stringify({ error: 'An unknown error occurred' }));
    }
};

export default handler;

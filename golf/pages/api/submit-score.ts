import safeCompare from 'safe-compare';
import { addLeaderboard } from '@golf/dynamoDb';
import { withAuth } from '@golf/auth';

const EXPECTED_KEY = process.env.BROKER_API_KEY || 'TEST_KEY';

const handler = withAuth(async (req, res) => {
    const { api_key, golfId, score, commands } = req.body;

    if (!safeCompare(api_key, EXPECTED_KEY)) {
        res.status(403);
        res.end(`Invalid API Key`);
        return;
    }

    try {
        await addLeaderboard({
            golf_id: golfId,
            score: score,
            user_id: req.githubId,
            commands,
            submitted_time: Date.now()
        });
        res.end('Score submitted');
    } catch (e) {
        console.error(e);
        res.status(501);
        res.end('Failed to submit score');
    }
});

export default handler;

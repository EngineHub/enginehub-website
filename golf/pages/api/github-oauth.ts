/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';
import jwt from 'jsonwebtoken';
import { addUser } from '../../src/databaseConnector';

interface UserResponse {
    body: {
        id: string;
        avatar_url: string;
        login: string;
        name: string;
    };
}

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.setHeader('content-type', 'application/json');

    if (req.method !== 'POST') {
        res.status(400);
        res.end();
        return;
    }

    const { code } = req.body;

    if (!code) {
        res.status(400);
        res.end();
        return;
    }

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

    const { body } = (await got(url)) as { body: string };

    const data = body.split('&').reduce((acc, a) => {
        const [key, value] = a.split('=');
        acc[key] = value;
        return acc;
    }, {} as { [key: string]: string });

    if (data.error) {
        res.write(JSON.stringify(data));
        res.status(500);
        res.end();
        return;
    }

    const { access_token, token_type } = data;

    if (token_type !== 'bearer') {
        res.write(
            JSON.stringify({
                error: `expected bearer token but got ${token_type}`
            })
        );
        res.status(500);
        res.end();
        return;
    }

    let token: string;

    try {
        const {
            body: { id: github_id, avatar_url, name, login }
        }: UserResponse = await got('https://api.github.com/user', {
            responseType: 'json',
            headers: { authorization: `token ${access_token}` }
        });

        await addUser({
            user_id: github_id,
            avatar: avatar_url,
            fullname: name,
            username: login
        });

        token = jwt.sign(
            {
                githubId: github_id
            },
            process.env.JWT_SECRET!,
            { expiresIn: '30d' }
        );
    } catch (e) {
        console.error(e);
        res.status(500);
        res.write(JSON.stringify({ error: 'Something happened' }));
        res.end();
        return;
    }

    res.status(200);
    res.write(JSON.stringify({ token }));
    res.end();

    return;
}

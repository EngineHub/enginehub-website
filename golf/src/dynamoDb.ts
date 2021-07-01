import { Golf, GolfLeaderboard, User } from './types/database';
import { Firestore } from '@google-cloud/firestore';

let authData: {
    credentials?: { client_email?: string; private_key?: string };
} = {};

if (process.env.GCLOUD_CREDENTIALS) {
    authData = {
        credentials: JSON.parse(
            Buffer.from(process.env.GCLOUD_CREDENTIALS, 'base64').toString(
                'utf-8'
            )
        )
    };
}

const firestore = new Firestore(authData);

const ChallengesCollection = 'worldedit_golf_challenges';
const LeaderboardSubcollection = 'leaderboard';
const UsersCollection = 'worldedit_golf_users';

const TEST_GOLF = {
    golf_id: 'test',
    start_schematic:
        'H4sIAAAAAAAAAF1OXUvDQBCc3GHTnIr/wZ8h2Aex4INFQbF+IGVNN8lieoHcgvrqH/Wn6J4KFedl2JndmQ2oruqON6RSe4RL6lmVF/QKwAeUv4LHwUYi1yM1epR0iGy+89jfqiSjaYXH4VZrR0pp9dQP9fNDisPL23FDfeJHZHiUNzwmGWK+c5icc2y1gwuYLlhpTUoe1XJ+0TSJ9fbT8Ge++zfff4dazBlL2ylcieokN59ajjnTbBdF4Rx2lrLORRX2rqXneVRR4RTyxi4mP3n5Q2v4MJ4Zv+MLMXi6PSsBAAA=',
    test_schematic:
        'H4sIAAAAAAAAA11P20rEQAw9ncHtdrx8hJ8h6IO44IOLguJ6QSS2aRvsTqETUF/9UT9FM6ywYiAk53BykgRU13XPa1KpS1Snw1i/npESgLkliqJwDrNzlq5X5PaCY6c9XMB8yUqNiT2q1eKybRPr3bfFH3z/Dz9kU+xitoHWexN8WT2x+hlQXtHAquyxv5bI9UStHpFM+RaPwy3XTZTS80s++DHF8e3juKUh8VP29zjYChPFxjhnbPg1X9J7VlXYu5GBF1FFhVPYjJa3PCUZY97osLOSJr+LH/Ay+vAqAQAA',
    title: 'Test Golf',
    description: 'A test golf',
    created_at: Date.now(),
    user_id: 'test'
};

async function getGolf(golfId: string): Promise<Golf> {
    if (process.env.NODE_ENV !== 'production' && golfId === 'test') {
        return Promise.resolve(TEST_GOLF);
    }

    const document = firestore.collection(ChallengesCollection).doc(golfId);
    const data = await document.get();
    return data.data() as Golf;
}

async function getLeaderboards(golfId: string): Promise<GolfLeaderboard[]> {
    if (process.env.NODE_ENV !== 'production' && golfId === 'test') {
        return Promise.resolve([
            {
                golf_id: 'test',
                user_id: 'test2',
                score: 1,
                commands: '//replace stone sand',
                submitted_time: Date.now()
            },
            {
                golf_id: 'test',
                user_id: 'test3',
                score: 2,
                commands: '//replace stone cake\n//replace cake sand',
                submitted_time: Date.now()
            }
        ]);
    }

    return (
        await firestore.getAll(
            ...(await firestore
                .collection(ChallengesCollection)
                .doc(golfId)
                .collection(LeaderboardSubcollection)
                .listDocuments())
        )
    ).map(leaderboard => leaderboard.data() as GolfLeaderboard);
}

export async function getAllGolfs(): Promise<Golf[]> {
    // if (process.env.NODE_ENV !== 'production') {
    //     return Promise.resolve([TEST_GOLF, TEST_GOLF, TEST_GOLF]);
    // }

    const data = await firestore.getAll(
        ...(await firestore.collection(ChallengesCollection).listDocuments())
    );
    return data.map(dat => dat.data() as Golf);
}

export async function getGolfData(golfId: string): Promise<
    | {
          golf: Golf;
          leaderboards: GolfLeaderboard[];
          userMap: { [key: string]: User };
      }
    | undefined
> {
    const [golf, leaderboards] = await Promise.all([
        getGolf(golfId),
        getLeaderboards(golfId)
    ]);

    if (!golf) {
        return undefined;
    }

    const usersToLookup = new Set<string>();
    let userMap = {};

    if (leaderboards) {
        leaderboards.forEach(lead => usersToLookup.add(`${lead.user_id}`));
    }
    usersToLookup.add(`${golf.user_id}`);

    const users = await getUsers([...usersToLookup]);
    userMap = users.reduce((a, b) => {
        a[b.user_id] = b;
        return a;
    }, {});

    const sortedLeaderboards = (leaderboards || []).sort((a, b) => {
        return a.score - b.score || a.submitted_time - b.submitted_time;
    });

    return {
        golf,
        leaderboards: sortedLeaderboards,
        userMap
    };
}

export async function addGolf(golf: Golf): Promise<void> {
    const documentReference = firestore
        .collection(ChallengesCollection)
        .doc(golf.golf_id);

    await documentReference.set(golf);
}

export async function addLeaderboard(
    golfId: string,
    leaderboard: GolfLeaderboard
): Promise<void> {
    const documentReference = firestore
        .collection(ChallengesCollection)
        .doc(golfId)
        .collection(LeaderboardSubcollection)
        .doc(leaderboard.user_id);

    let existingEntry = undefined;
    try {
        const existing = await documentReference.get();
        if (existing.exists) {
            existingEntry = existing.data() as GolfLeaderboard;
        }
    } catch (e) {}
    if (existingEntry && existingEntry.score <= leaderboard.score) {
        // Don't add a score worse than their best
        return;
    }

    await documentReference.set(leaderboard, { merge: true });
}

export async function addUser(user: User): Promise<void> {
    const document = firestore.collection(UsersCollection).doc(user.user_id);
    await document.set(user, {
        merge: true
    });
}

export async function getUser(userId: string): Promise<User> {
    // if (process.env.NODE_ENV !== 'production') {
    //     return Promise.resolve({
    //         user_id: userId,
    //         fullname: 'Test Testerson',
    //         username: 'test2',
    //         avatar: 'https://enginehub.org/static/f424a77f87272f1081deb39d11e08bf4/4da7c/worldedit-icon.png'
    //     });
    // }

    const document = firestore.collection(UsersCollection).doc(userId);
    const data = await document.get();
    return data.data() as User;
}

async function getUsers(userIds: string[]): Promise<User[]> {
    // if (process.env.NODE_ENV !== 'production') {
    //     return Promise.resolve(
    //         userIds.map(userId => ({
    //             user_id: userId,
    //             fullname: 'Test Testerson',
    //             username: 'test2',
    //             avatar: 'https://enginehub.org/static/f424a77f87272f1081deb39d11e08bf4/4da7c/worldedit-icon.png'
    //         }))
    //     );
    // }

    const users = await firestore.getAll(
        ...userIds.map(userId =>
            firestore.collection(UsersCollection).doc(userId)
        )
    );
    return users.map(user => user.data() as User);
}

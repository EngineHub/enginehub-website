import type { GetStaticProps } from 'next';
import Link from 'next/link';

import { BrandButton, Button, Container, SEO } from '@enginehub/shared';

import { useIsLoggedIn } from '../src/components/Auth';
import { BrandHeader } from '../src/components/BrandHeader';
import { OpenChallenge } from '../src/components/OpenChallenges';
import { getAllGolfs } from '../src/databaseConnector';
import Layout from '../src/Layout';
import type { Golf } from '../src/types/database';

interface HomeProps {
    golfs: Golf[];
}

function Home({ golfs }: HomeProps) {
    const isAuthenticated = useIsLoggedIn();

    return (
        <Layout>
            <SEO
                title="WorldEdit Golf"
                description="For WorldEdit Pros, every command counts. Pick a challenge, write some commands, and show us what you've got."
            />
            <div className={Container}>
                <BrandHeader isHomePage={true} />
                {isAuthenticated && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '2rem'
                        }}
                    >
                        <Link
                            className={`${Button} ${BrandButton}`}
                            style={{ fontSize: '22px' }}
                            href="/submit"
                        >
                            New Challenge
                        </Link>
                    </div>
                )}
                <OpenChallenge golfs={golfs} />
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    try {
        return {
            props: { golfs: await getAllGolfs() },
            revalidate: 3600
        };
    } catch (e) {
        return { props: { error: e, golfs: [] }, revalidate: 3600 };
    }
};

export default Home;

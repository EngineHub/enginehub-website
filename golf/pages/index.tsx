import { OpenChallenge } from '../src/components/OpenChallenges';
import { useIsLoggedIn } from '../src/components/Auth';
import Layout from '../src/Layout';
import type { Golf } from '../src/types/database';
import { Container, SEO, Button, BrandButton } from '@enginehub/shared';
import Link from 'next/link';
import { BrandHeader } from '../src/components/BrandHeader';
import { getAllGolfs } from '../src/databaseConnector';
import type { GetStaticProps } from 'next';

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

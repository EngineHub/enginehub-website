import React from 'react';
import { OpenChallenge } from '@golf/components/OpenChallenges';
import { useIsLoggedIn } from '@golf/components/Auth';
import { getAllGolfs } from '@golf/dynamoDb';
import styled from '@emotion/styled';
import Layout from '@golf/Layout';
import { Golf } from '@golf/types/database';
import { PurpleButtonStyle } from '@shared/components/Button';
import Link from 'next/link';
import { Container } from '@shared/components/Container';
import SEO from '@shared/components/Seo';
import { BrandHeader } from '@golf/components/BrandHeader';

const isServerRendered = typeof window === 'undefined';

const ChallengeButton = styled.a`
    ${PurpleButtonStyle()}
    font-size: 22px;
    margin: auto;
    display: block;
`;

interface HomeProps {
    golfs: Golf[];
}

function Home({ golfs }: HomeProps) {
    const isAuthenticated = useIsLoggedIn();

    return (
        <Layout>
            <SEO title="WorldEdit Golf" />
            <Container>
                <BrandHeader isHomePage={true} />
                {isAuthenticated && !isServerRendered && (
                    <Link href="/submit" passHref={true}>
                        <ChallengeButton>
                            New Challenge
                        </ChallengeButton>
                    </Link>
                )}
                <OpenChallenge golfs={golfs} />
            </Container>
        </Layout>
    );
};

Home.getInitialProps = async () => {
    try {
        const golfs = await getAllGolfs();
        return { golfs };
    } catch (e) {
        return { error: e, golfs: [] };
    }
};

export default Home;

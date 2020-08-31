import React from 'react';
import { OpenChallenge } from '@golf/components/OpenChallenges';
import { useIsLoggedIn } from '@golf/components/Auth';
import styled from 'styled-components';
import Layout from '@golf/Layout';
import { Golf } from '@golf/types/database';
import { PurpleButtonStyle } from '@shared/components/Button';
import Link from 'next/link';
import { Container } from '@shared/components/Container';
import SEO from '@shared/components/Seo';
import { BrandHeader } from '@golf/components/BrandHeader';
import axios from 'axios';

const ChallengeButton = styled.a`
    ${PurpleButtonStyle()}
    font-size: 22px;
`;

const NewChallengeBlock = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
`;

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
            <Container>
                <BrandHeader isHomePage={true} />
                {isAuthenticated && (
                    <NewChallengeBlock>
                        <Link href="/submit" passHref={true}>
                            <ChallengeButton>New Challenge</ChallengeButton>
                        </Link>
                    </NewChallengeBlock>
                )}
                <OpenChallenge golfs={golfs} />
            </Container>
        </Layout>
    );
}

Home.getInitialProps = async () => {
    try {
        const { data } = await axios.get(
            `${process.env.API_PREFIX}/api/get-golfs`
        );
        return { golfs: data };
    } catch (e) {
        return { error: e, golfs: [] };
    }
};

export default Home;

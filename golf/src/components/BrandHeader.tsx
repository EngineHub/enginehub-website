import React from 'react';
import styled from 'styled-components';
import { Logo } from './Logo/Logo';
import Link from 'next/link';

const StyledContainerBase = styled.div<{ isHome: boolean }>`
    width: 100%;
    align-items: center;
    padding: 0.625rem 0;
    margin: auto;

    ${({ isHome }) => (isHome ? 'max-width: 800px' : 'max-width: 400px')};

    h2 {
        font-size: ${({ isHome }) => (isHome ? '48px' : '24px')};
        text-align: center;
        color: #333333;
    }

    p {
        font-size: ${({ isHome }) => (isHome ? '32px' : '18px')};
        text-align: center;
        color: #333333;
    }
`;

const StyledContainer = styled(StyledContainerBase)`
    display: flex;
    margin-top: 32px;
    flex-direction: row;
    justify-content: center;
    > :not(:last-child) {
        margin-right: 10px;
    }
`;

const HeaderLink = styled.a`
    color: rgb(51, 51, 51);
    text-decoration: none;
`;

const HorizontalDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const BrandHeader: React.FC<{ isHomePage?: boolean }> = ({
    isHomePage = false
}) => (
    <div>
        <StyledContainer isHome={isHomePage}>
            <Link href="/" passHref={true} legacyBehavior={true}>
                <HeaderLink>
                    <HorizontalDiv>
                        <Logo />
                        <h1 style={{ marginLeft: '0.5rem' }}>WorldEdit Golf</h1>
                    </HorizontalDiv>
                </HeaderLink>
            </Link>
        </StyledContainer>
        {isHomePage && (
            <StyledContainerBase isHome={isHomePage}>
                <h2>For WorldEdit pros, every command counts</h2>
                <p>
                    Pick a challenge, write some commands, and see how you stack
                    up.
                </p>
            </StyledContainerBase>
        )}
    </div>
);

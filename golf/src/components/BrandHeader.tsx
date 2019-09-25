import React from 'react';
import styled from '@emotion/styled';
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

export const BrandHeader: React.FC<{ isHomePage?: boolean }> = ({
    isHomePage = false
}) => (
    <div>
        <StyledContainer isHome={isHomePage}>
            <Logo />
            <h1>
                <Link as="/" href="/" passHref={true}>
                    <HeaderLink>WorldEdit Golf</HeaderLink>
                </Link>
            </h1>
        </StyledContainer>
        {isHomePage && (
            <StyledContainerBase isHome={isHomePage}>
                <h2>Real WorldEdit ninjas count every command - do you?</h2>
                <p>
                    Pick a challenge, write some commands, and show us what you
                    got.
                </p>
            </StyledContainerBase>
        )}
    </div>
);

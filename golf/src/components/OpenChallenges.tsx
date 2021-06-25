import React from 'react';
import styled from 'styled-components';
import { Schematic } from './Schematic';
import Link from 'next/link';
import { MainLinkStyle } from '@enginehub/shared';
import { Golf } from '../types/database';

const Entries = styled.div`
    > div:not(:last) {
        border-bottom: 2px red;
    }
`;

export interface ChallengeEntryProps {
    schematic: string;
    title: string;
    description: string;
    golfId: string;
}

interface OpenChallengeProps {
    golfs: Golf[];
}

const DEFAULT_SIZE = 140;

const ChallengeEntryContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 12px 0;
    padding: 8px 0;

    canvas {
        width: ${DEFAULT_SIZE}px;
        height: ${DEFAULT_SIZE}px;
    }
`;

const InfoContainer = styled.div`
    flex-grow: 1;
    margin-left: 22px;

    a {
        h3 {
            font-size: 28px;
            margin: 0;
            font-weight: normal;
        }
    }

    h4 {
        font-size: 18px;
        margin: 0;
    }
`;

const HeaderLink = styled.a`
    ${MainLinkStyle()}

    font-size: 1.125rem;
    line-height: 1.4375rem;
    display: inline-block;
    text-decoration: none;
    color: black;
    padding: 8px 0px;
    cursor: pointer;

    :hover {
        color: black;
        font-size: 1.125rem;
        line-height: 1.4375rem;
        display: inline-block;
        text-decoration: none;
    }
`;

const Paragraph = styled.p`
    margin: 16px 0;
    color: black;
    font-size: 16px;
`;

export const ChallengeEntry: React.FC<ChallengeEntryProps> = ({
    schematic,
    title,
    description,
    golfId,
    ...rest
}) => {
    return (
        <ChallengeEntryContainer {...rest}>
            <Schematic schematic={schematic} size={DEFAULT_SIZE} />
            <InfoContainer>
                <Link href={`/golf/${golfId}`}>
                    <HeaderLink>
                        <h3>{title}</h3>
                    </HeaderLink>
                </Link>
                <Paragraph>{description}</Paragraph>
            </InfoContainer>
        </ChallengeEntryContainer>
    );
};

const ChallengeTitle = styled.h2`
    font-size: 24px;
`;

export const OpenChallenge: React.FC<OpenChallengeProps> = ({
    children,
    golfs
}) => (
    <>
        <ChallengeTitle>Open Challenges</ChallengeTitle>
        <Entries>
            {golfs.map((golf, i) => (
                <ChallengeEntry
                    schematic={golf.test_schematic}
                    description={golf.description}
                    golfId={golf.golf_id}
                    title={golf.title}
                    key={`${golf.golf_id}-${i}`}
                />
            ))}
            {children}
        </Entries>
    </>
);

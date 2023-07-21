import type { FC, PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import { Schematic } from './Schematic';
import Link from 'next/link';
import { MainLink } from '@enginehub/shared';
import type { Golf } from '../types/database';
import {
    Paragraph,
    HeaderTitle,
    InfoContainer,
    ChallengeEntryContainer,
    HeaderLink
} from './OpenChallenges.module.css';

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

export const ChallengeEntry: FC<ChallengeEntryProps> = ({
    schematic,
    title,
    description,
    golfId,
    ...rest
}) => {
    return (
        <div className={ChallengeEntryContainer} {...rest}>
            <Schematic schematic={schematic} size={DEFAULT_SIZE} />
            <div className={InfoContainer}>
                <Link
                    className={`${MainLink} ${HeaderLink}`}
                    href={`/golf/${golfId}`}
                >
                    <h3 className={HeaderTitle}>{title}</h3>
                </Link>
                <p className={Paragraph}>{description}</p>
            </div>
        </div>
    );
};

const ChallengeTitle = styled.h2`
    font-size: 24px;
`;

export const OpenChallenge: FC<PropsWithChildren<OpenChallengeProps>> = ({
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

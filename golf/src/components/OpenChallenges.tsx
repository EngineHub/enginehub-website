import Link from 'next/link';
import type { FC, PropsWithChildren } from 'react';

import { MainLink } from '@enginehub/shared';

import type { Golf } from '../types/database';
import {
    ChallengeEntryContainer,
    HeaderLink,
    HeaderTitle,
    InfoContainer,
    Paragraph
} from './OpenChallenges.module.css';
import { Schematic } from './Schematic';

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

export const OpenChallenge: FC<PropsWithChildren<OpenChallengeProps>> = ({
    children,
    golfs
}) => (
    <>
        <h2 style={{ fontSize: '24px' }}>Open Challenges</h2>
        <div>
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
        </div>
    </>
);

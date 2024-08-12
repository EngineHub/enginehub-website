import type { FC, PropsWithChildren } from 'react';

import {
    AvatarIcon,
    Container,
    EntryContainer,
    InfoContainer,
    NameContainer,
    StrokeCount
} from './Leaderboard.module.css';

interface LeaderboardProps {
    name: string;
    avatar: string;
    created: string;
    strokes: number;
    githubId: string;
}

export const LeaderboardEntry: FC<LeaderboardProps> = ({
    name,
    created,
    avatar,
    strokes,
    githubId,
    ...props
}) => (
    <li className={EntryContainer} {...props}>
        <img className={AvatarIcon} src={avatar} alt={name} />
        <div className={InfoContainer}>
            <h4 className={NameContainer}>
                {name} /{' '}
                <a target="__blank" href={`https://github.com/${githubId}`}>
                    @{githubId}
                </a>
            </h4>
            <div>{created}</div>
        </div>
        <div className={StrokeCount}>{strokes}</div>
    </li>
);

export const Leaderboard: FC<PropsWithChildren<unknown>> = ({
    children,
    ...props
}) => (
    <div className={Container} {...props}>
        {children}
    </div>
);

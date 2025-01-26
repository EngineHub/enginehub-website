import Link from 'next/link';

import { MainLink } from '@enginehub/shared';

import type { BuildChange } from './types';

export function getUsernameFromChange(buildChange: BuildChange): string {
    if (buildChange.commiter.users.user.length > 0) {
        const user = buildChange.commiter.users.user.find(
            u => u.name || u.username
        );

        return user?.name ?? user?.username ?? buildChange.commiter.vcsUsername;
    }
    return buildChange.commiter.vcsUsername;
}

export function getLinkFromChange(
    buildChange: BuildChange
): string | undefined {
    if (buildChange.commiter.users.user.length > 0) {
        const user = buildChange.commiter.users.user.find(u => u.username);

        if (user) {
            return `https://github.com/${user.username}`;
        }
    }

    return undefined;
}

export const CommiterName = ({ buildChange }: { buildChange: BuildChange }) => {
    const linkFromChange = getLinkFromChange(buildChange);
    if (linkFromChange) {
        return (
            <Link href={linkFromChange} className={MainLink}>
                {getUsernameFromChange(buildChange)}
            </Link>
        );
    }

    return <>{getUsernameFromChange(buildChange)}</>;
};

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

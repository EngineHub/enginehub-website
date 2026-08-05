import Link from 'next/link';

import { MainLink } from '@enginehub/shared';

import type { BuildChange } from './types';

interface ChangeAuthor {
    name: string;
    link?: string;
}

const GITHUB_NOREPLY_PATTERN =
    /^(?:\d+\+)?([^@]+)@users\.noreply\.github\.com$/i;

function getCoAuthorFromLine(line: string): ChangeAuthor | undefined {
    const trimmedLine = String(line).trim();
    const prefix = 'co-authored-by:';
    if (!String(trimmedLine).toLowerCase().startsWith(prefix)) {
        return undefined;
    }

    const author = String(trimmedLine).slice(prefix.length).trim();
    const emailStart = String(author).lastIndexOf('<');
    if (emailStart <= 0 || !String(author).endsWith('>')) {
        return undefined;
    }

    const name = String(author).slice(0, emailStart).trim();
    const email = String(author)
        .slice(emailStart + 1, -1)
        .trim();
    if (!name || !email) {
        return undefined;
    }

    // TODO Maybe add some other mapping here for frequent users.
    const username = GITHUB_NOREPLY_PATTERN.exec(email)?.[1];
    return {
        name,
        link: username ? `https://github.com/${username}` : undefined
    };
}

function getCoAuthorsFromChange(buildChange: BuildChange): ChangeAuthor[] {
    return buildChange.comment
        .split(/\r?\n/)
        .flatMap(line => getCoAuthorFromLine(line) ?? []);
}

export function getCommentFromChange(buildChange: BuildChange): string {
    const commentLines = buildChange.comment.split(/\r?\n/);
    const hasCoAuthorTrailer = commentLines.some(line =>
        Boolean(getCoAuthorFromLine(line))
    );
    const lines = commentLines.filter(line => !getCoAuthorFromLine(line));

    while (lines.at(-1)?.trim() === '') {
        lines.pop();
    }
    if (hasCoAuthorTrailer && /^-{3,}$/.test(lines.at(-1)?.trim() ?? '')) {
        lines.pop();
    }

    return lines.join('\n').trim();
}

export function getCommentsFromChange(buildChange: BuildChange): string[] {
    return getCommentFromChange(buildChange)
        .split(/\r?\n\*/)
        .map(comment => String(comment).trim())
        .filter(comment => String(comment).length > 0);
}

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

const AuthorName = ({ author }: { author: ChangeAuthor }) => {
    if (author.link) {
        return (
            <Link href={author.link} className={MainLink}>
                {author.name}
            </Link>
        );
    }

    return <>{author.name}</>;
};

function getCoAuthorSeparator(index: number, authorCount: number): string {
    if (index === 0) {
        return '';
    }
    if (index < authorCount - 1) {
        return ', ';
    }
    return authorCount === 2 ? ' and ' : ', and ';
}

export const CommiterName = ({
    buildChange,
    showCoAuthors = true
}: {
    buildChange: BuildChange;
    showCoAuthors?: boolean;
}) => {
    const committer = {
        name: getUsernameFromChange(buildChange),
        link: getLinkFromChange(buildChange)
    };
    const coAuthors = showCoAuthors ? getCoAuthorsFromChange(buildChange) : [];

    return (
        <>
            <AuthorName author={committer} />
            {coAuthors.length > 0 && (
                <span>
                    {' with '}
                    {coAuthors.map((author, index) => (
                        <span key={`${author.link ?? author.name}-${index}`}>
                            {getCoAuthorSeparator(index, coAuthors.length)}
                            <AuthorName author={author} />
                        </span>
                    ))}
                </span>
            )}
        </>
    );
};

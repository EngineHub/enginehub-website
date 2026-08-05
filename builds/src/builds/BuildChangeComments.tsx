import Link from 'next/link';
import type { ReactNode } from 'react';

import { MainLink } from '@enginehub/shared';

import { NestedComments } from './BuildChangeComments.module.css';
import type { BuildChange } from './types';
import { getCommentsFromChange } from './vcsUsernameMapping';

const ISSUE_REFERENCE_PATTERN = /^(#[1-9]\d*)$/;

function LinkedComment({
    comment,
    vcsRoot
}: {
    comment: string;
    vcsRoot: string;
}) {
    return String(comment)
        .split(/(#[1-9]\d*)/)
        .map((part, index) => {
            if (!ISSUE_REFERENCE_PATTERN.test(part)) {
                return part;
            }

            const issueNumber = String(part).slice(1);
            return (
                <Link
                    key={`${issueNumber}-${index}`}
                    className={MainLink}
                    // This _might_ be a PR, but we can't tell. GH auto-redirects so it's fine
                    href={`${vcsRoot}/issues/${issueNumber}`}
                >
                    {part}
                </Link>
            );
        });
}

export function BuildChangeComments({
    buildChange,
    vcsRoot,
    suffix
}: {
    buildChange: BuildChange;
    vcsRoot: string;
    suffix?: ReactNode;
}) {
    const [comment, ...details] = getCommentsFromChange(buildChange);
    if (!comment) {
        return null;
    }

    return (
        <li>
            <LinkedComment comment={comment} vcsRoot={vcsRoot} />
            {suffix && <> {suffix}</>}
            {details.length > 0 && (
                <ul className={NestedComments}>
                    {details.map((detail, index) => (
                        <li key={`${buildChange.version}-${index}`}>
                            <LinkedComment comment={detail} vcsRoot={vcsRoot} />
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}

import { WarningBox, Button, SecondaryButton } from '@enginehub/shared';
import Link from 'next/link';
import type { FC } from 'react';

interface BranchWarningProps {
    projectId: string;
    currentBranch: string;
    mainBranch: string;
}

const BranchWarning: FC<BranchWarningProps> = props => (
    <div className={WarningBox}>
        <strong>
            Be aware that this branch (<code>{props.currentBranch}</code>) is
            not the main branch (<code>{props.mainBranch}</code>)!
        </strong>
        <p>
            Branches other than the main one may be experimental. In addition,
            you should be using stable releases rather than these test builds.
        </p>
        <Link
            className={`${Button} ${SecondaryButton}`}
            href={`/job/${props.projectId}?branch=${props.mainBranch}`}
        >
            Go to main branch
        </Link>{' '}
        <Link
            className={`${Button} ${SecondaryButton}`}
            href={`https://enginehub.org/${props.projectId}/#downloads`}
        >
            View stable downloads
        </Link>
    </div>
);

export default BranchWarning;

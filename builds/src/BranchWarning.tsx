import { WarningBox, GrayButton } from '@enginehub/shared';
import type { FC } from 'react';

interface BranchWarningProps {
    projectId: string;
    currentBranch: string;
    mainBranch: string;
}

const BranchWarning: FC<BranchWarningProps> = props => (
    <WarningBox>
        <strong>
            Be aware that this branch (<code>{props.currentBranch}</code>) is
            not the main branch (<code>{props.mainBranch}</code>)!
        </strong>
        <p>
            Branches other than the main one may be experimental. In addition,
            you should be using stable releases rather than these test builds.
        </p>
        <GrayButton href={`/job/${props.projectId}?branch=${props.mainBranch}`}>
            Go to main branch
        </GrayButton>{' '}
        <GrayButton
            href={`https://enginehub.org/${props.projectId}/#downloads`}
        >
            View stable downloads
        </GrayButton>
    </WarningBox>
);

export default BranchWarning;

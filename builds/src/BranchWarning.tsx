import { WarningBox, MainButtonStyle } from '@enginehub/shared';
import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';

interface BranchWarningProps {
    projectId: string;
    currentBranch: string;
    mainBranch: string;
}

const MainButton = styled.a(MainButtonStyle);

const BranchWarning: React.FC<BranchWarningProps> = props => (
    <WarningBox>
        <strong>
            Be aware that this branch (<code>{props.currentBranch}</code>) is
            not the main branch (<code>{props.mainBranch}</code>)!
        </strong>
        <p>
            Branches other than the main one may be experimental. In addition,
            you should be using stable releases rather than these test builds.
        </p>
        <Link
            href={`/job/${props.projectId}?branch=${props.mainBranch}`}
            passHref={true}
            legacyBehavior={true}
        >
            <MainButton>Go to main branch</MainButton>
        </Link>{' '}
        <MainButton
            href={`https://enginehub.org/${props.projectId}/#downloads`}
        >
            View stable downloads
        </MainButton>
    </WarningBox>
);

export default BranchWarning;

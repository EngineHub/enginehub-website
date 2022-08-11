import React from 'react';
import Layout from '../../../src/Layout';
import {
    Container,
    SEO,
    PageHeader,
    Table,
    Pagination
} from '@enginehub/shared';
import { GetServerSideProps } from 'next';
import { PROJECT_MAP, Project } from '../../../src/project';
import {
    Build,
    getBranches,
    getBuildPage,
    BUILDS_PER_PAGE
} from '../../../src/builds';
import styled from 'styled-components';
import { BlueButtonStyle, MainButtonStyle } from '@enginehub/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDownload,
    faCheckCircle,
    faExclamationTriangle,
    faCodeBranch
} from '@fortawesome/free-solid-svg-icons';
import { MainLink } from '@enginehub/shared';
import BranchWarning from '../../../src/BranchWarning';
import {
    BranchButtonList,
    BranchButtonItem,
    BranchButton
} from '../../../src/BranchButton';
import moment from 'moment';
import Link from 'next/link';

interface ProjectPageProps {
    activeBranch: string;
    project: Project;
    builds: Build[];
    branches: string[];
    pageNumber: number;
    hasNextPage: boolean;
}

const TdNoWrap = styled.td`
    white-space: nowrap;
`;

const MainButton = styled.a(MainButtonStyle);
const BlueButton = styled.a(BlueButtonStyle);

const MiniPaddedIcon = styled(FontAwesomeIcon)`
    line-height: 0.75em;
    vertical-align: -15%;
    margin-right: 0.25rem;
    max-width: 16px;
    max-height: 16px;
`;

function Index({
    project,
    builds,
    branches,
    activeBranch,
    pageNumber,
    hasNextPage
}: ProjectPageProps) {
    return (
        <Layout extraSponsors={project.extraSponsors}>
            <SEO
                title={`${project.name} Builds`}
                description={`Downloads and builds for the ${project.name} project. Download beta and test builds!`}
            />
            <PageHeader
                text={`${project.name} Builds`}
                icon={project.icon}
                extraSponsors={project.extraSponsors}
            >
                <BranchButtonList>
                    {branches.map(branch => (
                        <BranchButtonItem key={branch}>
                            <Link
                                href={`/job/${project.id}?branch=${branch}`}
                                passHref={true}
                            >
                                <BranchButton
                                    className={
                                        branch === activeBranch
                                            ? 'active'
                                            : undefined
                                    }
                                >
                                    <MiniPaddedIcon icon={faCodeBranch} />{' '}
                                    {branch}
                                </BranchButton>
                            </Link>
                        </BranchButtonItem>
                    ))}
                </BranchButtonList>
            </PageHeader>
            <Container>
                {activeBranch !== project.defaultBranch && (
                    <BranchWarning
                        currentBranch={activeBranch}
                        mainBranch={project.defaultBranch}
                        projectId={project.id}
                    />
                )}
                <Link
                    href={`/job/${project.id}/last-successful?branch=${activeBranch}`}
                    passHref={true}
                >
                    <MainButton
                        style={{ float: 'right', marginBottom: '2rem' }}
                    >
                        View last successful build
                    </MainButton>
                </Link>
                <Table>
                    <colgroup>
                        <col style={{ width: '1%' }} />
                        <col style={{ width: '1%' }} />
                        <col style={{ width: '1%' }} />
                        <col style={{ width: '15%' }} />
                        <col />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '1%' }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>Branch</th>
                            <th>#</th>
                            <th colSpan={2}>Status</th>
                            <th>Changes</th>
                            <th>Finished</th>
                            <th />
                        </tr>
                        {builds.map(build => (
                            <tr
                                className={
                                    build.state !== 'SUCCESS' ? 'danger' : ''
                                }
                                key={build.build_id}
                            >
                                <TdNoWrap>
                                    <small>{build.branch}</small>
                                </TdNoWrap>
                                <TdNoWrap>
                                    <Link
                                        href={`/job/${project.id}/${build.build_id}`}
                                        passHref={true}
                                    >
                                        <MainLink>
                                            #{build.build_number}
                                        </MainLink>
                                    </Link>
                                </TdNoWrap>
                                <td>
                                    <FontAwesomeIcon
                                        icon={
                                            build.state === 'SUCCESS'
                                                ? faCheckCircle
                                                : faExclamationTriangle
                                        }
                                        style={{
                                            color:
                                                build.state === 'SUCCESS'
                                                    ? '#3c763d'
                                                    : '#a94442'
                                        }}
                                    />
                                </td>
                                <td>
                                    <small>{build.statusText}</small>
                                </td>
                                <td>
                                    <ul>
                                        {build.changes.length > 0 ? (
                                            build.changes.map(change => (
                                                <li key={change.version}>
                                                    {change.comment}{' '}
                                                    <small>
                                                        (
                                                        <MainLink
                                                            href={`${project.vcsRoot}/commit/${change.version}`}
                                                        >
                                                            {change.version.substring(
                                                                0,
                                                                8
                                                            )}
                                                        </MainLink>{' '}
                                                        by {change.username})
                                                    </small>
                                                </li>
                                            ))
                                        ) : (
                                            <small>
                                                No new changes were added in
                                                this build.
                                            </small>
                                        )}
                                    </ul>
                                </td>
                                <TdNoWrap>
                                    {moment(build.build_date).fromNow()}
                                </TdNoWrap>
                                <TdNoWrap>
                                    <Link
                                        href={`/job/${project.id}/${build.build_id}`}
                                        passHref={true}
                                    >
                                        <BlueButton>
                                            <FontAwesomeIcon
                                                icon={faDownload}
                                            />
                                        </BlueButton>
                                    </Link>
                                </TdNoWrap>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination
                    currentPage={pageNumber}
                    hasNextPage={hasNextPage}
                    pageMask={`/job/${project.id}?branch=${activeBranch}&page=:page`}
                />
            </Container>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { project, branch, page } = query;
    const projectObj = PROJECT_MAP.get(project as string);
    if (!projectObj) {
        return {
            notFound: true
        };
    }

    const pageNumber = parseInt(page as string) || 0;

    const [builds, branches] = await Promise.all([
        getBuildPage(
            projectObj,
            (branch as string) || projectObj.defaultBranch,
            pageNumber
        ),
        getBranches(projectObj)
    ]);
    const hasNextPage = builds.length === BUILDS_PER_PAGE + 1;
    if (hasNextPage) {
        builds.pop();
    }

    return {
        props: {
            project: projectObj,
            builds,
            branches,
            activeBranch: branch || projectObj.defaultBranch,
            pageNumber,
            hasNextPage
        }
    };
};

export default Index;

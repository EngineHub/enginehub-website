import React from 'react';
import Layout from '@builds/Layout';
import { Container } from '@shared/components/Container';
import SEO from '@shared/components/Seo';
import { NextPageContext } from 'next';
import { PageHeader } from '@shared/components/PageHeader';
import { PROJECT_MAP, Project } from '@builds/project';
import Error from '../../_error';
import { Table } from '@shared/components/Table';
import {
    Build,
    getBranches,
    getBuildPage,
    BUILDS_PER_PAGE
} from '@builds/builds';
import styled from '@emotion/styled';
import { BlueButtonStyle, MainButtonStyle } from '@shared/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDownload,
    faCheckCircle,
    faExclamationTriangle,
    faCodeBranch
} from '@fortawesome/free-solid-svg-icons';
import { MainLinkStyle } from '@shared/components/Link';
import BranchWarning from '@builds/BranchWarning';
import {
    BranchButtonList,
    BranchButtonItem,
    BranchButton
} from '@builds/BranchButton';
import moment from 'moment';
import Pagination from '@shared/components/Pagination';
import Link from 'next/link';
import { LinkProviderContext } from '@shared/utils/LinkProvider';

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

const MainLink = styled.a(MainLinkStyle);
const MainButton = styled.a(MainButtonStyle);
const BlueButton = styled.a(BlueButtonStyle);
const MainOutboundLink = styled.a(MainLinkStyle);

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
    if (!project) {
        return <Error statusCode={404} />;
    }
    return (
        <Layout extraSponsors={project.extraSponsors}>
            <SEO title={`${project.name} Builds`} />
            <PageHeader
                text={`${project.name} Builds`}
                showSponsors={false}
                icon={project.icon}
            >
                <BranchButtonList>
                    {branches.map(branch => (
                        <BranchButtonItem key={branch}>
                            <Link
                                href={`/job/[project]?branch=${branch}`}
                                as={`/job/${project.id}?branch=${branch}`}
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
                {activeBranch !== project.defaultBranch &&
                    (!project.pinnedBranches ||
                        !project.pinnedBranches.includes(activeBranch)) && (
                        <BranchWarning
                            currentBranch={activeBranch}
                            mainBranch={project.defaultBranch}
                            projectId={project.id}
                        />
                    )}
                <Link
                    href={`/job/[project]/[build]?branch=${activeBranch}`}
                    as={`/job/${project.id}/last-successful?branch=${activeBranch}`}
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
                                        href="/job/[project]/[build]"
                                        as={`/job/${project.id}/${build.build_id}`}
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
                                                        <MainOutboundLink
                                                            href={`${project.vcsRoot}/commit/${change.version}`}
                                                        >
                                                            {change.version.substring(
                                                                0,
                                                                8
                                                            )}
                                                        </MainOutboundLink>{' '}
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
                                        href="/job/[project]/[build]"
                                        as={`/job/${project.id}/${build.build_id}`}
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
                <LinkProviderContext.Consumer>
                    {linkProvider => (
                        <Pagination
                            currentPage={pageNumber}
                            hasNextPage={hasNextPage}
                            pageMask={`/job/[project]?branch=${activeBranch}&page=:page`}
                            pageMaskAs={`/job/${project.id}?branch=${activeBranch}&page=:page`}
                            linkProvider={linkProvider}
                        />
                    )}
                </LinkProviderContext.Consumer>
            </Container>
        </Layout>
    );
}

Index.getInitialProps = async ({ query }: NextPageContext) => {
    const { project, branch, page } = query;
    const projectObj = PROJECT_MAP.get(project as string);
    if (!projectObj) {
        return {
            project: undefined,
            builds: [],
            branches: [],
            activeBranch: undefined
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
        project: projectObj,
        builds,
        branches,
        activeBranch: branch || projectObj.defaultBranch,
        pageNumber,
        hasNextPage
    };
};

export default Index;

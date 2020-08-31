import React from 'react';
import Layout from '@builds/Layout';
import { Container } from '@shared/components/Container';
import SEO from '@shared/components/Seo';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PageHeader } from '@shared/components/PageHeader';
import { PROJECT_MAP, Project, PROJECTS } from '@builds/project';
import Error from '../../../404';
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
import { ParsedUrlQuery } from 'querystring';

interface ProjectPageProps {
    activeBranch: string;
    project?: Project;
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
        return <Error />;
    }
    return (
        <Layout extraSponsors={project.extraSponsors}>
            <SEO
                title={`${project.name} Builds`}
                description={`Downloads and builds for the ${project.name} project. Download beta and test builds!`}
            />
            <PageHeader text={`${project.name} Builds`} icon={project.icon}>
                <BranchButtonList>
                    {branches.map(branch => (
                        <BranchButtonItem key={branch}>
                            <Link
                                href={`/job/[project]/[branch]`}
                                as={`/job/${project.id}/${encodeURIComponent(branch)}`}
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
                    href={`/job/[project]/build/last-successful/[branch]`}
                    as={`/job/${project.id}/build/last-successful/${encodeURIComponent(activeBranch)}`}
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
                                        href="/job/[project]/build/[build]"
                                        as={`/job/${project.id}/build/${build.build_id}`}
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
                                        href="/job/[project]/build/[build]"
                                        as={`/job/${project.id}/build/${build.build_id}`}
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
                            pageMask={`/job/[project]/[branch]/[page]`}
                            pageMaskAs={`/job/${project.id}/${activeBranch}/:page`}
                            linkProvider={linkProvider}
                        />
                    )}
                </LinkProviderContext.Consumer>
            </Container>
        </Layout>
    );
}

interface ProjectStaticProps extends ParsedUrlQuery {
    project: string;
    branch: string;
}

export const getStaticProps: GetStaticProps<
    ProjectPageProps,
    ProjectStaticProps
> = async ({ params }) => {
    async function getProps() {
        const { project, branch } = params!;
        const projectObj = PROJECT_MAP.get(project);
        if (!projectObj) {
            return {
                project: undefined,
                builds: [],
                branches: [],
                activeBranch: '',
                pageNumber: 0,
                hasNextPage: false
            };
        }

        const [builds, branches] = await Promise.all([
            getBuildPage(projectObj, branch, 0),
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
            activeBranch: branch,
            pageNumber: 0,
            hasNextPage
        };
    }

    return {
        props: await getProps(),
        revalidate: 60
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = [];

    for (const proj of PROJECTS) {
        const branches = await getBranches(proj);
        for (const branch of branches) {
            paths.push({ params: { project: proj.id, branch } });
        }
    }

    return {
        paths,
        fallback: true
    };
};

export default Index;

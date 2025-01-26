import {
    faCheckCircle,
    faCodeBranch,
    faDownload,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import {
    Button,
    Container,
    MainLink,
    PageHeader,
    Pagination,
    PrimaryButton,
    SecondaryButton,
    SEO,
    Table
} from '@enginehub/shared';

import {
    BranchButton,
    BranchButtonList
} from '../../../src/BranchButton.module.css';
import BranchWarning from '../../../src/BranchWarning';
import type { Build } from '../../../src/builds';
import {
    BUILDS_PER_PAGE,
    getBranches,
    getBuildPage
} from '../../../src/builds';
import { getUsernameFromChange } from '../../../src/builds/vcsUsernameMapping';
import Layout from '../../../src/Layout';
import { MiniPaddedIcon } from '../../../src/PaddedIcon.module.css';
import type { Project } from '../../../src/project';
import { PROJECT_MAP } from '../../../src/project';

interface ProjectPageProps {
    activeBranch: string;
    project: Project;
    builds: Build[];
    branches: string[];
    pageNumber: number;
    hasNextPage: boolean;
}

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
                <ul className={BranchButtonList}>
                    {branches.map(branch => (
                        <li key={branch}>
                            <Link
                                href={`/job/${project.id}?branch=${branch}`}
                                className={`${BranchButton} ${
                                    branch === activeBranch ? ' active' : ''
                                }`}
                            >
                                <FontAwesomeIcon
                                    className={MiniPaddedIcon}
                                    icon={faCodeBranch}
                                />{' '}
                                {branch}
                            </Link>
                        </li>
                    ))}
                </ul>
            </PageHeader>
            <div className={Container}>
                {activeBranch !== project.defaultBranch && (
                    <BranchWarning
                        currentBranch={activeBranch}
                        mainBranch={project.defaultBranch}
                        projectId={project.id}
                    />
                )}
                <Link
                    className={`${Button} ${SecondaryButton}`}
                    href={`/job/${project.id}/last-successful?branch=${activeBranch}`}
                    style={{ float: 'right', marginBottom: '2rem' }}
                >
                    View last successful build
                </Link>
                <table className={Table}>
                    <colgroup>
                        <col style={{ width: '10%' }} />
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
                                    build.state === 'SUCCESS' ? '' : 'danger'
                                }
                                key={build.build_id}
                            >
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <small>{build.branch}</small>
                                </td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link
                                        className={MainLink}
                                        href={`/job/${project.id}/${build.build_id}`}
                                    >
                                        #{build.build_number}
                                    </Link>
                                </td>
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
                                                        <Link
                                                            className={MainLink}
                                                            href={`${project.vcsRoot}/commit/${change.version}`}
                                                        >
                                                            {change.version.slice(
                                                                0,
                                                                8
                                                            )}
                                                        </Link>{' '}
                                                        by{' '}
                                                        {getUsernameFromChange(
                                                            change
                                                        )}
                                                        )
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
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    {moment(build.build_date).fromNow()}
                                </td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link
                                        className={`${Button} ${PrimaryButton}`}
                                        href={`/job/${project.id}/${build.build_id}`}
                                    >
                                        <FontAwesomeIcon icon={faDownload} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={pageNumber}
                    hasNextPage={hasNextPage}
                    pageMask={`/job/${project.id}?branch=${activeBranch}&page=:page`}
                />
            </div>
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

    const pageNumber = Number.parseInt(page as string) || 0;

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

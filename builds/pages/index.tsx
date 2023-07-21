import { Fragment } from 'react';
import Layout from '../src/Layout';
import {
    Container,
    WarningBox,
    SEO,
    PageHeader,
    Table,
    MainLink,
    InfoLabel,
    Label
} from '@enginehub/shared';
import type { Project } from '../src/project';
import { PROJECTS } from '../src/project';
import type { Build } from '../src/builds';
import { getBranches, getLatestBuild } from '../src/builds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCodeBranch,
    faCheckCircle,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { MiniPaddedIcon } from '../src/PaddedIcon.module.css';
import { TableSeparatorHeader } from '../src/Components.module.css';

interface ProjectEntry {
    project: Project;
    builds: Omit<Build, 'changes' | 'artifacts'>[];
}

interface IndexProps {
    projectEntries: ProjectEntry[];
}

function Index({ projectEntries }: IndexProps) {
    return (
        <Layout>
            <SEO
                title={'Builds'}
                description={
                    'Downloads and builds for many EngineHub projects. WorldEdit, WorldGuard, CraftBook, CommandHelper, and more!'
                }
            />
            <PageHeader text={'Builds'} />
            <div className={Container}>
                <div className={WarningBox}>
                    <strong>These are not the main downloads!</strong>
                    <p>
                        These downloads are created from every change made in
                        the code, which may mean that some of these downloads
                        may be unstable or cause problems. Unless you have been
                        instructed to use these downloads, please prefer the use
                        of stable versions.
                    </p>
                </div>
                <table className={Table}>
                    <colgroup>
                        <col style={{ width: '20px' }} />
                        <col />
                        <col style={{ width: '1%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '20%' }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th />
                            <th>Branch</th>
                            <th colSpan={2}>Last Build</th>
                            <th />
                            <th>Finished</th>
                        </tr>
                        {projectEntries.map(projectEntry => (
                            <Fragment key={projectEntry.project.id}>
                                <tr style={{ background: '#eee' }}>
                                    <td colSpan={6}>
                                        <h2 className={TableSeparatorHeader}>
                                            {projectEntry.project.name}
                                        </h2>
                                    </td>
                                </tr>
                                {projectEntry.builds.map(build => (
                                    <tr
                                        className={
                                            build.state !== 'SUCCESS'
                                                ? 'danger'
                                                : ''
                                        }
                                        key={build.build_id}
                                    >
                                        <td />
                                        <td>
                                            <FontAwesomeIcon
                                                className={MiniPaddedIcon}
                                                icon={faCodeBranch}
                                            />
                                            <Link
                                                className={MainLink}
                                                href={`/job/${projectEntry.project.id}?branch=${build.branch}`}
                                            >
                                                {build.branch}
                                            </Link>
                                            {build.branch ===
                                                projectEntry.project
                                                    .defaultBranch && (
                                                <span
                                                    className={`${Label} ${InfoLabel}`}
                                                    style={{
                                                        marginLeft: '0.5rem'
                                                    }}
                                                >
                                                    main branch
                                                </span>
                                            )}
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
                                                        build.state ===
                                                        'SUCCESS'
                                                            ? '#3c763d'
                                                            : '#a94442'
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <small>{build.statusText}</small>
                                        </td>
                                        <td>
                                            <Link
                                                className={MainLink}
                                                href={`/job/${projectEntry.project.id}/${build.build_id}`}
                                            >
                                                #{build.build_number}
                                            </Link>
                                        </td>
                                        <td style={{ whiteSpace: 'nowrap' }}>
                                            {moment(build.build_date).fromNow()}{' '}
                                        </td>
                                    </tr>
                                ))}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const projectEntries: ProjectEntry[] = PROJECTS.map(proj => ({
        project: proj,
        builds: []
    }));

    await Promise.all(
        projectEntries.map(async proj => {
            const branches = await getBranches(proj.project);
            proj.builds = (
                await Promise.all(
                    branches.map(
                        async branch =>
                            await getLatestBuild(proj.project, branch)
                    )
                )
            )
                .filter((b): b is Build => !!b)
                .map(({ artifacts: _artifacts, changes: _changes, ...b }) => b);
        })
    );

    return {
        props: { projectEntries },
        revalidate: 60
    };
};

export default Index;

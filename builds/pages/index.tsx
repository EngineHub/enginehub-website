import React from 'react';
import Layout from '../src/Layout';
import { Container } from '@shared/components/Container';
import { WarningBox } from '@shared/components/WarningBox';
import SEO from '@shared/components/Seo';
import { PageHeader } from '@shared/components/PageHeader';
import { Table } from '@shared/components/Table';
import { Project, PROJECTS } from '@builds/project';
import { Build, getBranches, getLatestBuild } from '@builds/builds';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCodeBranch,
    faCheckCircle,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { MainLinkStyle } from '@shared/components/Link';
import { InfoLabel } from '@shared/components/text/Label';
import Link from 'next/link';

interface ProjectEntry {
    project: Project;
    builds: Build[];
}

interface IndexProps {
    projectEntries: ProjectEntry[];
}

const TdNoWrap = styled.td`
    white-space: nowrap;
`;

const MiniPaddedIcon = styled(FontAwesomeIcon)`
    line-height: 0.75em;
    vertical-align: -15%;
    margin-right: 0.25rem;
    max-width: 16px;
    max-height: 16px;
`;

const ProjectTitleRow = styled.tr`
    background: #eee;

    td {
        h2 {
            margin: 2px 0 0;
            padding: 0 5px;
            font-size: 14px;
        }
    }
`;

const MainLink = styled.a(MainLinkStyle);

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
            <Container>
                <WarningBox>
                    <strong>These are not the main downloads!</strong>
                    <p>
                        These downloads are created from every change made in
                        the code, which may mean that some of these downloads
                        may be unstable or cause problems. Unless you have been
                        instructed to use these downloads, please prefer the use
                        of stable versions.
                    </p>
                </WarningBox>
                <Table>
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
                            <React.Fragment key={projectEntry.project.id}>
                                <ProjectTitleRow>
                                    <td colSpan={6}>
                                        <h2>{projectEntry.project.name}</h2>
                                    </td>
                                </ProjectTitleRow>
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
                                            <MiniPaddedIcon
                                                icon={faCodeBranch}
                                            />
                                            <Link
                                                href={`/job/[project]?branch=${build.branch}`}
                                                as={`/job/${projectEntry.project.id}?branch=${build.branch}`}
                                                passHref={true}
                                            >
                                                <MainLink>
                                                    {build.branch}
                                                </MainLink>
                                            </Link>
                                            {build.branch ===
                                                projectEntry.project
                                                    .defaultBranch && (
                                                <InfoLabel
                                                    style={{
                                                        marginLeft: '0.5rem'
                                                    }}
                                                >
                                                    main branch
                                                </InfoLabel>
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
                                                href="/job/[project]/[build]"
                                                as={`/job/${projectEntry.project.id}/${build.build_id}`}
                                                passHref={true}
                                            >
                                                <MainLink>
                                                    #{build.build_number}
                                                </MainLink>
                                            </Link>
                                        </td>
                                        <TdNoWrap>
                                            {moment(build.build_date).fromNow()}{' '}
                                        </TdNoWrap>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Layout>
    );
}

Index.getInitialProps = async () => {
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
            ).filter(b => b) as Build[];
        })
    );

    return {
        projectEntries
    };
};

export default Index;

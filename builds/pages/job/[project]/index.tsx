import React from 'react';
import Layout from '@builds/layout';
import { Container } from '@shared/components/container';
import SEO from '@shared/components/seo';
import { NextPageContext } from 'next-server/dist/lib/utils';
import { PageHeader } from '@shared/components/PageHeader';
import { PROJECT_MAP, Project } from '@builds/project';
import Error from '../../_error';
import { Table } from '@shared/components/Table';
import { Build, getBranches } from '@builds/builds';
import styled from '@emotion/styled';
import { BlueButtonStyle, MainButtonStyle } from '@shared/components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDownload,
    faCheckCircle,
    faExclamationTriangle,
    faCodeBranch
} from '@fortawesome/free-solid-svg-icons';
import { MainLinkStyle } from '@shared/components/link';
import BranchWarning from '@builds/BranchWarning';
import {
    BranchButtonList,
    BranchButtonItem,
    BranchButton
} from '@builds/BranchButton';

interface ProjectPageProps {
    activeBranch: string;
    project: Project;
    builds: Build[];
    branches: string[];
}

const TdNoWrap = styled.td`
    white-space: nowrap;
`;

const MainLink = styled.a(MainLinkStyle);
const MainButton = styled.a(MainButtonStyle);
const BlueButton = styled.a(BlueButtonStyle);

const MiniPaddedIcon = styled(FontAwesomeIcon)`
    line-height: 0.75em;
    vertical-align: -15%;
    margin-right: 0.25rem;
    max-width: 16px;
    max-height: 16px;
`;

function Index({ project, builds, branches, activeBranch }: ProjectPageProps) {
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
                            <BranchButton
                                className={
                                    branch === activeBranch
                                        ? 'active'
                                        : undefined
                                }
                                href={`/job/${project.id}?branch=${branch}`}
                            >
                                <MiniPaddedIcon icon={faCodeBranch} /> {branch}
                            </BranchButton>
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
                <MainButton
                    href={`/job/${project.id}/last-successful?branch=${activeBranch}`}
                    style={{ float: 'right', marginBottom: '2rem' }}
                >
                    View last successful build
                </MainButton>
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
                                    <MainLink
                                        href={`/job/${project.id}/${build.build_id}`}
                                    >
                                        #{build.build_number}
                                    </MainLink>
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
                                <td>//TODO Changes</td>
                                <TdNoWrap>{build.build_date}</TdNoWrap>
                                <TdNoWrap>
                                    <BlueButton
                                        href={`/job/${project.id}/${build.build_id}`}
                                    >
                                        <FontAwesomeIcon icon={faDownload} />
                                    </BlueButton>
                                </TdNoWrap>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Layout>
    );
}

Index.getInitialProps = async ({ query }: NextPageContext) => {
    const { project, branch } = query;
    const projectObj = PROJECT_MAP.get(project as string);
    if (!projectObj) {
        return {
            project: undefined,
            builds: [],
            branches: [],
            activeBranch: undefined
        };
    }

    const builds: Build[] = [];
    const branches = await getBranches(projectObj);

    return {
        project: projectObj,
        builds,
        branches,
        activeBranch: branch || projectObj.defaultBranch
    };
};

export default Index;

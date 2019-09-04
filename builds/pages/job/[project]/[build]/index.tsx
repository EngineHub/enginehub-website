import React from 'react';
import Layout from '@builds/layout';
import { ContainerPadded } from '@shared/components/container';
import styled from '@emotion/styled';
import { InfoBox } from '@shared/components/InfoBox';
import { NextPageContext } from 'next-server/dist/lib/utils';
import SEO from '@shared/components/seo';
import { PROJECT_MAP, Project } from '@builds/project';
import Error from '../../../_error';
import {
    BreadcrumbWrapper,
    Breadcrumb,
    ActiveBreadcrumb
} from '@shared/components/Breadcrumbs';
import { MainLinkStyle } from '@shared/components/link';
import { HeaderText } from '@shared/components/PageHeader';
import { MainButtonStyle } from '@shared/components/button';
import { Panel, PanelHeading, PanelBody } from '@shared/components/Panel';
import { LabelledSponsorsArea } from '@shared/components/sponsors';
import { Table, BorderedTable } from '@shared/components/Table';
import Row from '@shared/components/grid/row';
import ColumnsThird, {
    ColumnsTwoThird
} from '@shared/components/grid/columns-3';
import { getBuild, Build } from '@builds/builds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCodeBranch,
    faCheckCircle,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import BranchWarning from '@builds/BranchWarning';

interface BuildPageProps {
    build: Build;
    project: Project;
}

const MainLink = styled.a(MainLinkStyle);
const MainOutboundLink = styled.a(MainLinkStyle);
const MainButton = styled.a(MainButtonStyle);

const DownloadLinkDiv = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 11.5px;

    img {
        border: 0;
        margin-bottom: 0;
    }

    * {
        margin-right: 0.3rem;
    }
`;

const Breaker = styled.hr`
    margin-top: 23px;
    margin-bottom: 23px;
    border: 0;
    border-top: 1px solid #eee;
    box-sizing: content-box;
    height: 0;
`;

const MiniPaddedIcon = styled(FontAwesomeIcon)`
    line-height: 0.75em;
    vertical-align: -15%;
    margin-right: 0.25rem;
    max-width: 16px;
    max-height: 16px;
`;

function Index({ project, build }: BuildPageProps) {
    if (!project || !build) {
        return <Error statusCode={404} />;
    }
    return (
        <Layout extraSponsors={project.extraSponsors}>
            <SEO title={`${project.name} Builds`} />
            <ContainerPadded>
                <BreadcrumbWrapper>
                    <Breadcrumb>
                        <MainLink href={'/'}>Builds</MainLink>
                    </Breadcrumb>
                    <Breadcrumb>
                        <MainLink
                            href={`/job/${project.id}?branch=${build.branch}`}
                        >
                            {project.name} (<code>{build.branch}</code>)
                        </MainLink>
                    </Breadcrumb>
                    <ActiveBreadcrumb>
                        Build #{build.build_number}
                    </ActiveBreadcrumb>
                </BreadcrumbWrapper>
                <HeaderText>
                    {project.name} Build #{build.build_number}
                </HeaderText>
                {build.branch !== project.defaultBranch ? (
                    <BranchWarning
                        currentBranch={build.branch}
                        mainBranch={project.defaultBranch}
                        projectId={project.id}
                    />
                ) : (
                    <InfoBox>
                        <p>
                            <strong>This is not a stable download!</strong>
                        </p>
                        <p>
                            We recommend the use of released versions whenever
                            possible.
                        </p>
                        <MainButton>View Stable Downloads</MainButton>
                    </InfoBox>
                )}
                <Row>
                    <ColumnsThird style={{ paddingLeft: '0' }}>
                        <BorderedTable>
                            <tbody>
                                <tr>
                                    <th>Project</th>
                                    <td>
                                        <MainLink
                                            href={`https://enginehub.org/${project.id}/`}
                                        >
                                            {project.name}
                                        </MainLink>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>
                                        <MiniPaddedIcon
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
                                        {build.state}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Branch</th>
                                    <td>
                                        <MiniPaddedIcon icon={faCodeBranch} />
                                        {build.branch}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Number</th>
                                    <td>
                                        #{build.build_number}-{build.build_hash}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{build.build_date}</td>
                                </tr>
                            </tbody>
                        </BorderedTable>
                    </ColumnsThird>
                    <ColumnsTwoThird style={{ paddingRight: '0' }}>
                        <Panel>
                            <PanelHeading>Artifacts</PanelHeading>
                            <PanelBody>
                                {build.artifacts.map((artifact, i) => (
                                    <DownloadLinkDiv
                                        key={`${artifact.name}-${i}`}
                                    >
                                        <img
                                            src="/static/download_icon.png"
                                            alt="Download"
                                        />
                                        <MainOutboundLink
                                            href={`https://ci.enginehub.org/repository/download/${project.buildType}/${build.build_id}:id/${artifact.name}?branch=${build.branch}&guest=1`}
                                        >
                                            {artifact.name}
                                        </MainOutboundLink>
                                        <small>
                                            ({artifact.size / 1024} kBytes)
                                        </small>
                                    </DownloadLinkDiv>
                                ))}
                                <Breaker />
                                <LabelledSponsorsArea
                                    extraSponsors={project.extraSponsors}
                                />
                            </PanelBody>
                        </Panel>
                    </ColumnsTwoThird>
                </Row>
                <Panel>
                    <PanelHeading>Changes</PanelHeading>
                    <Table>
                        <colgroup>
                            <col style={{ width: '15%' }} />
                            <col />
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '15%' }} />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Summary</th>
                                <th>Committer</th>
                                <th>Date</th>
                            </tr>
                            {build.changes.map(change => (
                                <tr key={change.version}>
                                    <td>{change.version}</td>
                                    <td>{change.summary}</td>
                                    <td>{change.username}</td>
                                    <td>{change.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Panel>
            </ContainerPadded>
        </Layout>
    );
}

Index.getInitialProps = async ({ query }: NextPageContext) => {
    const { project, build } = query;
    const projectObj = PROJECT_MAP.get(project as string);
    const buildObj = await getBuild(build as string);
    if (!projectObj || !buildObj) {
        return {};
    }
    return { project: projectObj, build: buildObj };
};

export default Index;

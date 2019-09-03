import React from 'react';
import Layout from '@builds/layout';
import { ContainerPadded } from '@shared/components/container';
import styled from '@emotion/styled';
import { InfoBox } from '@shared/components/InfoBox';
import { NextPageContext } from 'next-server/dist/lib/utils';
import SEO from '@shared/components/seo';
import { PROJECT_MAP, Build, Project, BuildData } from '@builds/project';
import Error from '../../../_error';
import { getBuild } from '@builds/project/dynamoDb';
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
import Row from '@shared/components/grid/row'
import ColumnsThird, { ColumnsTwoThird } from '@shared/components/grid/columns-3';

interface BuildPageProps {
    build: Build;
    project: Project;
}

const MainLink = styled.a(MainLinkStyle);
const MainButton = styled.a(MainButtonStyle);

function Index({ project, build }: BuildPageProps) {
    if (!project || !build) {
        return <Error statusCode={404} />;
    }
    const buildData = (typeof build.data === 'string'
        ? JSON.parse(build.data)
        : build.data) as BuildData;
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
                                    <td>{build.state}</td>
                                </tr>
                                <tr>
                                    <th>Branch</th>
                                    <td>{build.branch}</td>
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
                                <tr>
                                    <th>Downloads</th>
                                    <td>{build.download_count}</td>
                                </tr>
                            </tbody>
                        </BorderedTable>
                    </ColumnsThird>
                    <ColumnsTwoThird style={{ paddingRight: '0' }}>
                        <Panel>
                            <PanelHeading>Artifacts</PanelHeading>
                            <PanelBody>
                                {buildData.artifacts.map(artifact => (
                                    <p key={artifact.name}>{artifact.name}</p>
                                ))}
                                <hr />
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
                            {buildData.changes.map(change => (
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

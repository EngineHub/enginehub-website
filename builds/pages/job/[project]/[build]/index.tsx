import React from 'react';
import Layout from '../../../../src/Layout';
import {
    ContainerPadded,
    InfoBox,
    SEO,
    Breadcrumb,
    BreadcrumbWrapper,
    ActiveBreadcrumb,
    MainLinkStyle,
    HeaderText,
    MainButtonStyle,
    Panel,
    PanelBody,
    PanelHeading,
    LabelledSponsorsArea,
    Table,
    BorderedTable,
    Row,
    ColumnThird,
    ColumnTwoThird,
    WarningBox
} from '@enginehub/shared';
import styled from 'styled-components';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PROJECT_MAP, Project } from '../../../../src/project';
import { getBuild, Build } from '../../../../src/builds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCodeBranch,
    faCheckCircle,
    faExclamationTriangle,
    faDownload
} from '@fortawesome/free-solid-svg-icons';
import BranchWarning from '../../../../src/BranchWarning';
import moment from 'moment';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

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
    return (
        <Layout extraSponsors={project.extraSponsors}>
            <SEO
                title={`${project.name} Build #${build.build_number}`}
                description={`${project.name} Builds. Build #${build.build_number} for ${project.name} ${build.branch}. Download test builds at EngineHub.`}
            />
            <ContainerPadded>
                <BreadcrumbWrapper>
                    <Breadcrumb>
                        <Link href={'/'} passHref={true}>
                            <MainLink>Builds</MainLink>
                        </Link>
                    </Breadcrumb>
                    <Breadcrumb>
                        <Link
                            href={`/job/${project.id}?branch=${build.branch}`}
                            passHref={true}
                        >
                            <MainLink>
                                {project.name} (<code>{build.branch}</code>)
                            </MainLink>
                        </Link>
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
                        <MainButton
                            href={`https://enginehub.org/${project.id}/#downloads`}
                        >
                            View Stable Downloads
                        </MainButton>
                    </InfoBox>
                )}
                <Row>
                    <ColumnThird style={{ paddingLeft: '0' }}>
                        <BorderedTable>
                            <tbody>
                                <tr>
                                    <th>Project</th>
                                    <td>
                                        <MainOutboundLink
                                            href={`https://enginehub.org/${project.id}/`}
                                        >
                                            {project.name}
                                        </MainOutboundLink>
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
                                    <td>
                                        {moment(build.build_date).fromNow()}
                                    </td>
                                </tr>
                            </tbody>
                        </BorderedTable>
                    </ColumnThird>
                    <ColumnTwoThird style={{ paddingRight: '0' }}>
                        <Panel>
                            <PanelHeading>Artifacts</PanelHeading>
                            <PanelBody>
                                {build.artifacts.length > 0 ? (
                                    build.artifacts.map((artifact, i) => (
                                        <DownloadLinkDiv
                                            key={`${artifact.name}-${i}`}
                                        >
                                            <MainOutboundLink
                                                href={`https://ci.enginehub.org/repository/download/${project.buildType}/${build.build_id}:id/${artifact.name}?branch=${build.branch}&guest=1`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faDownload}
                                                />
                                                {artifact.name}
                                            </MainOutboundLink>
                                            <small>
                                                (
                                                {Math.round(
                                                    (artifact.size / 1024) *
                                                        100 +
                                                        Number.EPSILON
                                                ) / 100}{' '}
                                                kBytes)
                                            </small>
                                        </DownloadLinkDiv>
                                    ))
                                ) : (
                                    <WarningBox>
                                        <p>
                                            No artifacts (files) are available
                                            for this build!
                                        </p>
                                    </WarningBox>
                                )}
                                <Breaker />
                                <LabelledSponsorsArea
                                    extraSponsors={project.extraSponsors}
                                />
                            </PanelBody>
                        </Panel>
                    </ColumnTwoThird>
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
                                    <td>
                                        <MainOutboundLink
                                            href={`${project.vcsRoot}/commit/${change.version}`}
                                        >
                                            {change.version.substring(0, 8)}
                                        </MainOutboundLink>
                                    </td>
                                    <td>{change.comment}</td>
                                    <td>{change.username}</td>
                                    <td>{moment(change.date).fromNow()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Panel>
            </ContainerPadded>
        </Layout>
    );
}

interface BuildPageRouteParams extends ParsedUrlQuery {
    project: string;
    build: string;
}

export const getStaticProps: GetStaticProps<
    BuildPageProps,
    BuildPageRouteParams
> = async ({ params }) => {
    const { project, build } = params!;
    const projectObj = PROJECT_MAP.get(project);
    if (!projectObj) {
        return {
            notFound: true
        };
    }

    let buildObj = undefined;
    try {
        buildObj = await getBuild(build as string);
    } catch (e) {}
    if (!buildObj) {
        return {
            notFound: true
        };
    }

    return {
        props: { project: projectObj!, build: buildObj! },
        revalidate: 3600
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    };
};

export default Index;

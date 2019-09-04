import React from 'react';
import Layout from '@builds/layout';
import { Container } from '@shared/components/container';
import SEO from '@shared/components/seo';
import { NextPageContext } from 'next-server/dist/lib/utils';
import { PageHeader } from '@shared/components/PageHeader';
import { PROJECT_MAP, Project } from '@builds/project';
import Error from '../../_error';
import { Table } from '@shared/components/Table';
import { Build, getBuild } from '@builds/builds';
import styled from '@emotion/styled';
import { BlueButtonStyle, MainButtonStyle } from '@shared/components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDownload,
    faCheckCircle,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { MainLinkStyle } from '@shared/components/link';

interface ProjectPageProps {
    project: Project;
    builds: Build[];
}

const TdNoWrap = styled.td`
    white-space: nowrap;
`;

const MainLink = styled.a(MainLinkStyle);
const MainButton = styled.a(MainButtonStyle);
const BlueButton = styled.a(BlueButtonStyle);

function Index({ project, builds }: ProjectPageProps) {
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
            />
            <Container>
                <MainButton
                    href={`/job/${project.id}/last-successful`}
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
    const { project } = query;
    const projectObj = PROJECT_MAP.get(project as string);
    if (!projectObj) {
        return {};
    }

    const builds = [await getBuild('1234'), await getBuild('1235')];

    return { project: projectObj, builds };
};

export default Index;

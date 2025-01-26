import {
    faCheckCircle,
    faCodeBranch,
    faDownload,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import type { ParsedUrlQuery } from 'querystring';

import {
    ActiveBreadcrumb,
    BorderedTable,
    Breadcrumb,
    BreadcrumbWrapper,
    Button,
    ColumnThird,
    ColumnTwoThird,
    Container,
    ContainerPadded,
    HeaderText,
    InfoBox,
    LabelledSponsorsArea,
    MainLink,
    Panel,
    PanelBody,
    PanelHeading,
    Row,
    SecondaryButton,
    SEO,
    Table,
    WarningBox
} from '@enginehub/shared';

import BranchWarning from '../../../../src/BranchWarning';
import type { Build } from '../../../../src/builds';
import { getBuild } from '../../../../src/builds';
import { CommiterName } from '../../../../src/builds/vcsUsernameMapping';
import {
    Breaker,
    DownloadLinkDiv
} from '../../../../src/Components.module.css';
import Layout from '../../../../src/Layout';
import { MiniPaddedIcon } from '../../../../src/PaddedIcon.module.css';
import type { Project } from '../../../../src/project';
import { PROJECT_MAP } from '../../../../src/project';

interface BuildPageProps {
    build: Build;
    project: Project;
}

function Index({ project, build }: BuildPageProps) {
    return (
        <Layout extraSponsors={project.extraSponsors}>
            <SEO
                title={`${project.name} Build #${build.build_number}`}
                description={`${project.name} Builds. Build #${build.build_number} for ${project.name} ${build.branch}. Download test builds at EngineHub.`}
            />
            <div className={`${Container} ${ContainerPadded}`}>
                <ol className={BreadcrumbWrapper}>
                    <li className={Breadcrumb}>
                        <Link className={MainLink} href={'/'}>
                            Builds
                        </Link>
                    </li>
                    <li className={Breadcrumb}>
                        <Link
                            className={MainLink}
                            href={`/job/${project.id}?branch=${build.branch}`}
                        >
                            {project.name} (<code>{build.branch}</code>)
                        </Link>
                    </li>
                    <li className={`${Breadcrumb} ${ActiveBreadcrumb}`}>
                        Build #{build.build_number}
                    </li>
                </ol>
                <h1 className={HeaderText}>
                    {project.name} Build #{build.build_number}
                </h1>
                {build.branch === project.defaultBranch ? (
                    <div className={InfoBox}>
                        <p>
                            <strong>This is not a stable download!</strong>
                        </p>
                        <p>
                            We recommend the use of released versions whenever
                            possible.
                        </p>
                        <Link
                            className={`${Button} ${SecondaryButton}`}
                            href={`https://enginehub.org/${project.id}/#downloads`}
                        >
                            View Stable Downloads
                        </Link>
                    </div>
                ) : (
                    <BranchWarning
                        currentBranch={build.branch}
                        mainBranch={project.defaultBranch}
                        projectId={project.id}
                    />
                )}
                <div className={Row}>
                    <div className={ColumnThird} style={{ paddingLeft: '0' }}>
                        <table className={`${Table} ${BorderedTable}`}>
                            <tbody>
                                <tr>
                                    <th>Project</th>
                                    <td>
                                        <Link
                                            className={MainLink}
                                            href={`https://enginehub.org/${project.id}/`}
                                        >
                                            {project.name}
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>
                                        <FontAwesomeIcon
                                            className={MiniPaddedIcon}
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
                                        <FontAwesomeIcon
                                            className={MiniPaddedIcon}
                                            icon={faCodeBranch}
                                        />
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
                        </table>
                    </div>
                    <div
                        className={ColumnTwoThird}
                        style={{ paddingRight: '0' }}
                    >
                        <div className={Panel}>
                            <div className={PanelHeading}>Artifacts</div>
                            <div className={PanelBody}>
                                {build.artifacts.length > 0 ? (
                                    build.artifacts.map((artifact, i) => (
                                        <div
                                            className={DownloadLinkDiv}
                                            key={`${artifact.name}-${i}`}
                                        >
                                            <Link
                                                className={MainLink}
                                                href={`https://ci.enginehub.org/repository/download/${project.buildType}/${build.build_id}:id/${artifact.name}?branch=${build.branch}&guest=1`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faDownload}
                                                />
                                                {artifact.name}
                                            </Link>
                                            <small>
                                                (
                                                {Math.round(
                                                    (artifact.size / 1024) *
                                                        100 +
                                                        Number.EPSILON
                                                ) / 100}{' '}
                                                kBytes)
                                            </small>
                                        </div>
                                    ))
                                ) : (
                                    <div className={WarningBox}>
                                        <p>
                                            No artifacts (files) are available
                                            for this build!
                                        </p>
                                    </div>
                                )}
                                <hr className={Breaker} />
                                <LabelledSponsorsArea
                                    extraSponsors={project.extraSponsors}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Panel}>
                    <div className={PanelHeading}>Changes</div>
                    <table className={Table}>
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
                                        <Link
                                            className={MainLink}
                                            href={`${project.vcsRoot}/commit/${change.version}`}
                                        >
                                            {change.version.slice(0, 8)}
                                        </Link>
                                    </td>
                                    <td>{change.comment}</td>
                                    <td>
                                        <CommiterName buildChange={change} />
                                    </td>
                                    <td>{moment(change.date).fromNow()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
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

    let buildObj;
    try {
        buildObj = await getBuild(build);
    } catch {
        // Ignore this
    }
    if (!buildObj) {
        return {
            notFound: true,
            revalidate: 60
        };
    }

    return {
        props: { project: projectObj, build: buildObj },
        revalidate: 3600
    };
};

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    };
};

export default Index;

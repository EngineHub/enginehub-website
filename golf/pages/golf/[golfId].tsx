import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import {
    type FC,
    type RefObject,
    useLayoutEffect,
    useRef,
    useState
} from 'react';

import {
    Button,
    Container,
    MainLink,
    PrimaryButton,
    SecondaryButton,
    SEO,
    useElementWidth
} from '@enginehub/shared';

import { clearTask, pollBroker, queueTask } from '../../src/broker';
import { useToken } from '../../src/components/Auth';
import { BrandHeader } from '../../src/components/BrandHeader';
import {
    BaseTextStyle,
    MainContent,
    PageColumns,
    PreviewBox,
    RunButtonBox,
    SchematicBoxText,
    SchematicBoxTitle
} from '../../src/components/GolfPage.module.css';
import {
    Leaderboard,
    LeaderboardEntry
} from '../../src/components/Leaderboard/Leaderboard';
import { Schematic } from '../../src/components/Schematic';
import { getGolfData } from '../../src/databaseConnector';
import Layout from '../../src/Layout';
import type { Golf, GolfLeaderboard, User } from '../../src/types/database';

interface DocumentProps {
    golf: Golf;
    leaderboards: GolfLeaderboard[];
    userMap: { [key: string]: User };
}

interface SchematicBoxProps {
    schematic: string;
    size: number;
    title: string;
}

const SchematicBox: FC<SchematicBoxProps> = ({ schematic, size, title }) => {
    const onClickDownload = () => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;base64,' + schematic);
        element.setAttribute('download', `${title}.schem`);

        element.style.display = 'none';
        document.body.append(element);

        element.click();

        element.remove();
    };

    return (
        <div>
            <Schematic size={size} schematic={schematic} />
            <div className={SchematicBoxText}>
                <p className={SchematicBoxTitle}>{title}</p>
                <a
                    className={`${Button} ${PrimaryButton}`}
                    onClick={onClickDownload}
                >
                    <FontAwesomeIcon icon={faDownload} />
                </a>
            </div>
        </div>
    );
};

function Document({ golf, leaderboards, userMap }: DocumentProps) {
    const [taskId, setTaskId] = useState<string | undefined>();
    const [resultSchem, setResultSchem] = useState<string | undefined>();
    const commandBox = useRef<HTMLTextAreaElement>(null);
    const statusBox = useRef<HTMLTextAreaElement>(null);
    const token = useToken();

    const cleanupTask = async (taskId: string) => {
        // Cleanup the broker
        await clearTask(taskId);
        setTaskId(undefined);
    };

    const contentRef = useRef<HTMLDivElement>(null);
    const width = useElementWidth(contentRef as RefObject<HTMLElement>);

    useLayoutEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        const timeout = setInterval(async () => {
            if (taskId) {
                const pollResponse = await pollBroker(taskId);
                switch (pollResponse.status) {
                    case 'queued': {
                        statusBox.current!.value = `Queued. Position in queue: ${pollResponse.positionInQueue}`;
                        break;
                    }
                    case 'running': {
                        statusBox.current!.value = `Currently running... Please wait.`;
                        break;
                    }
                    case 'passed': {
                        statusBox.current!.value = `Passed!\n\n${pollResponse.log}`;
                        await cleanupTask(taskId);
                        break;
                    }
                    case 'failed': {
                        statusBox.current!.value = `The schematics aren't the same!\n\n${pollResponse.log}`;
                        setResultSchem(pollResponse.result);
                        await cleanupTask(taskId);
                        break;
                    }
                    case 'errored': {
                        statusBox.current!.value = `An error occurred :(\n\n${pollResponse.reason}`;
                        await cleanupTask(taskId);
                        break;
                    }
                }
            }
        }, 1000);
        return () => clearInterval(timeout);
    }, [taskId]);

    const queueBroker = () => {
        if (taskId) {
            return;
        }
        if (!token) {
            statusBox.current!.value = `You must be signed in.`;
            return;
        }
        if (commandBox.current!.value.trim().length === 0) {
            statusBox.current!.value = `You must enter commands.`;
            return;
        }
        queueTask({
            golfId: golf.golf_id,
            initial: false,
            input: golf.start_schematic,
            script: commandBox.current!.value,
            test: golf.test_schematic,
            token: token
        })
            .then(queueResponse => {
                if (queueResponse.taskId) {
                    setTaskId(queueResponse.taskId);
                } else {
                    statusBox.current!.value = `An error occurred`;
                }
            })
            .catch(e => {
                statusBox.current!.value = `An error occurred, ${e}`;
            });
    };

    const smallSize = width / 2.05;
    const uploadingUser = userMap[golf.user_id] || {
        username: 'unknown',
        fullname: 'unknown'
    };

    return (
        <Layout>
            <SEO
                title={`${golf.title} | WorldEdit Golf`}
                description={`Try out the ${golf.title} challenge by ${uploadingUser.fullname}! Only at WorldEdit.Golf`}
            />
            <div className={Container}>
                <BrandHeader />
                <div className={PageColumns}>
                    <div className={MainContent} ref={contentRef}>
                        <h1 style={{ marginBottom: '0' }}>{golf.title}</h1>
                        <small style={{ marginBottom: '1.5rem' }}>
                            Uploaded by {uploadingUser.fullname} /{' '}
                            <Link
                                className={MainLink}
                                target="__blank"
                                href={`https://github.com/${uploadingUser.username}/`}
                            >
                                @{uploadingUser.username}
                            </Link>
                        </small>
                        <p style={{ fontSize: '20px' }}>{golf.description}</p>
                        <div className={PreviewBox}>
                            <SchematicBox
                                schematic={golf.start_schematic}
                                size={smallSize}
                                title={'Before'}
                            />
                            <SchematicBox
                                schematic={golf.test_schematic}
                                size={smallSize}
                                title={'After'}
                            />
                        </div>
                        <h3>Commands</h3>
                        <textarea className={BaseTextStyle} ref={commandBox} />
                        <div className={RunButtonBox}>
                            <a
                                className={`${Button} ${SecondaryButton}`}
                                target="_blank"
                                rel="noreferrer"
                                href="https://worldedit.enginehub.org/en/latest/commands/"
                            >
                                Help
                            </a>
                            <a
                                className={`${Button} ${PrimaryButton}`}
                                onClick={queueBroker}
                            >
                                Run
                            </a>
                        </div>
                        <h3>Output</h3>
                        <textarea
                            className={BaseTextStyle}
                            disabled={true}
                            ref={statusBox}
                        />
                        {resultSchem && (
                            <div style={{ marginTop: '48px' }}>
                                <SchematicBox
                                    size={Math.min(width, 500)}
                                    schematic={resultSchem}
                                    title={'Result'}
                                />
                            </div>
                        )}
                    </div>
                    <Leaderboard>
                        {leaderboards.map(leaderboard => {
                            const date = new Date(leaderboard.submitted_time);
                            const user = userMap[leaderboard.user_id];
                            return (
                                <LeaderboardEntry
                                    key={`${golf.golf_id}-${leaderboard.user_id}`}
                                    strokes={leaderboard.score}
                                    created={
                                        date
                                            .toLocaleTimeString()
                                            .replace(/ am/i, '')
                                            .replace(/ pm/i, '') +
                                        ' ' +
                                        date.toDateString()
                                    }
                                    githubId={
                                        user
                                            ? user.username
                                            : leaderboard.user_id
                                    }
                                    name={
                                        user
                                            ? user.fullname
                                            : leaderboard.user_id
                                    }
                                    avatar={user ? user.avatar : ''}
                                />
                            );
                        })}
                    </Leaderboard>
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps<
    DocumentProps,
    { golfId: string }
> = async ({ params }) => {
    const { golfId } = params!;

    const data = await getGolfData(golfId);
    if (!data) {
        return {
            notFound: true
        };
    }
    return { props: data, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    };
};

export default Document;

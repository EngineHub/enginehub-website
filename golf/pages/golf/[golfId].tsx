import React, { useEffect, useState, useRef } from 'react';
import { NextPageContext } from 'next';
import { Golf, GolfLeaderboard, User } from '@golf/types/database';
import {
    LeaderboardEntry,
    Leaderboard
} from '@golf/components/Leaderboard/Leaderboard';
import styled from '@emotion/styled';
import { pollBroker, queueTask, clearTask } from '@golf/broker';
import { Schematic } from '@golf/components/Schematic';
import { useToken } from '@golf/components/Auth';
import Layout from '@golf/Layout';
import { BlueButtonStyle, MainButtonStyle } from '@shared/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@shared/components/Container';
import { useElementWidth } from '@shared/hooks/useElementWidth';
import { BrandHeader } from '@golf/components/BrandHeader';
import SEO from '@shared/components/Seo';
import axios from 'axios';
import { MainLinkStyle } from '@shared/components/Link';

interface DocumentProps {
    golf: Golf;
    leaderboards: GolfLeaderboard[];
    userMap: { [key: string]: User };
}

const PageColumns = styled.div`
    display: flex;
`;

const MainContent = styled.div`
    flex: 60%;
    overflow: hidden;
`;

const PreviewBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-grow: 0;
    margin-bottom: 2rem;
`;

const SideLeaderboard = styled(Leaderboard)`
    flex: 35%;
    margin-left: 1rem;
`;

const BaseTextStyle = styled.textarea`
    width: 100%;
    resize: none;
    height: 200px;
    font-size: 1.3rem;
    line-height: 1.5;
`;

interface SchematicBoxProps {
    schematic: string;
    size: number;
    title: string;
}

const SchematicBoxText = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const GrayButton = styled.a(MainButtonStyle);
const BlueButton = styled.a(BlueButtonStyle);
const MainLink = styled.a(MainLinkStyle);

const RunButtonBox = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;

    * {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
`;

const SchematicBoxTitle = styled.p`
    font-size: 16px;
    margin: 12px 0;
    font-weight: 600;
`;

const SchematicBox: React.FC<SchematicBoxProps> = ({
    schematic,
    size,
    title
}) => {
    const onClickDownload = () => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;base64,' + schematic);
        element.setAttribute('download', `${title}.schem`);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    return (
        <div>
            <Schematic size={size} schematic={schematic} />
            <SchematicBoxText>
                <SchematicBoxTitle>{title}</SchematicBoxTitle>
                <BlueButton onClick={onClickDownload}>
                    <FontAwesomeIcon icon={faDownload} />
                </BlueButton>
            </SchematicBoxText>
        </div>
    );
};

const ResultPreview = styled(SchematicBox)`
    margin-top: 48px;
`;

const DescriptionText = styled.p`
    font-size: 20px;
`;

const TitleText = styled.h1`
    margin-bottom: 0;
`;

const SmallText = styled.small`
    margin-bottom: 1.5rem;
`;

function Document({ golf, leaderboards, userMap }: DocumentProps) {
    const [taskId, setTaskId] = useState<string | undefined>(undefined);
    const [resultSchem, setResultSchem] = useState<string | undefined>(
        undefined
    );
    const commandBox = useRef<HTMLTextAreaElement>(null);
    const statusBox = useRef<HTMLTextAreaElement>(null);
    const token = useToken();

    const cleanupTask = async (taskId: string) => {
        // Cleanup the broker
        await clearTask(taskId);
        setTaskId(undefined);
    };

    const contentRef = useRef<HTMLDivElement>(null)!;
    const width = useElementWidth(contentRef as React.MutableRefObject<
        HTMLElement
    >);

    useEffect(() => {
        const timeout = setInterval(async () => {
            if (taskId) {
                const pollResponse = await pollBroker(taskId!);
                switch (pollResponse.status) {
                    case 'queued':
                        statusBox.current!.value = `Queued. Position in queue: ${pollResponse.positionInQueue}`;
                        break;
                    case 'running':
                        statusBox.current!.value = `Currently running... Please wait.`;
                        break;
                    case 'passed':
                        statusBox.current!.value = `Passed!\n\n${pollResponse.log}`;
                        await cleanupTask(taskId!);
                        break;
                    case 'failed':
                        statusBox.current!.value = `The schematics aren't the same!\n\n${pollResponse.log}`;
                        setResultSchem(pollResponse.result);
                        await cleanupTask(taskId!);
                        break;
                    case 'errored':
                        statusBox.current!.value = `An error occurred :(\n\n${pollResponse.reason}`;
                        await cleanupTask(taskId!);
                        break;
                }
            }
        }, 1000);
        return () => clearInterval(timeout);
    }, [taskId]);

    const queueBroker = async () => {
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
        try {
            const queueResponse = await queueTask({
                golfId: golf.golf_id,
                initial: false,
                input: golf.start_schematic,
                script: commandBox.current!.value,
                test: golf.test_schematic,
                token: token
            });
            if (queueResponse.taskId) {
                setTaskId(queueResponse.taskId!);
            } else {
                statusBox.current!.value = `An error occurred`;
            }
        } catch (e) {
            statusBox.current!.value = `An error occurred :(\n\n${e}`;
        }
    };

    const smallSize = width / 2.05;
    const uploadingUser = userMap[golf.user_id] || {
        username: 'unknown',
        fullname: 'unknown'
    };

    return (
        <Layout>
            <SEO title={`${golf.title} | WorldEdit Golf`} />
            <Container>
                <BrandHeader />
                <PageColumns>
                    <MainContent ref={contentRef}>
                        <TitleText>{golf.title}</TitleText>
                        <SmallText>
                            Uploaded by{' '}
                            <MainLink
                                target="__blank"
                                href={`https://github.com/${uploadingUser.username}/`}
                            >
                                @{uploadingUser.fullname}
                            </MainLink>
                        </SmallText>
                        <DescriptionText>{golf.description}</DescriptionText>
                        <PreviewBox>
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
                        </PreviewBox>
                        <h3>Commands</h3>
                        <BaseTextStyle ref={commandBox} />
                        <RunButtonBox>
                            <GrayButton
                                target="_blank"
                                href="https://worldedit.enginehub.org/en/latest/commands/"
                            >
                                Help
                            </GrayButton>
                            <BlueButton onClick={queueBroker}>Run</BlueButton>
                        </RunButtonBox>
                        <h3>Output</h3>
                        <BaseTextStyle disabled={true} ref={statusBox} />
                        {resultSchem && (
                            <ResultPreview
                                size={Math.min(width, 500)}
                                schematic={resultSchem!}
                                title={'Result'}
                            />
                        )}
                    </MainContent>
                    <SideLeaderboard>
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
                                            .replace(' AM', '')
                                            .replace(' PM', '') +
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
                    </SideLeaderboard>
                </PageColumns>
            </Container>
        </Layout>
    );
}

Document.getInitialProps = async ({ query }: NextPageContext) => {
    const { golfId } = query;

    try {
        const { data } = await axios.get(
            `${process.env.API_PREFIX}/api/get-golf/${golfId}`
        );
        return data;
    } catch (e) {
        return { error: e, golf: {}, leaderboards: [], userMap: {} };
    }
};

export default Document;

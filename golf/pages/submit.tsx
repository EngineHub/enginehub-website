import React, { useEffect, ReactNode, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { TextArea } from '@golf/components/Input/TextArea';
import Input from '@golf/components/Input/Input';
import { useAuthenticatedFetch } from '@golf/components/Auth';
import { Loading } from '@golf/components/Loading';
import { Schematic } from '@golf/components/Schematic';
import { useAuthenticatedPage } from '@golf/components/Auth';
import Layout from '@golf/Layout';
import { PurpleButtonStyle } from '@shared/components/Button';
import { FileSelector } from '@shared/components/FileSelector';
import { useElementWidth } from '@shared/hooks/useElementWidth';
import { BrandHeader } from '@golf/components/BrandHeader';
import SEO from '@shared/components/Seo';
import { Container } from '@shared/components/Container';

const LoadingContainer = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
    z-index: 1;
    justify-content: center;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);

    h1 {
        margin-left: 20px;
    }
`;

type SchematicType = 'start' | 'test';

interface FileToLoad {
    type: SchematicType;
    value: File;
}

type SubmittingType = 'loading' | 'failed' | 'success' | undefined;

interface Submitting {
    type: SubmittingType;
    data?: ReactNode;
}

const InfoContainer = styled.div<{ color: string }>`
    border: ${props => props.color} 2px solid;
    border-radius: 3px;
    background: ${props => props.color}66;
    padding: 6px 10px;
`;

const PurpleButton = styled.button(PurpleButtonStyle);

const Submit = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [start, setStart] = useState<string | undefined>();
    const [test, setTest] = useState<string | undefined>();
    const [loading, setLoading] = useState<FileToLoad | undefined>();
    const [submitting, setSubmitting] = useState<Submitting>();

    const filter = (file: File) => file.name.endsWith('.schem');

    const isValid =
        !loading &&
        !!start &&
        !!test &&
        !!name &&
        !!description &&
        !(submitting && submitting.type === 'loading') &&
        !(submitting && submitting.type !== 'success');

    const setLoadingFile = (type: SchematicType) => (value?: File) => {
        if (value) {
            setLoading({ type, value });
        } else {
            setLoading(undefined);
        }
    };

    useEffect(() => {
        if (loading) {
            const { value, type } = loading;

            const reader = new FileReader();
            reader.readAsDataURL(value);
            reader.onload = () => {
                let result = reader.result;

                if (typeof result !== 'string') {
                    throw new Error(
                        'Invalid result! Recieved type: ' + typeof result
                    );
                }

                result = result.split('base64,')[1];

                if (type === 'test') {
                    setTest(result);
                } else if (type === 'start') {
                    setStart(result);
                }

                setLoading(undefined);
            };

            return () => reader.abort();
        }
        return;
    }, [loading]);

    const fetch = useAuthenticatedFetch();

    const containerRef = useRef<HTMLDivElement>(null)!;
    const width = useElementWidth(containerRef as React.MutableRefObject<
        HTMLElement
    >);

    useAuthenticatedPage();

    const submitGolf = () => {
        if (!isValid || submitting) {
            return;
        }

        setSubmitting({ type: 'loading' });

        fetch('/api/submit-golf', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: name,
                start_schematic: start,
                test_schematic: test,
                description
            })
        })
            .then(res => res.json())
            .then(({ golf_id }: { golf_id: string }) => {
                if (!golf_id) {
                    setSubmitting({ type: 'failed' });
                } else {
                    setSubmitting({
                        type: 'success',
                        data: (
                            <p>
                                Successfully created golf, click{' '}
                                <a href={'/golf/' + golf_id}>here</a> to view
                            </p>
                        )
                    });
                }
            })
            .catch(e => {
                console.error(e);
                setSubmitting({ type: 'failed', data: e });
            });
    };

    return (
        <Layout>
            <SEO title="Submit | WorldEdit Golf" description="Create a new challenge at WorldEdit Golf!" />
            <Container ref={containerRef}>
                <BrandHeader />
                {submitting && submitting.type === 'loading' && (
                    <LoadingContainer>
                        <Loading />
                        <h1>Loading...</h1>
                    </LoadingContainer>
                )}
                <h1>Create Golf!</h1>
                {submitting && submitting.data && (
                    <InfoContainer
                        color={
                            submitting.type === 'failed' ? '#ff0000' : '#00ff00'
                        }
                    >
                        {submitting.data}
                    </InfoContainer>
                )}
                <Input onChange={setName} name="Title" />
                <TextArea onChange={setDescription} name="Description" />
                <FileSelector
                    disabled={!!loading}
                    onChange={setLoadingFile('start')}
                    accept=".schem"
                    filter={filter}
                    name="Start Schematic"
                />
                {start && (
                    <Schematic size={Math.min(width, 500)} schematic={start} />
                )}
                <FileSelector
                    disabled={!!loading}
                    onChange={setLoadingFile('test')}
                    accept=".schem"
                    filter={filter}
                    name="Test Schematic"
                />
                {test && (
                    <Schematic size={Math.min(width, 500)} schematic={test} />
                )}
                <PurpleButton onClick={submitGolf} disabled={!isValid}>
                    Upload Golf
                </PurpleButton>
            </Container>
        </Layout>
    );
};

export const getServerSideProps = () => ({});

export default Submit;

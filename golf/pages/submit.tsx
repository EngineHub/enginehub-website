import type { MutableRefObject, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import {
    BrandButton,
    Button,
    Container,
    FileSelector,
    SEO,
    useElementWidth
} from '@enginehub/shared';

import {
    useAuthenticatedFetch,
    useAuthenticatedPage
} from '../src/components/Auth';
import { BrandHeader } from '../src/components/BrandHeader';
import Input from '../src/components/Input/Input';
import { TextArea } from '../src/components/Input/TextArea';
import { Loading } from '../src/components/Loading';
import { SubmitLoadingContainer } from '../src/components/Loading.module.css';
import { Schematic } from '../src/components/Schematic';
import Layout from '../src/Layout';

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

const schematicFileFilter = (file: File) => file.name.endsWith('.schem');

const Submit = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [start, setStart] = useState<string | undefined>();
    const [test, setTest] = useState<string | undefined>();
    const [loading, setLoading] = useState<FileToLoad | undefined>();
    const [submitting, setSubmitting] = useState<Submitting>();

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
                    throw new TypeError(
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
    }, [loading]);

    const fetch = useAuthenticatedFetch();

    const containerRef = useRef<HTMLDivElement>(null);
    const width = useElementWidth(
        containerRef as MutableRefObject<HTMLElement>
    );

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
                if (golf_id) {
                    setSubmitting({
                        type: 'success',
                        data: (
                            <p>
                                Successfully created golf, click{' '}
                                <a href={'/golf/' + golf_id}>here</a> to view
                            </p>
                        )
                    });
                } else {
                    setSubmitting({ type: 'failed' });
                }
            })
            .catch(e => {
                console.error(e);
                setSubmitting({ type: 'failed', data: e });
            });
    };

    return (
        <Layout>
            <SEO
                title="Submit | WorldEdit Golf"
                description="Create a new challenge at WorldEdit Golf!"
            />
            <div className={Container} ref={containerRef}>
                <BrandHeader />
                {submitting && submitting.type === 'loading' && (
                    <div className={SubmitLoadingContainer}>
                        <Loading />
                        <h1>Loading...</h1>
                    </div>
                )}
                <h1>Create Golf!</h1>
                {submitting && submitting.data && (
                    <div
                        style={{
                            borderRadius: '3px',
                            padding: '6px 10px',
                            background:
                                submitting.type === 'failed'
                                    ? '#ff000066'
                                    : '#00ff0066',
                            border:
                                submitting.type === 'failed'
                                    ? '#ff0000 2px solid'
                                    : '#00ff00 2px solid'
                        }}
                    >
                        {submitting.data}
                    </div>
                )}
                <Input onChange={setName} name="Title" />
                <TextArea onChange={setDescription} name="Description" />
                <FileSelector
                    disabled={loading !== undefined}
                    onChange={setLoadingFile('start')}
                    accept=".schem"
                    filter={schematicFileFilter}
                    name="Start Schematic"
                />
                {start && (
                    <Schematic size={Math.min(width, 500)} schematic={start} />
                )}
                <FileSelector
                    disabled={loading !== undefined}
                    onChange={setLoadingFile('test')}
                    accept=".schem"
                    filter={schematicFileFilter}
                    name="Test Schematic"
                />
                {test && (
                    <Schematic size={Math.min(width, 500)} schematic={test} />
                )}
                <button
                    className={`${Button} ${BrandButton}`}
                    onClick={submitGolf}
                    disabled={!isValid}
                >
                    Upload Golf
                </button>
            </div>
        </Layout>
    );
};

export default Submit;

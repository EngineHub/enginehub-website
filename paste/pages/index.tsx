import styled from 'styled-components';
import { getFiles } from '../src/dragAndDrop';
import { Layout } from '../src/Layout';
import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { SEO, Loader } from '@enginehub/shared';
import { fromByteArray } from 'base64-js';

const Row = styled.div`
    display: flex;
    flex-grow: 1;
    min-height: min-content;
`;

const Form = styled.div`
    display: flex;
    flex-grow: 1;
`;

const PasteArea = styled.textarea`
    flex-grow: 1;
    resize: none;
    border: 0;
    margin: 0;
    padding: 15px;
    padding-top: 15px;
    color: inherit;
    background-color: transparent;
    outline: 0;
    font-size: 13px;
    line-height: 130%;
    white-space: pre;

    &:focus {
        outline: 0;
    }
`;

const DropPendingPasteArea = styled.div`
    flex-grow: 1;
    background-color: rgba(0, 0, 0, 0.5);
`;

const SavingOverlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

async function postContent(content: string, extension: string = '') {
    try {
        let { viewUrl, uploadUrl, uploadFields } = await (
            await fetch('/signed_paste', {
                headers: {
                    'x-paste-meta-extension': extension
                }
            })
        ).json();

        const formData = new FormData();

        Object.keys(uploadFields).forEach(key => {
            formData.append(key, uploadFields[key]);
        });

        formData.append('file', content);

        const data = await fetch(uploadUrl, {
            method: 'POST',
            body: formData
        });
        if (!data.ok) {
            throw new Error(await data.text());
        }

        if (extension) {
            viewUrl += `.${extension}`;
        }
        alert(`Saved! Available at ${viewUrl}`);
        if (viewUrl.startsWith('https://paste.enginehub.org')) {
            await Router.push(
                '/[id]',
                viewUrl.substring('https://paste.enginehub.org'.length)
            );
        } else {
            window.location.href = viewUrl;
        }
    } catch (e: any) {
        console.error(e?.message ?? e);
        alert(`Failed to submit the post! ${e?.message ?? e}`);
    }
}

function Index() {
    const [content, setContent] = useState('');
    const [extension, setExtension] = useState('');
    const [saving, setSaving] = useState(false);
    const [dragging, setDragging] = useState(false);

    const save = useCallback(() => {
        setSaving(true);
        if (content.trim().length > 0) {
            postContent(content, extension).then(() => setSaving(false));
        }
    }, [content, extension]);

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.currentTarget.value);
    };

    const onDrop = (event: React.DragEvent<any>) => {
        event.preventDefault();
        setDragging(false);

        const files = getFiles(event);
        if (files.length === 0) {
            return;
        }
        const firstFile = files[0];
        if (firstFile.name.endsWith('.schem')) {
            firstFile
                .arrayBuffer()
                .then(buffer => {
                    setContent(fromByteArray(new Uint8Array(buffer)));
                    setExtension('schem');
                })
                .catch(e => console.error(e));
        } else {
            firstFile
                .text()
                .then(text => {
                    setContent(text);
                })
                .catch(e => console.error(e));
        }
    };

    const onDragEnter = (event: React.DragEvent<any>) => {
        event.preventDefault();
        setDragging(true);
    };

    const onDragEnd = () => {
        setDragging(false);
    };

    const dndProps = {
        onDrop,
        onDragEnter,
        onDragOver: onDragEnter,
        onDragEnd,
        onDragLeave: onDragEnd
    };

    const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!saving && event.ctrlKey && event.code === 'KeyS') {
                event.preventDefault();
                save();
            }
        },
        [save, saving]
    );

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    return (
        <Layout saveCallback={save}>
            <SEO
                title="Create a Paste | EngineHub Pastebin"
                description="EngineHub Pastebin Service. Store logs, profiles, and reports with ease."
            />
            {dragging ? (
                <Row>
                    <DropPendingPasteArea {...dndProps} />
                </Row>
            ) : (
                <Row>
                    <Form>
                        <PasteArea
                            placeholder="Enter your text here..."
                            value={content}
                            onChange={onChange}
                            {...dndProps}
                        />
                    </Form>
                </Row>
            )}
            {saving && (
                <SavingOverlay>
                    <Loader />
                </SavingOverlay>
            )}
        </Layout>
    );
}

export default Index;

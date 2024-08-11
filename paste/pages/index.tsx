import { getFiles } from '../src/dragAndDrop';
import { Layout } from '../src/Layout';
import Router from 'next/router';
import type { ChangeEvent, DragEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { SEO, Loader } from '@enginehub/shared';
import { fromByteArray } from 'base64-js';
import {
    DropPendingPasteArea,
    Form,
    PasteArea,
    Row,
    SavingOverlay
} from '../src/IndexComponents.module.css';
import { MAX_SIZE } from '../src/types';

async function postContent(content: string, extension = '') {
    try {
        if (Buffer.byteLength(content, 'utf-8') > MAX_SIZE) {
            throw new Error(
                'File too large, above max size of ' +
                    Math.round(MAX_SIZE / 1024 / 1024) +
                    'MB'
            );
        }

        // eslint-disable-next-line prefer-const
        let { viewUrl, uploadUrl, headers } = await (
            await fetch('/signed_paste', {
                headers: {
                    'x-paste-meta-extension': extension
                }
            })
        ).json();

        const data = await fetch(uploadUrl, {
            method: 'PUT',
            body: content,
            headers
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
        alert(`Failed to submit the post? ${e?.message ?? e}`);
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
            postContent(content, extension)
                .then(() => setSaving(false))
                .catch(() => setSaving(false));
        }
    }, [content, extension]);

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.currentTarget.value);
    };

    const onDrop = (event: DragEvent<any>) => {
        event.preventDefault();
        setDragging(false);

        const files = getFiles(event);
        if (files.length === 0) {
            return;
        }
        const firstFile = files[0];
        if (
            firstFile.name.endsWith('.schem') ||
            firstFile.name.endsWith('.nbt') ||
            firstFile.name.endsWith('.schematic')
        ) {
            firstFile
                .arrayBuffer()
                .then(buffer => {
                    setContent(fromByteArray(new Uint8Array(buffer)));
                    setExtension('schem');
                })
                .catch(e => console.error(e));
        } else if (
            firstFile.name.endsWith('.log.gz') &&
            typeof DecompressionStream !== 'undefined'
        ) {
            const decompressionStream = new DecompressionStream('gzip');
            new Response(firstFile.stream().pipeThrough(decompressionStream))
                .text()
                .then(text => {
                    setContent(text);
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

    const onDragEnter = (event: DragEvent<any>) => {
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
                <div className={Row}>
                    <div className={DropPendingPasteArea} {...dndProps} />
                </div>
            ) : (
                <div className={Row}>
                    <div className={Form}>
                        <textarea
                            className={PasteArea}
                            placeholder="Enter your text here..."
                            value={content}
                            onChange={onChange}
                            {...dndProps}
                        />
                    </div>
                </div>
            )}
            {saving && (
                <div className={SavingOverlay}>
                    <Loader />
                </div>
            )}
        </Layout>
    );
}

export default Index;

import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import { lazy, Suspense } from 'react';

import { SEO } from '@enginehub/shared';

import { Layout } from '../../src/Layout';
import { loadPaste } from '../../src/loadPaste';
import type { Extension, PasteData } from '../../src/types';

interface DocumentProps extends PasteProps {
    extension: Extension;
}

export interface PasteProps {
    paste: string;
    metadata?: PasteData['metadata'];
}

const EXTENSIONS: Map<Extension, FC<PasteProps>> = new Map([
    ['', lazy(() => import('../../src/views/PasteComponent'))],
    ['paste', lazy(() => import('../../src/views/PasteComponent'))],
    ['report', lazy(() => import('../../src/views/ReportComponent'))],
    ['profile', lazy(() => import('../../src/views/ProfileComponent'))],
    ['log', lazy(() => import('../../src/views/PasteComponent'))],
    ['schem', lazy(() => import('../../src/views/SchematicComponent'))]
]);

function Document({ paste, extension, metadata }: DocumentProps) {
    const Renderer = EXTENSIONS.get(extension)!;
    return (
        <Layout showHelp={false}>
            <SEO
                title="Paste Viewer | EngineHub Pastebin"
                description={
                    extension === 'schem'
                        ? 'View and download this schematic with EngineHub'
                        : paste.slice(0, 150)
                }
            />
            <Suspense fallback={<p>Loading...</p>}>
                <Renderer paste={paste} metadata={metadata} />
            </Suspense>
        </Layout>
    );
}

function isValidExtension(extension: string): extension is Extension {
    return EXTENSIONS.has(extension as Extension);
}

export const getStaticProps: GetStaticProps<object, { id: string }> = async ({
    params
}) => {
    const { id } = params!;
    let pasteId = `${id}`;
    let extension: Extension | undefined;
    const dotIndex = id.lastIndexOf('.');
    if (dotIndex !== -1) {
        const extracted = pasteId.slice(Math.max(0, dotIndex + 1));
        pasteId = pasteId.slice(0, Math.max(0, dotIndex));
        if (isValidExtension(extracted)) {
            extension = extracted;
        }
    }

    try {
        const pasteContents = await loadPaste(pasteId);

        if (!pasteContents) {
            return {
                notFound: true,
                revalidate: false
            };
        }

        if (
            !extension &&
            pasteContents.metadata?.extension &&
            isValidExtension(pasteContents.metadata?.extension)
        ) {
            extension = pasteContents.metadata?.extension;
        }

        return {
            props: {
                paste: pasteContents.content,
                extension: extension ?? '',
                metadata: pasteContents.metadata ?? {}
            },
            revalidate: 3600
        };
    } catch (e) {
        if (e && typeof e === 'object' && 'code' in e && e.code === 404) {
            return {
                notFound: true,
                revalidate: false
            };
        }
        console.error(e);
        return {
            props: {
                paste: JSON.stringify(e),
                extension: '',
                metadata: {}
            },
            revalidate: false
        };
    }
};

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    };
};

export default Document;

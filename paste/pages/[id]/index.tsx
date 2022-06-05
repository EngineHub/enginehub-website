import React, { Suspense } from 'react';
import { Layout } from '../../src/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { loadPaste } from '../../src/loadPaste';
import { SEO } from '@enginehub/shared';
import { Extension, PasteData } from '../../src/types';

interface DocumentProps extends PasteProps {
    extension: Extension;
}

export interface PasteProps {
    paste: string;
    metadata?: PasteData['metadata'];
}

const EXTENSIONS: Map<Extension, React.FC<PasteProps>> = new Map([
    ['', React.lazy(() => import('../../src/views/PasteComponent'))],
    ['paste', React.lazy(() => import('../../src/views/PasteComponent'))],
    ['report', React.lazy(() => import('../../src/views/ReportComponent'))],
    ['profile', React.lazy(() => import('../../src/views/ProfileComponent'))],
    ['log', React.lazy(() => import('../../src/views/PasteComponent'))],
    ['schem', React.lazy(() => import('../../src/views/SchematicComponent'))]
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
                        : paste.substring(0, 150)
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

export const getStaticProps: GetStaticProps<{}, { id: string }> = async ({
    params
}) => {
    const { id } = params!;
    let pasteId = `${id}`;
    let extension: Extension | undefined = undefined;
    const dotIndex = id!.lastIndexOf('.');
    if (dotIndex !== -1) {
        const extracted = pasteId.substring(dotIndex + 1);
        pasteId = pasteId.substring(0, dotIndex);
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
                metadata: pasteContents.metadata
            },
            revalidate: 3600
        };
    } catch (e) {
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

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    };
};

export default Document;

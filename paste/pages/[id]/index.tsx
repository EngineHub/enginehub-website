import type { GetStaticPaths, GetStaticProps } from 'next';
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

function Document({ paste, extension, metadata }: DocumentProps) {
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
                {renderExtension(extension, { paste, metadata })}
            </Suspense>
        </Layout>
    );
}

const PasteRenderer = lazy(() => import('../../src/views/PasteComponent'));
const ReportRenderer = lazy(() => import('../../src/views/ReportComponent'));
const ProfileRenderer = lazy(() => import('../../src/views/ProfileComponent'));
const SchematicRenderer = lazy(
    () => import('../../src/views/SchematicComponent')
);

function renderExtension(extension: Extension, props: PasteProps) {
    switch (extension) {
        case '':
        case 'paste':
        case 'log':
            return <PasteRenderer {...props} />;
        case 'report':
            return <ReportRenderer {...props} />;
        case 'profile':
            return <ProfileRenderer {...props} />;
        case 'schem':
            return <SchematicRenderer {...props} />;
    }
}

const EXTENSIONS = new Set<Extension>([
    '',
    'paste',
    'report',
    'profile',
    'log',
    'schem'
]);

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

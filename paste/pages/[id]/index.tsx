import React from 'react';
import { Layout } from '@paste/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import PasteComponent from '@paste/views/PasteComponent';
import ProfileComponent from '@paste/views/ProfileComponent';
import ReportComponent from '@paste/views/ReportComponent';
import { loadPaste } from '@paste/loadPaste';
import SchematicComponent from '@paste/views/SchematicComponent';
import SEO from '@shared/components/Seo';

interface DocumentProps extends PasteProps {
    extension: Extension;
}

export interface PasteProps {
    paste: string;
}

const EXTENSIONS: Map<string, React.FC<PasteProps>> = new Map([
    ['', PasteComponent],
    ['paste', PasteComponent],
    ['report', ReportComponent],
    ['profile', ProfileComponent],
    ['log', PasteComponent],
    ['schem', SchematicComponent]
]);

type Extension = '' | 'report' | 'paste' | 'profile' | 'log' | 'schem';

function Document({ paste, extension }: DocumentProps) {
    const Renderer = EXTENSIONS.get(extension)!;
    return (
        <Layout showHelp={false}>
            <SEO
                title="Paste Viewer | EngineHub Pastebin"
                description={paste.substring(0, 150)}
            />
            <Renderer paste={paste} />
        </Layout>
    );
}

function isValidExtension(extension: string): extension is Extension {
    return EXTENSIONS.has(extension);
}

export const getStaticProps: GetStaticProps<{}, { id: string }> = async ({
    params
}) => {
    const { id } = params!;
    let pasteId = `${id}`;
    let extension: Extension = '';
    const dotIndex = id!.lastIndexOf('.');
    if (dotIndex !== -1) {
        const extracted = pasteId.substring(dotIndex + 1);
        pasteId = pasteId.substring(0, dotIndex);
        if (isValidExtension(extracted)) {
            extension = extracted;
        }
    }

    const pasteContents = await loadPaste(pasteId);

    if (!pasteContents) {
        return {
            notFound: true
        };
    }

    return {
        props: { paste: pasteContents, extension },
        revalidate: 3600
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    };
};

export default Document;

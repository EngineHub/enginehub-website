import React from 'react';
import { Layout } from '@paste/Layout';
import { NextPageContext } from 'next';
import Router from 'next/router';
import PasteComponent from '@paste/views/PasteComponent';
import ProfileComponent from '@paste/views/ProfileComponent';
import ReportComponent from '@paste/views/ReportComponent';
import { loadPaste } from '@paste/loadPaste';

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
    ['log', PasteComponent]
]);

type Extension = '' | 'report' | 'paste' | 'profile';

function Document({ paste, extension }: DocumentProps) {
    const Renderer = EXTENSIONS.get(extension)!;
    return (
        <Layout showHelp={false}>
            <Renderer paste={paste} />
        </Layout>
    );
}

function isValidExtension(extension: string): extension is Extension {
    return EXTENSIONS.has(extension);
}

export const getServerSideProps = async ({ query, res }: NextPageContext) => {
    const { id } = query;
    let pasteId = `${id}`;
    let extension: Extension = '';
    const dotIndex = id!.lastIndexOf('.');
    if (dotIndex !== -1) {
        const extracted = pasteId.substring(dotIndex + 1);
        pasteId = pasteId.substring(0, dotIndex);
        if (isValidExtension(extracted)) {
            extension = extracted;
        } else {
            if (res) {
                res.writeHead(302, {
                    Location: `/${pasteId}`
                });
                res.end();
            } else {
                Router.push(`/${pasteId}`);
            }
        }
    }
    const pasteContents = await loadPaste(pasteId);
    if (!pasteContents) {
        if (res) {
            res.writeHead(302, {
                Location: '/'
            });
            res.end();
        } else {
            Router.push('/');
        }
    }
    return {
        props: {
            paste: pasteContents || '',
            extension
        }
    };
};

export default Document;

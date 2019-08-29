import React, { FC, useMemo } from 'react';
import { Layout } from '@paste/Layout';
import { NextPageContext } from 'next-server/dist/lib/utils';
import styled from '@emotion/styled';
import { loadPaste } from '@paste/loadPaste';
import Router from 'next/router';
import { Gutter } from '@paste/Gutter';

interface DocumentProps extends PasteProps {
    extension: Extension;
}

interface PasteProps {
    paste: string;
}

const PasteContent = styled.div`
    display: block;
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    line-height: 130%;
    white-space: pre;
`;

const PasteComponent: FC<PasteProps> = ({ paste }) => {
    let lineNos = useMemo(() => {
        let text = '';
        const lineCount = paste.split('\n').length;
        for (let i = 0; i < lineCount; i++) {
            if (i !== 0) {
                text += '\n';
            }
            text += i + 1;
        }
        return text;
    }, [paste]);
    return (
        <>
            <Gutter>{lineNos}</Gutter>
            <PasteContent>{paste}</PasteContent>
        </>
    );
};

const EXTENSIONS: Map<string, FC<PasteProps>> = new Map([
    ['', PasteComponent],
    ['paste', PasteComponent],
    ['report', PasteComponent],
    ['profile', PasteComponent],
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

Document.getInitialProps = async ({ query, res }: NextPageContext) => {
    const { id } = query;
    let pasteId = `${id}`;
    let extension: Extension = '';
    const dotIndex = id.lastIndexOf('.');
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
        paste: pasteContents || '',
        extension
    };
};

export default Document;

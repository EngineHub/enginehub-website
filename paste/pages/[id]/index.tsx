import React, { FC } from 'react';
import { Layout } from '@paste/Layout';
import { NextPageContext } from 'next-server/dist/lib/utils';
import styled from '@emotion/styled';
import { getPaste } from '@paste/loadPaste';
import Router from 'next/router';

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
`;

const Gutter = styled.div`
    padding: 15px;
    float: left;
    width: 60px;
    text-align: right;
    color: #ccc;
`;

const PasteComponent: FC<PasteProps> = ({ paste }) => {
    const lineCount = paste.split('\n').length;
    let lineNos = '';
    for (let i = 0; i < lineCount; i++) {
        if (i !== 0) {
            lineNos += '\n';
        }
        lineNos += i + 1;
    }
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
    ['profile', PasteComponent]
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
        if (isValidExtension(extracted)) {
            extension = extracted;
        }
        pasteId = pasteId.substring(0, dotIndex);
    }
    const pasteContents = getPaste(pasteId);
    if (!pasteContents) {
        if (res) {
            res.writeHead(302, {
              Location: '/'
            })
            res.end()
          } else {
            Router.push('/')
          }
    }
    return {
        paste: pasteContents,
        extension
    };
};

export default Document;

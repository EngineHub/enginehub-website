import React from "react";
import { NextPageContext } from 'next-server/dist/lib/utils';

interface PasteProps {
    paste: string;
}

function RawDocument({ paste }: PasteProps) {
    return (
        <>{paste}</>
    );
}

RawDocument.getInitialProps = async ({ query }: NextPageContext) => {
    const { id } = query;
    let pasteId = `${id}`;
    const dotIndex = id.lastIndexOf('.');
    if (dotIndex !== -1) {
        pasteId = pasteId.substring(0, dotIndex);
    }
    return {
        paste: 'Test Data please ignore ' + pasteId
    };
};

export default RawDocument;

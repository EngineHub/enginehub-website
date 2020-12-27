import styled from 'styled-components';
import React, { useMemo } from 'react';
import { PasteProps } from 'paste/pages/[id]';
import { Gutter } from '@paste/Gutter';

const PasteContent = styled.div`
    display: block;
    padding-top: 15px;
    padding-right: 55px;
    line-height: 130%;
    white-space: pre;
    color: ${({ theme }) => theme.gray.font.normal};
`;

const PasteComponent: React.FC<PasteProps> = ({ paste }) => {
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

export default PasteComponent;

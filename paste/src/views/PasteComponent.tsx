import { styled } from 'styled-components';
import type { FC } from 'react';
import { useMemo } from 'react';
import type { PasteProps } from 'paste/pages/[id]';
import { Gutter } from '../Gutter';

const PasteContent = styled.div`
    display: block;
    padding-top: 15px;
    padding-right: 55px;
    line-height: 130%;
    white-space: pre;
`;

const PasteComponent: FC<PasteProps> = ({ paste }) => {
    const lineNos = useMemo(() => {
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

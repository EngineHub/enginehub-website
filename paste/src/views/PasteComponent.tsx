import type { FC } from 'react';
import { useMemo } from 'react';
import type { PasteProps } from 'paste/pages/[id]';
import { Gutter } from '../Gutter.module.css';
import { PasteContent } from './PasteComponent.module.css';

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
            <div className={Gutter}>{lineNos}</div>
            <div className={PasteContent}>{paste}</div>
        </>
    );
};

export default PasteComponent;

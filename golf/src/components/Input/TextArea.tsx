import { FormLabel } from '@enginehub/shared';
import type { FC, ChangeEvent } from 'react';
import { Container } from './TextArea.module.css';

export interface TextAreaProps {
    name: string;
    onChange?: (value: string) => void;
}

export const TextArea: FC<TextAreaProps> = ({ name, onChange, ...rest }) => {
    const changed = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange((e.target.value || '').trim());
        }
    };

    return (
        <div className={Container} {...rest}>
            <label className={FormLabel}>{name}</label>
            <textarea onChange={changed} />
        </div>
    );
};

export default TextArea;

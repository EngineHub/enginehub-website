import type { FC } from 'react';

import { FormLabel } from '@enginehub/shared';

import { Container } from './Input.module.css';

export interface InputProps {
    name: string;
    onChange?: (value: string) => void;
}

export const Input: FC<InputProps> = ({ name, onChange, ...rest }) => {
    const changed = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange((e.target.value || '').trim());
        }
    };

    return (
        <div className={Container} {...rest}>
            <label className={FormLabel}>{name}</label>
            <input onChange={changed} />
        </div>
    );
};

export default Input;

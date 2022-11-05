import styled from 'styled-components';
import { FormLabel } from '@enginehub/shared';
import type { FC } from 'react';

export interface InputProps {
    name: string;
    onChange?: (value: string) => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 6.5px 0;
    input {
        font-family: inherit;
        font-size: 1.2rem;
        border-radius: 4px;
        border: solid 2px rgba(28, 28, 28, 0.3);
        padding: 8px;
        margin: 6.5px 0;
        outline: none;
    }
`;

export const Input: FC<InputProps> = ({ name, onChange, ...rest }) => {
    const changed = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange((e.target.value || '').trim());
        }
    };

    return (
        <Container {...rest}>
            <FormLabel>{name}</FormLabel>
            <input onChange={changed} />
        </Container>
    );
};

export default Input;

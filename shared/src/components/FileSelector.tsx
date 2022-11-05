import type { FC, ChangeEvent } from 'react';
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { PurpleButtonStyle } from './Button';
import { FormLabel } from './text/FormLabel';

interface FileSelectorProps {
    name: string;
    accept?: string;
    onChange?: (file?: File) => void;
    filter?: (file: File) => boolean;
    disabled?: boolean;
}

const Input = styled.input`
    visibility: hidden;
    position: absolute;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 6.5px;
    margin-bottom: 6.5px;
`;

const ActionContainer = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
`;

const FileName = styled.span`
    font-size: 1.2rem;
    margin-left: 1rem;
`;

const PurpleButton = styled.button(PurpleButtonStyle);

export const FileSelector: FC<FileSelectorProps> = ({
    name,
    filter,
    accept,
    onChange,
    disabled,
    ...rest
}) => {
    const [files, setFiles] = useState<File[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const f = Array.from(e.target.files).filter(filter || (() => true));
        setFiles(f);
        if (onChange) {
            onChange(f[0]);
        }
    };

    useEffect(() => {
        if (onChange) {
            onChange(files[0]);
        }
    }, [files, onChange]);

    const openFilePicker = () => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    };

    return (
        <Container {...rest}>
            <FormLabel>{name}</FormLabel>
            <ActionContainer>
                <PurpleButton disabled={disabled} onClick={openFilePicker}>
                    Select File
                </PurpleButton>
                <FileName>{files[0] && files[0].name}</FileName>
            </ActionContainer>
            <Input
                ref={inputRef}
                onChange={onInputChange}
                {...{ accept }}
                type="file"
            />
        </Container>
    );
};

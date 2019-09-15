import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { PurpleButtonStyle } from '@shared/components/Button';
import { FormLabel } from '@shared/components/text/FormLabel';

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

export const FileSelector: React.FC<FileSelectorProps> = ({
    name,
    filter,
    accept,
    onChange,
    disabled,
    ...rest
}) => {
    const [files, setFiles] = useState<File[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = Array.from(e.target.files!).filter(filter || (() => true));
        setFiles(f);
        if (onChange) {
            onChange(f[0]);
        }
    };

    useEffect(() => {
        if (onChange) {
            onChange(files[0]);
        }
    }, [files]);

    const openFilePicker = () => {
        inputRef.current!.click();
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

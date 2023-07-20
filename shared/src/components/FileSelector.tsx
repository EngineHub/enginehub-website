import type { FC, ChangeEvent } from 'react';
import { useState, useRef, useEffect } from 'react';
import { FormLabel } from './text/FormLabel.module.css';
import {
    Input,
    Container,
    ActionContainer,
    FileName
} from './FileSelector.module.css';
import { BrandButton, Button } from './Button.module.css';

interface FileSelectorProps {
    name: string;
    accept?: string;
    onChange?: (file?: File) => void;
    filter?: (file: File) => boolean;
    disabled?: boolean;
}

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
        <div className={Container} {...rest}>
            <label className={FormLabel}>{name}</label>
            <div className={ActionContainer}>
                <button
                    className={`${Button} ${BrandButton}`}
                    disabled={disabled}
                    onClick={openFilePicker}
                >
                    Select File
                </button>
                <span className={FileName}>{files[0] && files[0].name}</span>
            </div>
            <input
                className={Input}
                ref={inputRef}
                onChange={onInputChange}
                {...{ accept }}
                type="file"
            />
        </div>
    );
};

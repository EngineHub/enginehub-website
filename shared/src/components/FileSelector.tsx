import type { ChangeEvent, FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import { BrandButton, Button } from './Button.module.css';
import {
    ActionContainer,
    Container,
    FileName,
    Input
} from './FileSelector.module.css';
import { FormLabel } from './text/FormLabel.module.css';

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
        // eslint-disable-next-line unicorn/prefer-spread
        const f = Array.from(e.target.files).filter(file =>
            filter ? filter(file) : true
        );
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

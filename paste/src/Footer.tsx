import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';

import {
    Button,
    LabelledSponsorsArea,
    MainLink,
    PrimaryButton
} from '@enginehub/shared';

import { FooterContainer, InfoBar, Sponsors } from './Footer.module.css';
import type { Extension, PasteData } from './types';

export interface FooterProps {
    paste?: string;
    metadata?: PasteData['metadata'];
    extension?: Extension;
}

export const Footer: FC<FooterProps> = ({ paste, metadata, extension }) => (
    <footer className={FooterContainer}>
        {(metadata?.name || metadata?.author || extension === 'schem') && (
            <div className={InfoBar}>
                {metadata?.name && <p>Name: {metadata.name}</p>}
                {metadata?.author && <p>Author: {metadata.author}</p>}
                {extension === 'schem' && (
                    <>
                        <a
                            className={`${Button} ${PrimaryButton}`}
                            href={`data:text/plain;base64,${paste}`}
                            download={`${metadata?.name ?? 'enginehub_schematic'}.schem`}
                            aria-label="Download schematic"
                        >
                            <FontAwesomeIcon icon={faDownload} />
                        </a>
                        <p>
                            Want more info on this schematic? Check out{' '}
                            <a
                                className={MainLink}
                                style={{ margin: 0 }}
                                href="https://madelinemiller.dev/apps/schematic-info/"
                            >
                                this tool
                            </a>
                            !
                        </p>
                    </>
                )}
            </div>
        )}
        <LabelledSponsorsArea className={Sponsors} />
    </footer>
);

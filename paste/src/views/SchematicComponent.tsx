import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { PasteProps } from 'paste/pages/[id]';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Button, MainLink, PrimaryButton } from '@enginehub/shared';

import { Container, InfoBarContainer } from './SchematicComponent.module.css';

const PAGE_HEIGHT_MOD = 57 + 45; // navbar height + info bar height

const DEFAULT_METADATA: PasteProps['metadata'] = {};

const InfoBar: FC<PasteProps> = ({ paste, metadata = DEFAULT_METADATA }) => {
    const onClickDownload = () => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;base64,' + paste);
        element.setAttribute(
            'download',
            `${metadata.name ?? 'enginehub_schematic'}.schem`
        );

        element.style.display = 'none';
        document.body.append(element);

        element.click();

        element.remove();
    };

    return (
        <div className={InfoBarContainer}>
            <p>Name: {metadata.name ?? 'Unnamed'}</p>
            <p>Author: {metadata.author ?? 'Unknown'}</p>
            <a
                className={`${Button} ${PrimaryButton}`}
                onClick={onClickDownload}
            >
                <FontAwesomeIcon icon={faDownload} />
            </a>
            <p>
                Want more info about this schematic? Check out{' '}
                <a
                    className={MainLink}
                    style={{ margin: '0' }}
                    href="https://madelinemiller.dev/apps/schematic-info/"
                >
                    this tool
                </a>
                !
            </p>
        </div>
    );
};

const SchematicComponent: FC<PasteProps> = ({ paste, metadata }) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const [resize, setResize] =
        useState<(width: number, height: number) => void>();
    const [destroy, setDestroy] = useState<() => void>(() => {});

    useEffect(() => {
        if (resize) {
            resize(window.innerWidth, window.innerHeight - PAGE_HEIGHT_MOD);

            const onResize = (_event: UIEvent) => {
                if (resize) {
                    resize(
                        window.innerWidth,
                        window.innerHeight - PAGE_HEIGHT_MOD
                    );
                }
            };

            window.addEventListener('resize', onResize);
            return () => window.removeEventListener('resize', onResize);
        }
    }, [resize]);

    useEffect(() => {
        if (paste && ref.current) {
            import('@enginehub/schematicwebviewer')
                .then(({ renderSchematic }) =>
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    renderSchematic(ref.current!, paste, {
                        corsBypassUrl: 'https://corsanywhere.enginehub.org/?',
                        renderBars: false,
                        renderArrow: false
                    })
                )
                .then(({ destroy: d, setSize: r }) => {
                    setResize(() => r);
                    setDestroy(() => d);
                })
                .catch(e => {
                    console.error(e, paste);
                });
            return destroy;
        }
    }, [paste]);

    return (
        <div style={{ width: '100%', height: 'calc(100% - 45px)' }}>
            <div className={Container}>
                <canvas ref={ref} />
            </div>
            <InfoBar paste={paste} metadata={metadata} />
        </div>
    );
};

export default SchematicComponent;

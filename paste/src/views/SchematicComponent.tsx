import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { PasteProps } from 'paste/pages/[id]';
import { renderSchematic } from '@enginehub/schematicwebviewer';
import styled from 'styled-components';
import { BlueButtonStyle } from '@enginehub/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    background: grey;

    canvas {
        width: 100%;
        height: 100%;
    }
`;

const BlueButton = styled.a(BlueButtonStyle);

const PAGE_HEIGHT_MOD = 57 + 45; // navbar height + info bar height

const InfoBarContainer = styled.div`
    background-color: white;
    display: flex;
    width: 100%;
    justify-content: center;
    height: 45px;

    * {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
`;

const SiteLink = styled.a`
    color: #0059d1;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    margin: 0;

    :hover,
    :focus {
        color: #003884;
        text-decoration: underline;
    }
`;

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
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    return (
        <InfoBarContainer>
            <p>Name: {metadata.name ?? 'Unnamed'}</p>
            <p>Author: {metadata.author ?? 'Unknown'}</p>
            <BlueButton onClick={onClickDownload}>
                <FontAwesomeIcon icon={faDownload} />
            </BlueButton>
            <p>
                Want more info about this schematic? Check out{' '}
                <SiteLink href="https://madelinemiller.dev/apps/schematic-info/">
                    this tool
                </SiteLink>
                !
            </p>
        </InfoBarContainer>
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
        return;
    }, [resize]);

    useEffect(() => {
        if (paste && ref.current) {
            renderSchematic(ref.current, paste, {
                corsBypassUrl: 'https://cors-anywhere-eh.octyl.net/',
                renderBars: false,
                renderArrow: false
            })
                .then(({ destroy: d, setSize: r }) => {
                    setResize(() => r);
                    setDestroy(() => d);
                })
                .catch(() => {});
            return destroy;
        }
        return;
    }, [paste]);

    return (
        <div style={{ width: '100%', height: 'calc(100% - 45px)' }}>
            <Container>
                <canvas ref={ref} />
            </Container>
            <InfoBar paste={paste} metadata={metadata} />
        </div>
    );
};

export default SchematicComponent;

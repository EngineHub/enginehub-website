import React, { useEffect, useRef, useState } from 'react';
import { PasteProps } from 'paste/pages/[id]';
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

const InfoBar: React.FC<PasteProps> = ({ paste, metadata = {} }) => {
    const onClickDownload = () => {
        var element = document.createElement('a');
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
        </InfoBarContainer>
    );
};

const SchematicComponent: React.FC<PasteProps> = ({ paste, metadata }) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const [resize, setResize] = useState<(size: number) => void>();
    const [destroy, setDestroy] = useState<() => void>(() => {});

    useEffect(() => {
        if (resize) {
            resize(
                Math.min(
                    window.innerWidth,
                    window.innerHeight - PAGE_HEIGHT_MOD
                )
            );

            const onResize = (_event: UIEvent) => {
                if (resize) {
                    resize(
                        Math.min(
                            window.innerWidth,
                            window.innerHeight - PAGE_HEIGHT_MOD
                        )
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
                size: 250,
                corsBypassUrl: 'https://cors-anywhere-eh.octyl.net/',
                renderBars: false,
                renderArrow: false
            }).then(({ destroy: d, resize: r }) => {
                setResize(() => r);
                setDestroy(() => d);
            });
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

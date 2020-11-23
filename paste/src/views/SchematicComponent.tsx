import React, { useEffect, useRef, useState } from 'react';
import { PasteProps } from 'paste/pages/[id]';
import { renderSchematic } from '@enginehub/schematicwebviewer';
import styled from 'styled-components';

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

const SchematicComponent: React.FC<PasteProps> = ({ paste }) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const [resize, setResize] = useState<(size: number) => void>();
    const [destroy, setDestroy] = useState<() => void>(() => {});

    useEffect(() => {
        if (resize) {
            resize(Math.min(window.innerWidth, window.innerHeight - 44.5));

            const onResize = (_event: UIEvent) => {
                if (resize) {
                    resize(
                        Math.min(window.innerWidth, window.innerHeight - 44.5)
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
                texturePrefix: 'https://worldedit.golf/static',
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
        <Container>
            <canvas ref={ref} />
        </Container>
    );
};

export default SchematicComponent;

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

const PAGE_HEIGHT_MOD = 57; // navbar height

const SchematicComponent: React.FC<PasteProps> = ({ paste }) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const [resize, setResize] = useState<(size: number) => void>();
    const [destroy, setDestroy] = useState<() => void>(() => {});

    useEffect(() => {
        if (resize) {
            resize(Math.min(window.innerWidth, window.innerHeight - PAGE_HEIGHT_MOD));

            const onResize = (_event: UIEvent) => {
                if (resize) {
                    resize(
                        Math.min(window.innerWidth, window.innerHeight - PAGE_HEIGHT_MOD)
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
                jarUrl: 'http://me4502.com:2088/https://launcher.mojang.com/v1/objects/1952d94a0784e7abda230aae6a1e8fc0522dba99/client.jar',
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

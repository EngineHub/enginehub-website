import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { renderSchematic } from '@enginehub/schematicwebviewer';

interface SchematicProps {
    schematic: string;
    size?: number;
    preview?: boolean;
}

const Container = styled.div<{ size: number }>`
    display: flex;
    align-items: center;
    justify-content: center;

    canvas {
        width: ${({ size }) => size}px;
        height: ${({ size }) => size}px;
        border: solid 2px rgba(28, 28, 28, 0.3);
    }
`;

export const Schematic: React.FC<SchematicProps> = ({
    schematic,
    size = 500,
    preview = true,
    ...rest
}) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const [resize, setResize] = useState<(size: number) => void>();
    const [destroy, setDestroy] = useState<() => void>(() => {});

    useEffect(() => {
        if (resize) {
            resize(size);
        }
    }, [size, resize]);

    useEffect(() => {
        if (schematic && ref.current) {
            renderSchematic(ref.current, schematic, {
                size,
                jarUrl:
                    'https://corsanywhere.minidigger.me/https://launcher.mojang.com/v1/objects/1952d94a0784e7abda230aae6a1e8fc0522dba99/client.jar',
                renderBars: !preview
            }).then(({ destroy: d, resize: r }) => {
                setResize(() => r);
                setDestroy(() => d);
            });
            return destroy;
        }
        return;
    }, [schematic]);

    return (
        <Container size={size} {...rest}>
            <canvas ref={ref} />
        </Container>
    );
};

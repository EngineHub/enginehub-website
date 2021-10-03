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
    const [resize, setResize] = useState<(width: number, height: number) => void>();
    const [destroy, setDestroy] = useState<() => void>(() => {});

    useEffect(() => {
        if (resize) {
            resize(size, size);
        }
    }, [size, resize]);

    useEffect(() => {
        if (schematic && ref.current) {
            renderSchematic(ref.current, schematic, {
                size,
                corsBypassUrl: 'https://cors-anywhere-eh.octyl.net/',
                renderBars: !preview
            }).then(({ destroy: d, setSize: r }) => {
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

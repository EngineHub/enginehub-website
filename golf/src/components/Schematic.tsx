import type { FC } from 'react';
import { useRef, useEffect, useState } from 'react';
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

export const Schematic: FC<SchematicProps> = ({
    schematic,
    size = 500,
    preview = true,
    ...rest
}) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const [resize, setResize] =
        useState<(width: number, height: number) => void>();
    const callbacks = useRef<{ destroy: () => void }>({ destroy: () => {} });

    useEffect(() => {
        if (resize) {
            resize(size, size);
        }
    }, [size, resize]);

    useEffect(() => {
        if (schematic && ref.current) {
            renderSchematic(ref.current, schematic, {
                corsBypassUrl: 'https://cors-anywhere-eh.octyl.net/',
                renderBars: !preview
            })
                .then(({ destroy: d, setSize: r }) => {
                    setResize(() => r);
                    callbacks.current.destroy = d;
                })
                .catch(() => {});
            return callbacks.current.destroy;
        }
        return;
    }, [schematic, preview]);

    return (
        <Container size={size} {...rest}>
            <canvas ref={ref} />
        </Container>
    );
};

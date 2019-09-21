import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { renderSchematic } from '@enginehub/schematicwebviewer';

interface SchematicProps {
    schematic: string;
    size?: number;
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
    ...rest
}) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const [resize, setResize] = useState<(size: number) => void>();

    useEffect(() => {
        if (resize) {
            resize(size);
        }
    }, [size]);

    useEffect(() => {
        if (schematic && ref.current) {
            const { destroy, resize: r } = renderSchematic(
                ref.current,
                schematic,
                size
            );
            setResize(() => r);
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

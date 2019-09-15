import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';

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
    const [resize] = useState<(size: number) => void>();

    useEffect(() => {
        if (resize) {
            resize(size);
        }
    }, [size]);

    useEffect(() => {
        if (schematic && ref.current) {
            // const { destroy, resize: r } = renderSchematic(
            //     ref.current,
            //     schematic,
            //     size
            // );
            // setResize(() => r);
            // return destroy;
            const context = ref.current!.getContext('2d')!;
            context.textAlign = 'center';
            context.fillText(
                'Back Soon',
                ref.current!.width / 2,
                ref.current!.height / 2
            );
        }
    }, [schematic]);

    return (
        <Container size={size} {...rest}>
            <canvas ref={ref} />
        </Container>
    );
};

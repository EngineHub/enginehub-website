import type { FC } from 'react';
import { useRef, useEffect, useState } from 'react';
import { renderSchematic } from '@enginehub/schematicwebviewer';
import { Container } from './Schematic.module.css';

interface SchematicProps {
    schematic: string;
    size?: number;
    preview?: boolean;
}

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
                renderBars: !preview,
                orbitSpeed: 0.01
            })
                .then(({ destroy: d, setSize: r }) => {
                    setResize(() => r);
                    callbacks.current.destroy = d;
                })
                .catch(() => undefined);
            return callbacks.current.destroy;
        }
        return;
    }, [schematic, preview]);

    return (
        <div className={Container} {...rest}>
            <canvas ref={ref} style={{ width: size, height: size }} />
        </div>
    );
};

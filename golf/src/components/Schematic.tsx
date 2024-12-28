import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

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
            import('@enginehub/schematicwebviewer')
                .then(({ renderSchematic }) =>
                    renderSchematic(ref.current!, schematic, {
                        corsBypassUrl: 'https://corsanywhere.enginehub.org/',
                        renderBars: !preview,
                        orbitSpeed: 0.01
                    })
                )
                .then(({ destroy: d, setSize: r }) => {
                    setResize(() => r);
                    callbacks.current.destroy = d;
                })
                .catch(e => {
                    console.error(e, schematic);
                });
            return callbacks.current.destroy;
        }
    }, [schematic, preview]);

    return (
        <div className={Container} {...rest}>
            <canvas ref={ref} style={{ width: size, height: size }} />
        </div>
    );
};

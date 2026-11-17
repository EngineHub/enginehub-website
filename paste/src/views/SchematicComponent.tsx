import type { PasteProps } from 'paste/pages/[id]';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Container } from './SchematicComponent.module.css';

const SchematicComponent: FC<PasteProps> = ({ paste }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLCanvasElement>(null);
    const [resize, setResize] =
        useState<(width: number, height: number) => void>();
    const destroy = useRef<(() => void) | undefined>(undefined);

    useEffect(() => {
        if (resize && containerRef.current) {
            const observer = new ResizeObserver(entries => {
                for (const { contentRect } of entries) {
                    resize(contentRect.width, contentRect.height);
                }
            });
            observer.observe(containerRef.current);
            return () => observer.disconnect();
        }
    }, [resize]);

    useEffect(() => {
        let cancelled = false;

        if (paste && ref.current) {
            import('@enginehub/schematicwebviewer')
                .then(({ renderSchematic }) =>
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    renderSchematic(ref.current!, paste, {
                        corsBypassUrl: 'https://corsanywhere.enginehub.org/',
                        renderBars: false,
                        renderArrow: false
                    })
                )
                .then(schematicViewer => {
                    if (cancelled) {
                        schematicViewer.destroy();
                        return;
                    }

                    destroy.current = () => schematicViewer.destroy();
                    setResize(
                        () => (width: number, height: number) =>
                            schematicViewer.setSize(width, height)
                    );
                })
                .catch(e => {
                    console.error(e, paste);
                });
        }

        return () => {
            cancelled = true;
            destroy.current?.();
            destroy.current = undefined;
        };
    }, [paste]);

    return (
        <div className={Container} ref={containerRef}>
            <canvas ref={ref} />
        </div>
    );
};

export default SchematicComponent;

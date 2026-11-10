import { type RefObject, useEffect, useState } from 'react';

export const useElementWidth: <T extends HTMLElement>(
    ref: RefObject<T>
) => number = ref => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        const observer = new ResizeObserver(() => {
            setWidth(element.getBoundingClientRect().width);
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [ref]);

    return width;
};

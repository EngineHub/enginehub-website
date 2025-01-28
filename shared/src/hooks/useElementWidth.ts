import { type RefObject, useCallback, useEffect, useState } from 'react';

export const useElementWidth: <T extends HTMLElement>(
    ref: RefObject<T>
) => number = ref => {
    const getWidth = useCallback(
        () => ref?.current?.getBoundingClientRect()?.width ?? 0,
        [ref]
    );

    const [width, setWidth] = useState(getWidth());

    useEffect(() => {
        setWidth(getWidth());

        const handleResize = () => {
            setWidth(getWidth());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getWidth]);

    return width;
};

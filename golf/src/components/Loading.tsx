import NextImage from 'next/image';

import { Image as ImageStyle } from './Loading.module.css';

export const Loading = () => (
    <NextImage
        className={ImageStyle}
        src="/static/golfball.svg"
        width={400}
        height={400}
        alt={'Loading spinner'}
    />
);

import Image from 'next/image';
import type { FC } from 'react';

import { ImageContainer, InnerImage, WorldEditLogo } from './Logo.module.css';

export const Logo: FC = () => (
    <div className={ImageContainer}>
        <Image
            className={WorldEditLogo}
            src="/static/worldedit-logo.svg"
            width={143}
            height={143}
            alt="World Edit Logo"
        />
        <Image
            className={InnerImage}
            src="/static/golfball.svg"
            width={400}
            height={400}
            alt="Golf Ball"
        />
    </div>
);

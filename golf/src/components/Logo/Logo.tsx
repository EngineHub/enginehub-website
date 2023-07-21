import type { FC } from 'react';
import { ImageContainer, InnerImage, WorldEditLogo } from './Logo.module.css';

export const Logo: FC = () => (
    <div className={ImageContainer}>
        <img
            className={WorldEditLogo}
            src="/static/worldedit-logo.svg"
            alt="World Edit Logo"
        />
        <img
            className={InnerImage}
            src="/static/golfball.svg"
            alt="Golf Ball"
        />
    </div>
);

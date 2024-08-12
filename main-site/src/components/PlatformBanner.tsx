import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import type { FC, PropsWithChildren } from 'react';

import { InfoBox, LogoBox, Wrapper } from './PlatformBanner.module.css';

interface PlatformBannerProps {
    alt: string;
    img:
        | StaticImageData
        | (Pick<StaticImageData, 'src'> & Partial<StaticImageData>);
    width?: number;
}

const BANNER_WIDTH = 150;

const PlatformBanner: FC<PropsWithChildren<PlatformBannerProps>> = ({
    children,
    img,
    alt,
    width = BANNER_WIDTH
}) => (
    <div className={Wrapper}>
        <div className={LogoBox}>
            <Image
                src={img.src}
                alt={alt}
                width={width}
                height={
                    img.height && img.width
                        ? img.height * (width / img.width)
                        : undefined
                }
                blurDataURL={img.blurDataURL}
            />
        </div>
        <div className={InfoBox}>{children}</div>
    </div>
);

export default PlatformBanner;

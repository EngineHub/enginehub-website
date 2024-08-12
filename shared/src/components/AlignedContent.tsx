import Image from 'next/image';
import type { FC, PropsWithChildren } from 'react';

import {
    AlignedContentWrapper,
    ImageSide,
    InfoSide,
    LimitedVideo
} from './AlignedContent.module.css';
import { SectionHeading } from './text/SectionHeading.module.css';

interface AlignedContentProps {
    header?: string;
    align: 'left' | 'right';
    image?: string;
    video?: string;
}

export const AlignedContent: FC<PropsWithChildren<AlignedContentProps>> = ({
    header,
    align,
    image,
    video,
    children
}) => (
    <div className={`${AlignedContentWrapper} ${align}`}>
        <div className={InfoSide}>
            {header && <div className={SectionHeading}>{header}</div>}
            <div>{children}</div>
        </div>
        <div className={ImageSide}>
            {image && (
                <Image src={image} alt={header ?? 'aligned content image'} />
            )}
            {video && (
                <video
                    className={LimitedVideo}
                    src={video}
                    autoPlay={true}
                    muted={true}
                    loop={true}
                />
            )}
        </div>
    </div>
);

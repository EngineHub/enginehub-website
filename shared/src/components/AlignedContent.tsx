import Image from 'next/image';
import type { FC, PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import { SectionHeading } from './text/SectionHeading.module.css';

interface AlignedContentProps {
    header?: string;
    align: 'left' | 'right';
    image?: string;
    video?: string;
}

const AlignedContentWrapper = styled.div<{ align: 'left' | 'right' }>`
    display: flex;
    width: 100%;

    flex-direction: column;

    @media (min-width: 992px) {
        flex-direction: ${props =>
            props.align === 'left' ? 'row' : 'row-reverse'};
    }
`;

const InfoSide = styled.div`
    flex: 60%;
    margin: 0 1rem;
`;

const ImageSide = styled.div`
    flex: 40%;
    margin: 0 1rem;
`;

const LimitedVideo = styled.video`
    width: 100%;
    border-radius: 5px;
`;

export const AlignedContent: FC<PropsWithChildren<AlignedContentProps>> = ({
    header,
    align,
    image,
    video,
    children
}) => (
    <AlignedContentWrapper align={align}>
        <InfoSide>
            {header && <div className={SectionHeading}>{header}</div>}
            <div>{children}</div>
        </InfoSide>
        <ImageSide>
            {image && (
                <Image src={image} alt={header ?? 'aligned content image'} />
            )}
            {video && (
                <LimitedVideo
                    src={video}
                    autoPlay={true}
                    muted={true}
                    loop={true}
                />
            )}
        </ImageSide>
    </AlignedContentWrapper>
);

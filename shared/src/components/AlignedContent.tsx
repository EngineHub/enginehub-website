import React from 'react';
import styled from 'styled-components';
import { SectionHeading } from './text';

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

export const AlignedContent: React.FC<
    React.PropsWithChildren<AlignedContentProps>
> = ({ header, align, image, video, children }) => (
    <AlignedContentWrapper align={align}>
        <InfoSide>
            {header && <SectionHeading>{header}</SectionHeading>}
            <div>{children}</div>
        </InfoSide>
        <ImageSide>
            {image && <img src={image} />}
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

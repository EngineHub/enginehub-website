import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

const Wrapper = styled.div`
    border-top: 1px solid #ddd;
    padding: 8px;
    padding-top: 20px;
    padding-bottom: 20px;
    line-height: 1.7;
    display: flex;

    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const LogoBox = styled.div`
    vertical-align: top;
    display: flex;
    justify-content: center;
    flex: 25%;

    margin-bottom: 1rem;

    @media (min-width: 768px) {
        margin-bottom: 0;
    }
`;

const InfoBox = styled.div`
    flex: 75%;
    padding-left: 1rem;
`;

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
    <Wrapper>
        <LogoBox>
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
                layout="fixed"
            />
        </LogoBox>
        <InfoBox>{children}</InfoBox>
    </Wrapper>
);

export default PlatformBanner;

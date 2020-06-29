import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";
import Img, { FixedObject } from "gatsby-image";

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
    logo: FixedObject;
}

const PlatformBanner: FunctionComponent<PlatformBannerProps> = ({ children, logo, alt }) => (
    <Wrapper>
        <LogoBox>
            <Img fixed={logo} alt={alt} />
        </LogoBox>
        <InfoBox>
            {children}
        </InfoBox>
    </Wrapper>
)

export default PlatformBanner;

import { FunctionComponent } from "react";
import React from "react";
import styled from "@emotion/styled";
import Img, { FixedObject } from "gatsby-image";

const Wrapper = styled.div`
    border-top: 1px solid #ddd;
    padding: 8px;
    padding-top: 20px;
    padding-bottom: 20px;
    line-height: 1.7;
    display: flex;
`;

const LogoBox = styled.div`
    vertical-align: top;
    flex: 25%;
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
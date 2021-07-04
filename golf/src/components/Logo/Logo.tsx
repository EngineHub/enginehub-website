import React from 'react';
import styled from 'styled-components';
import { spin } from '../../animations/spin';

const ImageContainer = styled.div`
    position: relative;
    z-index: 0;
    display: inline-block;
`;

const WorldEditLogo = styled.img`
    width: 100px;
    height: 100px;
`;

const InnerImage = styled.img`
    position: absolute;
    z-index: 1;
    height: 40px;
    width: 40px;
    bottom: 0;
    right: 0;
    animation: 800ms ${spin} ease-in-out;
`;

export const Logo: React.FC = () => (
    <ImageContainer>
        <WorldEditLogo src="/static/worldedit-logo.svg" alt="World Edit Logo" />
        <InnerImage src="/static/golfball.svg" alt="Golf Ball" />
    </ImageContainer>
);

import React from 'react';
import styled from 'styled-components';
import { spin } from '@golf/animations/spin';

const ImageContainer = styled.div`
    position: relative;
    z-index: 0;
    display: inline-block;
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
        <img src="/static/WorldEdit.png" alt="World Edit Logo" />
        <InnerImage src="/static/golfball.svg" alt="Golf Ball" />
    </ImageContainer>
);

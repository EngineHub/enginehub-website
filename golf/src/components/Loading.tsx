import React from 'react';
import styled from 'styled-components';
import { spin } from '../animations/spin';

const Image = styled.img`
    max-width: 100px;
    width: 80vw;
    height: 80vw;
    animation: ${spin} 800ms cubic-bezier(0.3, 0, 0.38, 0.99) infinite;
    max-height: 100px;
`;

export const Loading = () => (
    <Image src="/static/golfball.svg" alt={'Loading spinner'} />
);

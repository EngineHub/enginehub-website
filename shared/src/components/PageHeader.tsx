import { ContainerPadded } from './Container';
import styled from 'styled-components';
import type { ExtraSponsorProps } from './Sponsors';
import { LabelledSponsorsArea } from './Sponsors';
import type { FC, PropsWithChildren } from 'react';

interface PageHeaderProps extends ExtraSponsorProps {
    text: string;
    icon?: string;
}

const HeaderWrapper = styled.div`
    border-bottom: 1px solid #eee;
    margin: 0 0 30px;
    padding: 20px;
    padding-top: 0;
`;

export const HeaderText = styled.h1`
    font-size: 36px;
    font-weight: 500;
    line-height: 1.8;
    color: rgb(51, 51, 51);
    margin: 0;
    padding: 0;
`;

const HeaderContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        'text text sponsors'
        'children children children';
    gap: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-areas:
            'text'
            'children'
            'sponsors';
        text-align: left;
        grid-gap: 1rem;
    }
`;

const HeaderChildrenContainer = styled.div`
    display: flex;
    align-items: center;
    grid-area: children;
`;

const HeaderTextArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-area: text;

    h1 {
        text-align: center;
    }
`;

const HeaderImg = styled.img`
    margin: 0;
    width: 100px;
    height: 100px;
`;

const SponsorSection = styled(LabelledSponsorsArea)`
    grid-area: sponsors;
`;

export const PageHeader: FC<PropsWithChildren<PageHeaderProps>> = ({
    text,
    icon,
    extraSponsors,
    children
}) => (
    <HeaderWrapper>
        <ContainerPadded>
            <HeaderContent>
                <HeaderTextArea>
                    {icon && <HeaderImg src={icon} />}
                    <HeaderText>{text}</HeaderText>
                </HeaderTextArea>
                <HeaderChildrenContainer>{children}</HeaderChildrenContainer>
                <SponsorSection extraSponsors={extraSponsors} />
            </HeaderContent>
        </ContainerPadded>
    </HeaderWrapper>
);

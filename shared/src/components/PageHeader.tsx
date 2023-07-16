import { styled } from 'styled-components';
import type { ExtraSponsorProps } from './Sponsors';
import { LabelledSponsorsArea } from './Sponsors';
import type { FC, PropsWithChildren } from 'react';
import { Container, ContainerPadded } from './Container.module.css';

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
    flex-direction: row;
    align-items: center;
    justify-content: left;
    gap: 1rem;
    grid-area: text;

    h1 {
        text-align: center;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        gap: 0.1rem;
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
        <div className={`${Container} ${ContainerPadded}`}>
            <HeaderContent>
                {icon ? (
                    <HeaderTextArea>
                        <HeaderImg src={icon} />
                        <HeaderText>{text}</HeaderText>
                    </HeaderTextArea>
                ) : (
                    <div>
                        <HeaderText>{text}</HeaderText>
                    </div>
                )}
                <HeaderChildrenContainer>{children}</HeaderChildrenContainer>
                <SponsorSection extraSponsors={extraSponsors} />
            </HeaderContent>
        </div>
    </HeaderWrapper>
);

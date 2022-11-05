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
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HeaderLeftArea = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
`;

const HeaderTextArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const HeaderImg = styled.img`
    margin: 0 20px 0 0;
    width: 100px;
    height: 100px;
`;

const RightAlignedSponsors = styled(LabelledSponsorsArea)`
    float: right;
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
                <HeaderLeftArea>
                    {icon && <HeaderImg src={icon} />}
                    <HeaderTextArea>
                        <HeaderText>{text}</HeaderText>
                        {children}
                    </HeaderTextArea>
                </HeaderLeftArea>
                <RightAlignedSponsors extraSponsors={extraSponsors} />
            </HeaderContent>
        </ContainerPadded>
    </HeaderWrapper>
);

import React from 'react';
import { ContainerPadded } from '@shared/components/container';
import styled from '@emotion/styled';
import RandomSponsor from '@shared/components/sponsors';

interface PageHeaderProps {
    text: string;
    icon?: string;
    showSponsors?: boolean;
}

const HeaderWrapper = styled.div`
    border-bottom: 1px solid #eee;
    margin: 0 0 30px;
    padding: 20px;
    padding-top: 0;
`;

const HeaderText = styled.h1`
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

const HeaderSponsorArea = styled.div`
    display: flex;
    align-items: center;
    float: right;

    small {
        margin-right: 0.5rem;
    }
`;

const HeaderImg = styled.img`
    margin: 0 20px 0 0;
    width: 100px;
    height: 100px;
`;

export const PageHeader: React.FC<PageHeaderProps> = ({
    text,
    showSponsors = false,
    icon,
    children
}) => {
    return (
        <HeaderWrapper>
            <ContainerPadded>
                <HeaderContent>
                    <HeaderLeftArea>
                        {icon && (
                            <HeaderImg src={icon} />
                        )}
                        <HeaderTextArea>
                            <HeaderText>{text}</HeaderText>
                            {children}
                        </HeaderTextArea>
                    </HeaderLeftArea>
                    {showSponsors && (
                        <HeaderSponsorArea>
                            <small>Sponsored by</small>
                            <RandomSponsor />
                        </HeaderSponsorArea>
                    )}
                </HeaderContent>
            </ContainerPadded>
        </HeaderWrapper>
    );
};

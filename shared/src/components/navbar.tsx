import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Container } from '@shared/components/container';
import css from '@emotion/css';
import { LinkProviderProps } from '@shared/utils/link-provider';
import { MainButtonStyle, PurpleButtonStyle } from '@shared/components/button';

interface NavbarProps {
    discordOverride?: string;
    inverted?: boolean;
}

const Nav = styled.nav<InvertedProps>`
    position: relative;
    min-height: 50px;
    margin: 0;
    background: ${props => (props.inverted ? `0` : `#f8f8f8`)};
    border: 0;
    border-radius: 0;
`;

type InvertedProps = {
    inverted: boolean;
};

const HeaderLinkStyle = (props: InvertedProps) => css`
    color: ${props.inverted ? `#fff` : `#777777`};
    font-size: 18px;
    line-height: 23px;
    text-decoration: none;
    padding: 13.5px 15px;
    height: 50px;
    float: left;
`;

const FloatedPurpleButton = () => css`
    ${PurpleButtonStyle()};
    float: right;

    display: none;

    @media (min-width: 410px) {
        display: block;
    }
`;

const FloatedGrayButton = () => css`
    ${MainButtonStyle()};
    float: right;

    display: none;

    @media (min-width: 410px) {
        display: block;
    }
`;

const Navbar: FunctionComponent<NavbarProps & LinkProviderProps> = ({
    inverted = false,
    discordOverride,
    linkProvider
}) => {
    const Link = linkProvider.getLinkComponent();
    const OutboundLink = linkProvider.getOutboundLinkComponent();
    const HeaderLink = styled(Link)<InvertedProps>(HeaderLinkStyle);
    const ButtonComp = inverted
        ? styled(OutboundLink)(FloatedPurpleButton)
        : styled(OutboundLink)(FloatedGrayButton);
    return (
        <Nav inverted={inverted}>
            <Container>
                <div>
                    <HeaderLink href="/" inverted={inverted}>
                        EngineHub.org
                    </HeaderLink>
                </div>
                <div>
                    <ButtonComp
                        href={
                            discordOverride
                                ? discordOverride
                                : 'https://discord.gg/enginehub'
                        }
                    >
                        Ask questions on our Discord
                    </ButtonComp>
                </div>
            </Container>
        </Nav>
    );
};

export default Navbar;

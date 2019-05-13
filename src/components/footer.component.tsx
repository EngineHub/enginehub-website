import { FunctionComponent } from 'react';
import React from 'react';
import { Container } from './container.component';
import styled from '@emotion/styled';
import { OutboundLink } from 'gatsby-plugin-gtag';

const ContainerFlex = styled(Container)`
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const FooterWrapper = styled.footer`
    justify-content: center;
    border-top: 1px solid #e7e7e7;
    padding: 20px 25px 40px;
    margin: 200px 0 0;
`;

const LinksBox = styled.div`
    width: 16.666%;
`;

const SocialBox = styled.div`
    width: 16.666%;
`;

const SponsorBox = styled.div`
    width: 25%;
`;

const SiteBox = styled.div`
    width: 33.333%;
`;

const SectionHeader = styled.h4`
    color: rgb(119, 119, 119);
    font-size: 18px;
    font-weight: 500;
    line-height: 32.4px;
`;

const Footer: FunctionComponent<{}> = () => {
    return (
        <FooterWrapper>
            <ContainerFlex>
                <LinksBox>
                    <SectionHeader>Resources</SectionHeader>
                    <ul>
                        <li>
                            <OutboundLink href="http://wiki.sk89q.com/wiki/Main_Page">
                                Wiki
                            </OutboundLink>
                        </li>
                        <li>
                            <OutboundLink href="http://dev.enginehub.org/youtrack/">
                                Issue Tracker
                            </OutboundLink>
                        </li>
                        <li>
                            <OutboundLink href="https://builds.enginehub.org">
                                Test Builds
                            </OutboundLink>
                        </li>
                    </ul>
                </LinksBox>
                <SocialBox>
                    <SectionHeader>Social</SectionHeader>
                    <ul>
                        <li>
                            <OutboundLink href="https://discord.gg/enginehub">
                                Discord
                            </OutboundLink>
                        </li>
                    </ul>
                </SocialBox>
                <SponsorBox>
                    <SectionHeader>Sponsors</SectionHeader>
                    TODO
                </SponsorBox>
                <SiteBox>
                    <SectionHeader>EngineHub.org</SectionHeader>
                    <p>
                        <small>
                            The content and trademarks presented are the
                            property of their respective owners. Please{' '}
                            <OutboundLink href="https://matthewmiller.dev/">
                                contact Me4502
                            </OutboundLink>{' '}
                            about website errors.
                        </small>
                    </p>
                </SiteBox>
            </ContainerFlex>
        </FooterWrapper>
    );
};

export default Footer;

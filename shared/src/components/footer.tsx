import React, { FunctionComponent, useMemo } from 'react';
import { Container } from '@shared/components/container';
import styled from '@emotion/styled';
import {
    LinkProviderContext,
    LinkProviderProps
} from '@shared/utils/link-provider';
import { MainLinkStyle } from '@shared/components/link';
import RandomSponsor, { ExtraSponsorProps } from './sponsors';

const ContainerFlex = styled(Container)`
    display: flex;
    flex-direction: column;
    margin-top: 30px;

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
    @media (min-width: 768px) {
        width: 16.666%;
    }
    width: 100%;
`;

const SocialBox = styled.div`
    @media (min-width: 768px) {
        width: 16.666%;
    }
    width: 100%;
`;

const SponsorBox = styled.div`
    @media (min-width: 768px) {
        width: 25%;
    }
    width: 100%;
`;

const SiteBox = styled.div`
    @media (min-width: 768px) {
        width: 33.333%;
    }
    width: 100%;
`;

const SectionHeader = styled.h4`
    color: rgb(119, 119, 119);
    font-size: 18px;
    font-weight: 500;
    line-height: 32.4px;
    margin-bottom: 8px;
`;

const FooterUl = styled.ul`
    padding-left: 0;
    list-style: none;
    margin-left: 0;
`;

const FooterLi = styled.li`
    line-height: 23.8px;
    font-size: 14px;
    margin-bottom: 0;
`;

interface FooterProps extends ExtraSponsorProps {
    mainSite: boolean;
}

const FooterImpl: React.FC<FooterProps & LinkProviderProps> = props => {
    const MainOutboundLink = useMemo(
        () =>
            styled(props.linkProvider.getOutboundLinkComponent())(
                MainLinkStyle
            ),
        []
    );

    let DocsLink = useMemo(() => {
        if (props.mainSite) {
            const MainLink = styled(props.linkProvider.getLinkComponent())(
                MainLinkStyle
            );
            return <MainLink href="/documentation/">Docs</MainLink>;
        } else {
            return (
                <MainOutboundLink href="https://enginehub.org/documentation/">
                    Docs
                </MainOutboundLink>
            );
        }
    }, []);
    return (
        <ContainerFlex>
            <LinksBox>
                <SectionHeader>Resources</SectionHeader>
                <FooterUl>
                    <FooterLi>{DocsLink}</FooterLi>
                    <FooterLi>
                        <MainOutboundLink href="http://dev.enginehub.org/youtrack/">
                            Issue Tracker
                        </MainOutboundLink>
                    </FooterLi>
                    <FooterLi>
                        <MainOutboundLink href="http://builds.enginehub.org">
                            Test Builds
                        </MainOutboundLink>
                    </FooterLi>
                </FooterUl>
            </LinksBox>
            <SocialBox>
                <SectionHeader>Social</SectionHeader>
                <FooterUl>
                    <FooterLi>
                        <MainOutboundLink href="https://discord.gg/enginehub">
                            Discord
                        </MainOutboundLink>
                    </FooterLi>
                </FooterUl>
            </SocialBox>
            <SponsorBox>
                <SectionHeader>Sponsors</SectionHeader>
                <RandomSponsor extraSponsors={props.extraSponsors} />
            </SponsorBox>
            <SiteBox>
                <SectionHeader>EngineHub.org</SectionHeader>
                <p>
                    <small>
                        The content and trademarks presented are the property of
                        their respective owners. Please{' '}
                        <MainOutboundLink href="https://matthewmiller.dev/contact/">
                            contact Me4502
                        </MainOutboundLink>{' '}
                        about website errors.
                    </small>
                </p>
            </SiteBox>
        </ContainerFlex>
    );
};

const Footer: FunctionComponent<FooterProps> = props => {
    return (
        <FooterWrapper>
            <LinkProviderContext.Consumer>
                {linkProvider => (
                    <FooterImpl {...props} linkProvider={linkProvider} />
                )}
            </LinkProviderContext.Consumer>
        </FooterWrapper>
    );
};

export default Footer;

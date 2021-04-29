import React, { useContext } from 'react';
import { Container } from '@shared/components/Container';
import styled from 'styled-components';
import { LinkProviderContext } from '@shared/utils/LinkProvider';
import { MainLinkStyle } from '@shared/components/Link';
import RandomSponsor, { ExtraSponsorProps } from './Sponsors';

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
    margin-bottom: 0.75rem;
`;

const MainLink = styled.a`
    ${MainLinkStyle()}
`;

interface FooterProps extends ExtraSponsorProps {
    mainSite: boolean;
}

const Footer: React.FC<FooterProps> = ({ extraSponsors }) => {
    const Link = useContext(LinkProviderContext);

    return (
        <FooterWrapper>
            <ContainerFlex>
                <LinksBox>
                    <SectionHeader>Resources</SectionHeader>
                    <FooterUl>
                        <FooterLi>
                            <MainLink
                                href="https://enginehub.org/documentation/"
                                as={Link}
                            >
                                Docs
                            </MainLink>
                        </FooterLi>
                        <FooterLi>
                            <MainLink
                                href="https://builds.enginehub.org/"
                                as={Link}
                            >
                                Test Builds
                            </MainLink>
                        </FooterLi>
                        <FooterLi>
                            <MainLink
                                href="https://paste.enginehub.org/"
                                as={Link}
                            >
                                Paste Service
                            </MainLink>
                        </FooterLi>
                    </FooterUl>
                </LinksBox>
                <SocialBox>
                    <SectionHeader>Social</SectionHeader>
                    <FooterUl>
                        <FooterLi>
                            <MainLink
                                href="https://discord.gg/enginehub"
                                as={Link}
                            >
                                Discord
                            </MainLink>
                        </FooterLi>
                        <FooterLi>
                            <MainLink
                                href="https://github.com/EngineHub"
                                as={Link}
                            >
                                GitHub
                            </MainLink>
                        </FooterLi>
                        <FooterLi>
                            <MainLink
                                href="https://github.com/sponsors/EngineHub"
                                as={Link}
                            >
                                Support Us
                            </MainLink>
                        </FooterLi>
                    </FooterUl>
                </SocialBox>
                <SponsorBox>
                    <SectionHeader>Sponsors</SectionHeader>
                    <RandomSponsor extraSponsors={extraSponsors} />
                </SponsorBox>
                <SiteBox>
                    <SectionHeader>EngineHub</SectionHeader>
                    <p>
                        <small>
                            The content and trademarks presented are the
                            property of their respective owners. Please{' '}
                            <MainLink
                                href="https://madelinemiller.dev/contact/"
                                as={Link}
                            >
                                contact Me4502
                            </MainLink>{' '}
                            about website errors.
                        </small>
                    </p>
                </SiteBox>
            </ContainerFlex>
        </FooterWrapper>
    );
};

export default Footer;

import { Container } from './Container';
import { styled } from 'styled-components';
import { MainLink } from './Link';
import type { ExtraSponsorProps } from './Sponsors';
import { RandomSponsor } from './Sponsors';
import type { FC } from 'react';

const FooterContainer = styled(Container)`
    display: grid;
    margin-top: 30px;

    grid-template-columns: 1fr 1fr 1.5fr 2fr;
    grid-gap: 0.5rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        text-align: left;
        grid-gap: 1rem;
    }
`;

const FooterWrapper = styled.footer`
    justify-content: center;
    border-top: 1px solid #e7e7e7;
    padding: 20px 25px 40px;
    margin: 200px 0 0;
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

export const Footer: FC<ExtraSponsorProps> = ({ extraSponsors }) => {
    return (
        <FooterWrapper>
            <FooterContainer>
                <div>
                    <SectionHeader>Resources</SectionHeader>
                    <FooterUl>
                        <FooterLi>
                            <MainLink href="https://enginehub.org/documentation/">
                                Docs
                            </MainLink>
                        </FooterLi>
                        <FooterLi>
                            <MainLink href="https://builds.enginehub.org/">
                                Test Builds
                            </MainLink>
                        </FooterLi>
                        <FooterLi>
                            <MainLink href="https://paste.enginehub.org/">
                                Paste Service
                            </MainLink>
                        </FooterLi>
                    </FooterUl>
                </div>
                <div>
                    <SectionHeader>Social</SectionHeader>
                    <FooterUl>
                        <FooterLi>
                            <MainLink href="https://discord.gg/enginehub">
                                Discord
                            </MainLink>
                        </FooterLi>
                        <FooterLi>
                            <MainLink href="https://github.com/EngineHub">
                                GitHub
                            </MainLink>
                        </FooterLi>
                        <FooterLi>
                            <MainLink href="https://github.com/sponsors/EngineHub">
                                Support Us
                            </MainLink>
                        </FooterLi>
                    </FooterUl>
                </div>
                <div>
                    <SectionHeader>Sponsors</SectionHeader>
                    <RandomSponsor extraSponsors={extraSponsors} />
                </div>
                <div>
                    <SectionHeader>EngineHub</SectionHeader>
                    <p>
                        <small>
                            The content and trademarks presented are the
                            property of their respective owners. This website is
                            maintained by{' '}
                            <MainLink href="https://madelinemiller.dev/">
                                Me4502
                            </MainLink>{' '}
                            For website errors,{' '}
                            <MainLink href="https://github.com/EngineHub/EngineHub-Website">
                                create a ticket here.
                            </MainLink>
                        </small>
                    </p>
                </div>
            </FooterContainer>
        </FooterWrapper>
    );
};

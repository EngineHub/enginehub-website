import { Container } from './Container.module.css';
import { MainLink } from './Link';
import type { ExtraSponsorProps } from './Sponsors';
import { RandomSponsor } from './Sponsors';
import type { FC } from 'react';
import {
    FooterContainer,
    FooterLi,
    FooterUl,
    FooterWrapper,
    SectionHeader
} from './Footer.module.css';

export const Footer: FC<ExtraSponsorProps> = ({ extraSponsors }) => {
    return (
        <footer className={FooterWrapper}>
            <div className={`${Container} ${FooterContainer}`}>
                <div>
                    <h4 className={SectionHeader}>Resources</h4>
                    <ul className={FooterUl}>
                        <li className={FooterLi}>
                            <MainLink href="https://enginehub.org/documentation/">
                                Docs
                            </MainLink>
                        </li>
                        <li className={FooterLi}>
                            <MainLink href="https://builds.enginehub.org/">
                                Test Builds
                            </MainLink>
                        </li>
                        <li className={FooterLi}>
                            <MainLink href="https://paste.enginehub.org/">
                                Paste Service
                            </MainLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className={SectionHeader}>Social</h4>
                    <ul className={FooterUl}>
                        <li className={FooterLi}>
                            <MainLink href="https://discord.gg/enginehub">
                                Discord
                            </MainLink>
                        </li>
                        <li className={FooterLi}>
                            <MainLink href="https://github.com/EngineHub">
                                GitHub
                            </MainLink>
                        </li>
                        <li className={FooterLi}>
                            <MainLink href="https://github.com/sponsors/EngineHub">
                                Support Us
                            </MainLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className={SectionHeader}>Sponsors</h4>
                    <RandomSponsor extraSponsors={extraSponsors} />
                </div>
                <div>
                    <h4 className={SectionHeader}>EngineHub</h4>
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
            </div>
        </footer>
    );
};

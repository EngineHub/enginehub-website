import Link from 'next/link';
import type { FC } from 'react';

import { Container } from './Container.module.css';
import {
    FooterContainer,
    FooterLi,
    FooterUl,
    FooterWrapper,
    SectionHeader
} from './Footer.module.css';
import { MainLink } from './Link.module.css';
import type { ExtraSponsorProps } from './Sponsors';
import { RandomSponsor } from './Sponsors';

export type SiteType = 'main' | 'builds' | 'paste' | undefined;

function trimUrlByType(url: string, siteType?: SiteType) {
    if (!siteType) {
        return url;
    }
    switch (siteType) {
        case 'main':
            return url.replace('https://enginehub.org', '');
        case 'builds':
            return url.replace('https://builds.enginehub.org', '');
        case 'paste':
            return url.replace('https://paste.enginehub.org', '');
        default:
            return url;
    }
}

export const Footer: FC<ExtraSponsorProps & { siteType?: SiteType }> = ({
    extraSponsors,
    siteType
}) => {
    return (
        <footer className={FooterWrapper}>
            <div className={`${Container} ${FooterContainer}`}>
                <div>
                    <h4 className={SectionHeader}>Resources</h4>
                    <ul className={FooterUl}>
                        <li className={FooterLi}>
                            <Link
                                className={MainLink}
                                href={trimUrlByType(
                                    'https://enginehub.org/documentation/',
                                    siteType
                                )}
                            >
                                Docs
                            </Link>
                        </li>
                        <li className={FooterLi}>
                            <Link
                                className={MainLink}
                                href={trimUrlByType(
                                    'https://enginehub.org/contributing/',
                                    siteType
                                )}
                            >
                                Contributing Guidelines
                            </Link>
                        </li>
                        <li className={FooterLi}>
                            <Link
                                className={MainLink}
                                href={trimUrlByType(
                                    'https://builds.enginehub.org/',
                                    siteType
                                )}
                            >
                                Test Builds
                            </Link>
                        </li>
                        <li className={FooterLi}>
                            <Link
                                className={MainLink}
                                href={trimUrlByType(
                                    'https://paste.enginehub.org/',
                                    siteType
                                )}
                            >
                                Paste Service
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className={SectionHeader}>Social</h4>
                    <ul className={FooterUl}>
                        <li className={FooterLi}>
                            <Link
                                className={MainLink}
                                href="https://discord.gg/enginehub"
                            >
                                Discord
                            </Link>
                        </li>
                        <li className={FooterLi}>
                            <Link
                                className={MainLink}
                                href="https://github.com/EngineHub"
                            >
                                GitHub
                            </Link>
                        </li>
                        <li className={FooterLi}>
                            <Link
                                className={MainLink}
                                href="https://github.com/sponsors/EngineHub"
                            >
                                Support Us
                            </Link>
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
                            <Link
                                className={MainLink}
                                href="https://madelinemiller.dev/"
                            >
                                Me4502
                            </Link>{' '}
                            For website errors,{' '}
                            <Link
                                className={MainLink}
                                href="https://github.com/EngineHub/EngineHub-Website"
                            >
                                create a ticket here.
                            </Link>
                        </small>
                    </p>
                </div>
            </div>
        </footer>
    );
};

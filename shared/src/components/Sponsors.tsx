import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { MainLinkStyle } from './Link';
import { LinkProviderContext } from '@shared/utils/LinkProvider';

const sponsors: string[] = ['apexhosting', 'gh-sponsors'];

export interface ExtraSponsorProps {
    extraSponsors?: string[];
}

const NarrowDiv = styled.div`
    max-width: 200px;
    min-height: 70px;
    max-height: 70px;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MainLink = styled.a`
    ${MainLinkStyle()}
`;

const RandomSponsor: React.FC<ExtraSponsorProps> = ({ extraSponsors = [] }) => {
    const Link = useContext(LinkProviderContext);

    const NetlifySponsor: React.FC = () => (
        <Link href="https://www.netlify.com">
            <img
                src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"
                alt="Netlify"
            />
        </Link>
    );

    const BeastNodeSponsor: React.FC = () => {
        const img = require('../images/beastnode.png');
        return (
            <Link href="https://www.beastnode.com">
                <img src={img} style={{ marginBottom: 0 }} alt="BeastNode" />
            </Link>
        );
    };

    const ApexHostingSponsor: React.FC = () => {
        return (
            <Link href="https://billing.apexminecrafthosting.com/aff.php?aff=3108">
                <img
                    src={'https://enginehub.org/images/apex.svg'}
                    style={{
                        marginBottom: 0,
                        color: '#000000',
                        width: '100%'
                    }}
                    alt="Apex Hosting"
                />
            </Link>
        );
    };

    const GitHubSponsorsSponsor: React.FC = () => {
        return (
            <MainLink href="https://github.com/sponsors/EngineHub" as={Link}>
                <iframe
                    src="https://github.com/sponsors/EngineHub/button"
                    title="Sponsor EngineHub"
                    height="35"
                    width="116"
                    style={{ border: 0, marginBottom: 0 }}
                />
                <p>Sponsored by users like you!</p>
            </MainLink>
        );
    };

    const EmptySponsor: React.FC = () => {
        return (
            <MainLink href="https://matthewmiller.dev/contact/" as={Link}>
                Interested? Contact Me4502
            </MainLink>
        );
    };

    const sponsorMap = new Map([
        ['empty', EmptySponsor],
        ['netlify', NetlifySponsor],
        ['beastnode', BeastNodeSponsor],
        ['apexhosting', ApexHostingSponsor],
        ['gh-sponsors', GitHubSponsorsSponsor]
    ]);

    const availableSponsors = sponsors.concat(extraSponsors);
    if (availableSponsors.length < 3) {
        availableSponsors.push('empty');
    }

    const [sponsorIndex, setSponsorIndex] = useState(
        Math.floor(
            Math.random() *
                availableSponsors.filter(sp => sp !== 'empty').length
        )
    );

    useEffect(() => {
        const timeoutTime =
            availableSponsors[sponsorIndex] === 'empty' ? 5000 : 10000;
        const timeout = setTimeout(() => {
            setSponsorIndex((sponsorIndex + 1) % availableSponsors.length);
        }, timeoutTime);
        return () => clearTimeout(timeout);
    }, [sponsorIndex]);

    return (
        <NarrowDiv>
            {availableSponsors.map((spon, i) => {
                const Component = sponsorMap.get(spon)!;
                return (
                    <div key={`sponsor-${spon}`} hidden={sponsorIndex !== i}>
                        <Component />
                    </div>
                );
            })}
        </NarrowDiv>
    );
};

const HorizontalSponsorArea = styled.div`
    display: flex;
    align-items: center;

    small {
        margin-right: 0.5rem;
    }
`;

export const LabelledSponsorsArea: React.FC<ExtraSponsorProps> = ({
    extraSponsors,
    ...rest
}) => (
    <HorizontalSponsorArea {...rest}>
        <small>Sponsored by</small>
        <RandomSponsor extraSponsors={extraSponsors} />
    </HorizontalSponsorArea>
);

export default RandomSponsor;

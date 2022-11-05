import type { FC } from 'react';
import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { MainLinkStyle, MainLink } from './Link';

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

const FlexLink = styled.a`
    ${MainLinkStyle()}
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const useSponsorComponents = () => {
    return useMemo(
        () => [
            () => (
                <a href="https://billing.apexminecrafthosting.com/aff.php?aff=3108">
                    <img
                        src={'https://enginehub.org/images/apex.svg'}
                        style={{
                            marginBottom: 0,
                            color: '#000000',
                            width: '100%'
                        }}
                        alt="Apex Hosting"
                    />
                </a>
            ),
            () => (
                <FlexLink href="https://github.com/sponsors/EngineHub">
                    <iframe
                        src="https://github.com/sponsors/EngineHub/button"
                        title="Sponsor EngineHub"
                        height="35"
                        width="116"
                        style={{ border: 0, marginBottom: 0 }}
                    />
                    <p style={{ margin: 0 }}>Sponsored by users like you!</p>
                </FlexLink>
            ),
            () => (
                <MainLink href="https://madelinemiller.dev/contact/">
                    Interested? Contact Me4502
                </MainLink>
            )
        ],
        []
    );
};

export const RandomSponsor: FC<ExtraSponsorProps> = ({
    extraSponsors = []
}) => {
    const [ApexHostingSponsor, GitHubSponsorsSponsor, EmptySponsor] =
        useSponsorComponents();

    const sponsorMap = new Map([
        ['empty', EmptySponsor],
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
    }, [sponsorIndex, availableSponsors]);

    return (
        <NarrowDiv>
            {availableSponsors.map((spon, i) => {
                const Component = sponsorMap.get(spon) ?? EmptySponsor;

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

export const LabelledSponsorsArea: FC<ExtraSponsorProps> = ({
    extraSponsors,
    ...rest
}) => (
    <HorizontalSponsorArea {...rest}>
        <small>Sponsored by</small>
        <RandomSponsor extraSponsors={extraSponsors} />
    </HorizontalSponsorArea>
);

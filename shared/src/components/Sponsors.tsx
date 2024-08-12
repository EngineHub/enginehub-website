import Link from 'next/link';
import type { FC, HTMLAttributes } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { MainLink } from './Link.module.css';
import {
    FlexLink,
    HorizontalSponsorArea,
    NarrowDiv
} from './Sponsors.module.css';

const sponsors: string[] = ['apexhosting', 'gh-sponsors'];

export interface ExtraSponsorProps {
    extraSponsors?: string[];
}

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
                <a
                    className={`${MainLink} ${FlexLink}`}
                    href="https://github.com/sponsors/EngineHub"
                >
                    <iframe
                        src="https://github.com/sponsors/EngineHub/button"
                        title="Sponsor EngineHub"
                        height="35"
                        width="116"
                        style={{ border: 0, marginBottom: 0 }}
                    />
                    <p style={{ margin: 0 }}>Sponsored by people like you!</p>
                </a>
            ),
            () => (
                <Link
                    className={MainLink}
                    href="https://madelinemiller.dev/contact/"
                >
                    Interested? Contact Me4502
                </Link>
            )
        ],
        []
    );
};

const DEFAULT_EXTRA_SPONSORS: ExtraSponsorProps['extraSponsors'] = [];

export const RandomSponsor: FC<ExtraSponsorProps> = ({
    extraSponsors = DEFAULT_EXTRA_SPONSORS
}) => {
    const [ApexHostingSponsor, GitHubSponsorsSponsor, EmptySponsor] =
        useSponsorComponents();

    const sponsorMap = new Map([
        ['empty', EmptySponsor],
        ['apexhosting', ApexHostingSponsor],
        ['gh-sponsors', GitHubSponsorsSponsor]
    ]);

    const availableSponsors = [...sponsors, ...extraSponsors];
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
            availableSponsors[sponsorIndex] === 'empty' ? 5000 : 10_000;
        const timeout = setTimeout(() => {
            setSponsorIndex((sponsorIndex + 1) % availableSponsors.length);
        }, timeoutTime);
        return () => clearTimeout(timeout);
    }, [sponsorIndex, availableSponsors]);

    return (
        <div className={NarrowDiv}>
            {availableSponsors.map((spon, i) => {
                const Component = sponsorMap.get(spon) ?? EmptySponsor;

                return (
                    <div key={`sponsor-${spon}`} hidden={sponsorIndex !== i}>
                        <Component />
                    </div>
                );
            })}
        </div>
    );
};

export const LabelledSponsorsArea: FC<
    ExtraSponsorProps & HTMLAttributes<HTMLDivElement>
> = ({ extraSponsors, className }) => (
    <div className={`${HorizontalSponsorArea} ${className ?? ''}`}>
        <small>Sponsor </small>
        <RandomSponsor extraSponsors={extraSponsors} />
    </div>
);

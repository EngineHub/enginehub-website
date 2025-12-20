import Link from 'next/link';
import type { FC, HTMLAttributes } from 'react';
import { Activity, useEffect, useMemo, useState } from 'react';

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

    const availableSponsors = useMemo(() => {
        const sponsorsList = [...sponsors, ...extraSponsors];

        if (sponsorsList.length < 3) {
            sponsorsList.push('empty');
        }

        return sponsorsList;
    }, [extraSponsors]);

    const [sponsorIndex, setSponsorIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSponsorIndex(
                currentSponsorIndex =>
                    (currentSponsorIndex + 1) % availableSponsors.length
            );
        }, 10_000);
        return () => clearInterval(interval);
    }, [availableSponsors]);

    return (
        <div className={NarrowDiv}>
            {availableSponsors.map((spon, i) => {
                const Component = sponsorMap.get(spon) ?? EmptySponsor;

                return (
                    <Activity
                        key={`sponsor-${spon}`}
                        mode={sponsorIndex === i ? 'visible' : 'hidden'}
                    >
                        <Component />
                    </Activity>
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

import React, { useMemo, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { MainLinkStyle } from './link';
import {
    LinkProviderContext,
    LinkProviderProps
} from '@shared/utils/link-provider';

const sponsors: string[] = [];

export interface ExtraSponsorProps {
    extraSponsors?: string[];
}

const NarrowDiv = styled.div`
    max-width: 200px;
`;

const SponsorImpl: React.FC<ExtraSponsorProps & LinkProviderProps> = ({
    extraSponsors = [],
    linkProvider
}) => {
    const OutboundLink = useMemo(
        () => linkProvider.getOutboundLinkComponent(),
        []
    );

    const NetlifySponsor: React.FC = () => (
        <OutboundLink href="https://www.netlify.com">
            <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" />
        </OutboundLink>
    );

    const BeastNodeSponsor: React.FC = () => {
        const img = require('../images/beastnode.png');
        return (
            <OutboundLink href="https://www.beastnode.com">
                <img src={img} />
            </OutboundLink>
        );
    };

    const EmptySponsor: React.FC = () => {
        const MainOutboundLink = useMemo(
            () => styled(OutboundLink)(MainLinkStyle),
            []
        );
        return (
            <MainOutboundLink href="https://matthewmiller.dev/contact/">
                Interested? Contact Me4502
            </MainOutboundLink>
        );
    };

    const sponsorMap = new Map([
        ['empty', EmptySponsor],
        ['netlify', NetlifySponsor],
        ['beastnode', BeastNodeSponsor]
    ]);

    const availableSponsors = sponsors.concat(extraSponsors);
    if (availableSponsors.length < 3) {
        availableSponsors.push('empty');
    }

    const [sponsorIndex, setSponsorIndex] = useState(
        Math.floor(Math.random() * availableSponsors.length)
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSponsorIndex((sponsorIndex + 1) % availableSponsors.length);
        }, 5000);
        return () => clearTimeout(timeout);
    }, [sponsorIndex]);

    const SponsorComponent = sponsorMap.get(availableSponsors[sponsorIndex])!;
    return (
        <NarrowDiv>
            <SponsorComponent />
        </NarrowDiv>
    );
};

const RandomSponsor: React.FC<ExtraSponsorProps> = props => (
    <LinkProviderContext.Consumer>
        {linkProvider => <SponsorImpl linkProvider={linkProvider} {...props} />}
    </LinkProviderContext.Consumer>
);

const HorizontalSponsorArea = styled.div`
    display: flex;
    align-items: center;

    small {
        margin-right: 0.5rem;
    }
`;

export const LabelledSponsorsArea: React.FC<ExtraSponsorProps> = props => (
    <HorizontalSponsorArea>
        <small>Sponsored by</small>
        <RandomSponsor extraSponsors={props.extraSponsors} />
    </HorizontalSponsorArea>
);

export default RandomSponsor;

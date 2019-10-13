import React, { useMemo, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { MainLinkStyle } from './Link';
import {
    LinkProviderContext,
    LinkProviderProps
} from '@shared/utils/LinkProvider';

const sponsors: string[] = ['mcprohosting'];

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

const SponsorImpl: React.FC<ExtraSponsorProps & LinkProviderProps> = ({
    extraSponsors = [],
    linkProvider
}) => {
    const Link = useMemo(() => linkProvider.getLinkComponent(), []);

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

    const MCProHostingSponsor: React.FC = () => {
        const img = require('../images/mcprohosting.svg');
        return (
            <>
                <Link href="https://mcph.info/enginehub">
                    <img
                        src={img}
                        style={{ marginBottom: 0 }}
                        alt="MCProHosting"
                    />
                </Link>
                <p style={{ textAlign: 'center', lineHeight: '4px' }}>
                    25% OFF! Code: <code>enginehub</code>
                </p>
            </>
        );
    };

    const EmptySponsor: React.FC = () => {
        const MainOutboundLink = useMemo(() => styled(Link)(MainLinkStyle), []);
        return (
            <MainOutboundLink href="https://matthewmiller.dev/contact/">
                Interested? Contact Me4502
            </MainOutboundLink>
        );
    };

    const sponsorMap = new Map([
        ['empty', EmptySponsor],
        ['netlify', NetlifySponsor],
        ['beastnode', BeastNodeSponsor],
        ['mcprohosting', MCProHostingSponsor]
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

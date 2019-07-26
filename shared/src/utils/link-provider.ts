import { FunctionComponent } from 'react';

export interface WrapperLinkProps {
    href: string;
}

export type WrapperLink = FunctionComponent<WrapperLinkProps>;

export interface LinkProvider {
    getLinkComponent(): WrapperLink;

    getOutboundLinkComponent(): WrapperLink;
}

export interface LinkProviderProps {
    linkProvider: LinkProvider;
}

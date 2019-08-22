import React, { FunctionComponent } from 'react';

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

class AnchorLinkProvider implements LinkProvider {
    getLinkComponent(): WrapperLink {
        return ({ href, children, ...props }) => (
            <a href={href} {...props}>
                {children}
            </a>
        );
    }

    getOutboundLinkComponent(): WrapperLink {
        return ({ href, children, ...props }) => (
            <a href={href} {...props}>
                {children}
            </a>
        );
    }
}

export const LinkProviderContext = React.createContext<LinkProvider>(
    new AnchorLinkProvider()
);

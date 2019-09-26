import React, { FunctionComponent } from 'react';

export interface WrapperLinkProps {
    href: string;
    as?: string;
}

export type WrapperLink = FunctionComponent<WrapperLinkProps>;

export interface LinkProvider {
    getLinkComponent(): WrapperLink;
}

export interface LinkProviderProps {
    linkProvider: LinkProvider;
}

export class AnchorLinkProvider implements LinkProvider {
    getLinkComponent(): WrapperLink {
        return ({ href, children, as: _as, ...props }) => (
            <a href={href} {...props}>
                {children}
            </a>
        );
    }
}

export const LinkProviderContext = React.createContext<LinkProvider>(
    new AnchorLinkProvider()
);

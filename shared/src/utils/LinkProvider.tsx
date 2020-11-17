import React, { FunctionComponent } from 'react';

export interface WrapperLinkProps {
    href: string;
}

export type WrapperLink = FunctionComponent<WrapperLinkProps>;

export type LinkProvider = React.FC<WrapperLinkProps>;

export interface LinkProviderProps {
    linkProvider: LinkProvider;
}

export const LinkProviderContext = React.createContext<LinkProvider>(
    ({ href, children, ...props }) => (
        <a href={href} {...props}>
            {children}
        </a>
    )
);

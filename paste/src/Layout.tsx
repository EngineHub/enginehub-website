import type { FC, PropsWithChildren } from 'react';

import { Header } from './Header';
import { Main, MainContainer } from './Layout.module.css';

interface LayoutProps {
    showHelp?: boolean;
    saveCallback?: () => void;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
    children,
    showHelp = true,
    saveCallback
}) => (
    <div className={MainContainer}>
        <Header showHelp={showHelp} saveCallback={saveCallback} />
        <main className={Main}>{children}</main>
    </div>
);

import type { ExtraSponsorProps } from './Sponsors';
import { LabelledSponsorsArea } from './Sponsors';
import type { FC, PropsWithChildren } from 'react';
import { Container, ContainerPadded } from './Container.module.css';
import {
    HeaderWrapper,
    HeaderText,
    HeaderContent,
    HeaderChildrenContainer,
    HeaderTextArea,
    HeaderImg
} from './PageHeader.module.css';

interface PageHeaderProps extends ExtraSponsorProps {
    text: string;
    icon?: string;
}

export const PageHeader: FC<PropsWithChildren<PageHeaderProps>> = ({
    text,
    icon,
    extraSponsors,
    children
}) => (
    <div className={HeaderWrapper}>
        <div className={`${Container} ${ContainerPadded}`}>
            <div className={HeaderContent}>
                {icon ? (
                    <div className={HeaderTextArea}>
                        <img className={HeaderImg} src={icon} alt={text} />
                        <h1 className={HeaderText}>{text}</h1>
                    </div>
                ) : (
                    <div>
                        <h1 className={HeaderText}>{text}</h1>
                    </div>
                )}
                <div className={HeaderChildrenContainer}>{children}</div>
                <LabelledSponsorsArea
                    style={{ gridArea: 'sponsors' }}
                    extraSponsors={extraSponsors}
                />
            </div>
        </div>
    </div>
);

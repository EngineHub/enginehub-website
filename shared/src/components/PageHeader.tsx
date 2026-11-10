import Image from 'next/image';
import type { FC, PropsWithChildren } from 'react';

import { Container, ContainerPadded } from './Container.module.css';
import {
    HeaderChildrenContainer,
    HeaderContent,
    HeaderImg,
    HeaderText,
    HeaderTextArea,
    HeaderWrapper
} from './PageHeader.module.css';
import type { ExtraSponsorProps } from './Sponsors';
import { LabelledSponsorsArea } from './Sponsors';

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
                        <Image
                            className={HeaderImg}
                            src={icon}
                            width={100}
                            height={100}
                            alt={text}
                        />
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

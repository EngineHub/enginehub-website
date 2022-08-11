import { FunctionComponent } from 'react';
import React from 'react';
import Image from 'next/image';
interface SidebarIconProps {
    alt: string;
    src: string;
}

const SidebarIcon: FunctionComponent<SidebarIconProps> = props => {
    return (
        <div>
            <Image
                src={props.src}
                alt={props.alt}
                loading={'eager'}
                width={100}
                height={100}
            />
        </div>
    );
};

export default SidebarIcon;

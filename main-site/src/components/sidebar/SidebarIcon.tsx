import Image from 'next/image';
import type { FunctionComponent } from 'react';
interface SidebarIconProps {
    alt: string;
    src: string;
}

const SidebarIcon: FunctionComponent<SidebarIconProps> = ({ src, alt }) => {
    return (
        <div>
            <Image
                src={src}
                alt={alt}
                loading={'eager'}
                width={100}
                height={100}
            />
        </div>
    );
};

export default SidebarIcon;

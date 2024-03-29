import type { FunctionComponent } from 'react';
import Image from 'next/image';
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

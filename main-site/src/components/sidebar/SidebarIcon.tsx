import { FunctionComponent } from 'react';
import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface SidebarIconProps {
    alt: string;
    image: IGatsbyImageData;
}

const SidebarIcon: FunctionComponent<SidebarIconProps> = props => {
    return (
        <div>
            <GatsbyImage
                image={props.image}
                alt={props.alt}
                loading={'eager'}
            />
        </div>
    );
};

export default SidebarIcon;

import { FunctionComponent } from "react";
import { FixedObject } from "gatsby-image";
import React from "react";
import Img from "gatsby-image";

interface SidebarIconProps {
    alt?: string;
    image: FixedObject;
}

const SidebarIcon: FunctionComponent<SidebarIconProps> = (props) => {
    return (
        <div>
            <Img fixed={props.image} alt={props.alt} />
        </div>
    )
};

export default SidebarIcon;

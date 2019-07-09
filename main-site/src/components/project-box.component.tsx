import Img, { FixedObject } from "gatsby-image";
import styled from "@emotion/styled";
import { Link } from "@reach/router";
import React, { FunctionComponent } from "react";

interface ProjectBoxProps {
    description: string;
    icon: FixedObject;
    name: string;
    slug: string;
}

const ProjectListItem = styled.li`
    padding: 0 0 30px;
    clear: both;
    font-size: 14px;
    line-height: 1.7;
`;

const ProjectListImg = styled(Img)`
    margin: 0 12px 12px 0;
    height: 80px;
    float: left;
    vertical-align: middle;
    border: 0;
`;

const ProjectListLink = styled(Link)`
    display: inline;
    font-size: 21px;
    padding: 5px 0;
    color: #0059d1;
    text-decoration: none;
`;

const ProjectBox: FunctionComponent<ProjectBoxProps> = props => (
    <ProjectListItem>
        <ProjectListImg fixed={props.icon} />
        <ProjectListLink to={`/${props.slug}/`}>{props.name}</ProjectListLink>
        <br />
        {props.description}
    </ProjectListItem>
);

export default ProjectBox;
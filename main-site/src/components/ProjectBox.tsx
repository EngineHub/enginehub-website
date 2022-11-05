import styled from 'styled-components';
import React, { FunctionComponent } from 'react';
import { MainLinkStyle } from '@enginehub/shared';
import Link from 'next/link';

interface ProjectBoxProps {
    description: string;
    icon: string;
    name: string;
    slug: string;
}

const ProjectListItem = styled.li`
    padding: 0 0 30px;
    clear: both;
    font-size: 14px;
    line-height: 1.7;
`;

const ProjectListImg = styled.img`
    margin: 0 12px 12px 0;
    height: 80px;
    float: left;
    vertical-align: middle;
    border: 0;
`;

const ProjectListLink = styled.a`
    ${MainLinkStyle}
    display: inline;
    font-size: 21px;
    padding: 5px 0;
`;

const ProjectBox: FunctionComponent<ProjectBoxProps> = props => (
    <ProjectListItem>
        <ProjectListImg src={props.icon?.['src'] ?? props.icon} />
        <Link href={`/${props.slug}/`} passHref={true} legacyBehavior={true}>
            <ProjectListLink>{props.name}</ProjectListLink>
        </Link>
        <br />
        {props.description}
    </ProjectListItem>
);

export default ProjectBox;

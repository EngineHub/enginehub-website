import type { FunctionComponent } from 'react';
import { MainLink } from '@enginehub/shared';
import Link from 'next/link';
import {
    ProjectListItem,
    ProjectListImg,
    ProjectListLink
} from './ProjectBox.module.css';

interface ProjectBoxProps {
    description: string;
    icon: string | { src: string };
    name: string;
    slug: string;
}

const ProjectBox: FunctionComponent<ProjectBoxProps> = props => (
    <li className={ProjectListItem}>
        <img
            className={ProjectListImg}
            alt={props.name}
            src={typeof props.icon === 'object' ? props.icon.src : props.icon}
        />
        <Link
            className={`${MainLink} ${ProjectListLink}`}
            href={`/${props.slug}/`}
        >
            {props.name}
        </Link>
        <br />
        {props.description}
    </li>
);

export default ProjectBox;

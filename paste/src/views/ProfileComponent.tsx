import type { FC } from 'react';
import { memo } from 'react';
import { useState } from 'react';
import type { PasteProps } from 'paste/pages/[id]';
import { styled } from 'styled-components';
import {
    ProfileNodeBox,
    PercentText,
    TimeText,
    Bar,
    BarInner
} from './ProfileComponent.module.css';

const CloseIcon = require('./images/close.png') as string;
const OpenIcon = require('./images/open.png') as string;

interface ProfileEntry {
    name: string;
    selfTime: number;
    children: ProfileEntry[];
    parent: ProfileEntry | RootEntry;
}

interface RootEntry {
    children: ProfileEntry[];
}

const INVALID_PROFILE = {
    name: 'Invalid Profile',
    selfTime: 60000,
    children: [],
    parent: { children: [] }
};

const ProfileNodeText = styled.div<{ open: boolean }>`
    background: url(${props => (props.open ? CloseIcon : OpenIcon)}) center left
        no-repeat;
    padding-left: 20px;
    cursor: pointer;
    padding-top: 2px;
    padding-bottom: 2px;

    &:hover {
        background-color: #ccc;
    }

    &:hover + div {
        background: #efefef;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        border-radius: 3px;
    }

    &:hover .time {
        display: inline;
    }
`;

interface ProfileNodeProps {
    entry: ProfileEntry;
    allTime: number;
}

function calculatePercentage(self: number, all: number): number {
    return Math.round((self / all) * 10000) / 100;
}

function parseLine(line: string): { name: string; selfTime: number } {
    const split = line.split(' ');
    const timePart = split.pop()!;
    return {
        name: split.join(' '),
        selfTime: parseInt(timePart.substring(0, timePart.length - 2))
    };
}

const ProfileNode: FC<ProfileNodeProps> = ({ entry, allTime }) => {
    const [open, setOpen] = useState<boolean>(false);
    const onToggle = () => setOpen(!open);
    const percent = calculatePercentage(entry.selfTime, allTime);
    return (
        <div className={ProfileNodeBox}>
            <ProfileNodeText onClick={onToggle} open={open}>
                {entry.name} <span className={PercentText}>{percent}%</span>{' '}
                <span className={`${TimeText} time`}>{entry.selfTime}ms</span>
                <span className={Bar}>
                    <span className={BarInner} style={{ width: percent }} />
                </span>
            </ProfileNodeText>
            {entry.children.length > 0 && (
                <div style={{ display: open ? 'block' : 'none' }}>
                    {entry.children.map((child, i) => (
                        <ProfileNode key={i} entry={child} allTime={allTime} />
                    ))}
                </div>
            )}
        </div>
    );
};

function generateProfileEntries(paste: string): RootEntry {
    const lines = paste.split('\n');
    if (lines.length < 2 || !lines[0].startsWith('Server thread')) {
        return { children: [INVALID_PROFILE] };
    }
    const rootEntry = {
        children: []
    };
    let currentDepth = 0;
    let currentEntry: ProfileEntry | RootEntry = rootEntry;
    let skipping = false;
    for (let line of lines) {
        const fullLength = line.length;
        line = line.trimStart();
        if (line.length === 0) {
            break;
        }
        const innerDepth = fullLength - line.length;
        if (skipping) {
            if (innerDepth < currentDepth) {
                skipping = false;
            } else {
                continue;
            }
        }
        if (currentDepth + 1 < innerDepth) {
            return { children: [INVALID_PROFILE] };
        }
        while (currentDepth > innerDepth && 'parent' in currentEntry) {
            currentEntry = currentEntry['parent'];
            currentDepth--;
        }
        currentDepth = innerDepth;

        const currentLine = parseLine(line);
        if (currentLine.selfTime <= 200) {
            skipping = true;
            continue;
        }
        if (isNaN(currentLine.selfTime)) {
            return { children: [INVALID_PROFILE] };
        }
        const newEntry: ProfileEntry = {
            name: currentLine.name,
            selfTime: currentLine.selfTime,
            parent: currentEntry,
            children: []
        };
        currentEntry.children.push(newEntry);
        currentEntry = newEntry;
        currentDepth++;
    }
    return rootEntry;
}

const ProfileComponent: FC<PasteProps> = memo(({ paste }) => {
    const rootEntry = generateProfileEntries(paste);
    return (
        <>
            {rootEntry.children.map((entry, i) => (
                <ProfileNode
                    key={`entry-${i}`}
                    entry={entry}
                    allTime={entry.selfTime}
                />
            ))}
        </>
    );
});
ProfileComponent.displayName = 'ProfileComponent';

export default ProfileComponent;

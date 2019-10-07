import React, { useState } from 'react';
import { PasteProps } from 'paste/pages/[id]';
import styled from '@emotion/styled';

const CloseIcon = require('../../../shared/src/images/close.png');
const OpenIcon = require('../../../shared/src/images/open.png');

interface ProfileEntry {
    name: string;
    selfTime: number;
    children: ProfileEntry[];
    parent?: ProfileEntry | RootEntry;
}

interface RootEntry {
    children: ProfileEntry[];
}

const INVALID_PROFILE = {
    name: 'Invalid Profile',
    selfTime: 0,
    children: []
};

const ProfileNodeBox = styled.div`
    margin-left: 6px;
    border-left: 1px solid #ccc;
`;

const PercentText = styled.span`
    color: #0059d1;
    font-size: 90%;
    border-radius: 3px;
    padding: 0 4px;
`;

const TimeText = styled.span`
    display: none;
    margin: 0;
    color: #888;
    font-size: 90%;
    border-radius: 3px;
    padding: 0 4px;
`;

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

const Bar = styled.span`
    display: inline-block;
    width: 100px;
    height: 12px;
    margin-left: 20px;
    border: 1px solid #ccc;
    position: absolute;
    right: 30px;
    background: #fff;
    line-height: 1;
`;

const BarInner = styled.span`
    display: inline-block;
    height: 12px;
    background: #0059d1;
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

const ProfileNode: React.FC<ProfileNodeProps> = ({ entry, allTime }) => {
    const [open, setOpen] = useState<boolean>(true);
    const onToggle = () => setOpen(!open);
    const percent = calculatePercentage(entry.selfTime, allTime);
    return (
        <ProfileNodeBox>
            <ProfileNodeText onClick={onToggle} open={open}>
                {entry.name} <PercentText>{percent}%</PercentText>{' '}
                <TimeText className="time">{entry.selfTime}ms</TimeText>
                <Bar>
                    <BarInner style={{ width: percent }} />
                </Bar>
            </ProfileNodeText>
            {entry.children.length > 0 && (
                <div style={{ display: open ? 'block' : 'none'}}>
                    {entry.children.map((child, i) => (
                        <ProfileNode key={i} entry={child} allTime={allTime} />
                    ))}
                </div>
            )}
        </ProfileNodeBox>
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
    for (let line of lines) {
        const fullLength = line.length;
        line = line.trimLeft();
        if (line.length === 0) {
            break;
        }
        const innerDepth = fullLength - line.length;
        if (currentDepth + 1 < innerDepth) {
            return { children: [INVALID_PROFILE] };
        }
        while (currentDepth > innerDepth) {
            currentEntry = currentEntry['parent'];
            currentDepth--;
        }
        currentDepth = innerDepth;

        const currentLine = parseLine(line);
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
        currentDepth ++;
    }
    return rootEntry;
}

const ProfileComponent: React.FC<PasteProps> = ({ paste }) => {
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
};

export default ProfileComponent;

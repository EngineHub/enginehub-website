import React, { useMemo, useState } from 'react';
import { PasteProps } from 'paste/pages/[id]';
import styled from '@emotion/styled';

interface ProfileEntry {
    name: string;
    selfTime: number;
    children: ProfileEntry[];
    depth: number;
    parent?: ProfileEntry;
}

const INVALID_PROFILE = {
    name: 'Invalid Profile',
    selfTime: 0,
    depth: 0,
    children: []
};

function parseLine(line: string): { name: string; selfTime: number } {
    const split = line.trimLeft().split(' ');
    const timePart = split.pop()!;
    return {
        name: split.join(' '),
        selfTime: parseInt(timePart.substring(0, timePart.length))
    };
}

const ProfileNodeBox = styled.div`
    margin-left: 4px;
    border-left: 1px solid #ddd;
`;

const ProfileNodeText = styled.div`

    &:hover {
        background-color: #ddd;
    }

    &:hover + div {
        background-color: #eee;
    }
`;

interface ProfileNodeProps {
    entry: ProfileEntry;
    allTime: number;
}

const ProfileNode: React.FC<ProfileNodeProps> = ({ entry, allTime }) => {
    const [open, setOpen] = useState<boolean>(true);
    const onToggle = () => setOpen(!open);
    return (
        <ProfileNodeBox>
            <ProfileNodeText onClick={onToggle}>{open ? '-' : '+'} {entry.name} {entry.selfTime}</ProfileNodeText>
            {open && entry.children.length > 0 && (
                <div>
                    {entry.children.map((child, i) => (
                        <ProfileNode key={i} entry={child} allTime={allTime} />
                    ))}
                </div>
            )}
        </ProfileNodeBox>
    );
};

const ProfileComponent: React.FC<PasteProps> = ({ paste }) => {
    const rootEntry: ProfileEntry = useMemo(() => {
        const lines = paste.split('\n');
        if (lines.length < 2 || !lines[0].startsWith('Server thread')) {
            return INVALID_PROFILE;
        }
        const startLine = parseLine(lines.shift()!);
        const entry: ProfileEntry = {
            ...startLine,
            depth: 0,
            children: []
        };
        let currentDepth = 0;
        let currentEntry = entry;
        for (const line of lines) {
            const innerDepth = line.length - line.trimLeft().length;
            if (currentDepth + 1 < innerDepth) {
                return INVALID_PROFILE;
            }
            while (currentDepth > innerDepth) {
                currentEntry = currentEntry.parent!;
                currentDepth--;
            }
            currentDepth = innerDepth;

            const currentLine = parseLine(line);
            if (isNaN(currentLine.selfTime)) {
                break;
            }
            const newEntry: ProfileEntry = {
                ...currentLine,
                depth: currentDepth,
                parent: currentEntry,
                children: []
            };
            currentEntry.children.push(newEntry);
            currentEntry = newEntry;
        }
        return entry;
    }, [paste]);
    return <ProfileNode entry={rootEntry} allTime={rootEntry.selfTime} />;
};

export default ProfileComponent;

import type { PasteProps } from 'paste/pages/[id]';
import type { FC } from 'react';
import { memo, useState } from 'react';

import {
    Bar,
    BarInner,
    PercentText,
    ProfileNodeBox,
    ProfileNodeText,
    TimeText
} from './ProfileComponent.module.css';

const CloseIcon = require('./images/close.png').default as { src: string };
const OpenIcon = require('./images/open.png').default as { src: string };

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
    selfTime: 60_000,
    children: [],
    parent: { children: [] }
};

interface ProfileNodeProps {
    entry: ProfileEntry;
    allTime: number;
}

function calculatePercentage(self: number, all: number): number {
    return Math.round((self / all) * 10_000) / 100;
}

function parseLine(line: string): { name: string; selfTime: number } {
    const split = line.split(' ');
    const timePart = split.pop()!;
    return {
        name: split.join(' '),
        selfTime: Number.parseInt(
            timePart.slice(0, Math.max(0, timePart.length - 2))
        )
    };
}

const ProfileNode: FC<ProfileNodeProps> = ({ entry, allTime }) => {
    const [open, setOpen] = useState<boolean>(false);
    const onToggle = () => setOpen(!open);
    const percent = calculatePercentage(entry.selfTime, allTime);
    return (
        <div className={ProfileNodeBox}>
            <div
                className={ProfileNodeText}
                onClick={onToggle}
                style={{
                    background:
                        entry.children.length > 0
                            ? `url(${
                                  open ? CloseIcon.src : OpenIcon.src
                              }) center left no-repeat`
                            : 'none'
                }}
            >
                {entry.name} <span className={PercentText}>{percent}%</span>{' '}
                <span className={`${TimeText} time`}>{entry.selfTime}ms</span>
                <span className={Bar}>
                    <span className={BarInner} style={{ width: percent }} />
                </span>
            </div>
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
        if (Number.isNaN(currentLine.selfTime)) {
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

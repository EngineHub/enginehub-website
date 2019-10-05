import React, { useMemo, useState } from 'react';
import { PasteProps } from 'paste/pages/[id]';
import styled from '@emotion/styled';

const CLOSE_ICON =
    'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA10lEQVR4Xt2Tu8rCQBSEzzlJmYBvYJ7EShArfQ1BrPNDyoB5DRHsrUQQQc3lcfxBiKbIHjfiCuayKSwEB6ZYPpjdGVhkZvhEJP3dALMMgmB+FoI7ddUQEYhw7bp/48YAkYtOfzCEJu22m5G2gnjeHIYxxHGiXJwV11dQTzdN4w0QKa4JULplGcymkwo4Rkn7iCjNOcNiuVK3vQZ0ug5gWwAgPnpalgW1+yDqA4hQmmSADVVGBW8bES7RaW+zYOBSNSSENL0etAGe5/UkMKBZ/77vv8APfKY7cvZVTt7VqzwAAAAASUVORK5CYII=)';
const OPEN_ICON =
    'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVR4Xt1TzYrCQAxOYo8z0GeRZY+eBPGkryGIZ4UeC/Yx/EHvnqTssot/9XF2YUHXQyd2RtuC2OnBg2AgJF/CfJkvwyAzwyNGiT+XwLktBMHwRyl270lDRCDCRb8/aBcSqFi59UYTiuwzXLasEtR18nYbQRTt4f2tqqPGad8uIb2641TyKUSJp307gbH/0wl63U4Ks3y925e/AibOMcN4OofRZKZLOmps6lj2CoBodAohspKUMtePaCcgQqNZCGlw+PFt8nwXWLZE+NttviQrBr6RhoRwOBxXVgLP82pJqECx/fq+n4EX+ExnBI9csQQ1hIoAAAAASUVORK5CYII=)';

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
    background: ${props => (props.open ? CLOSE_ICON : OPEN_ICON)} center left
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

import type { FC } from 'react';
import { useMemo, useState } from 'react';
import type { PasteProps } from 'paste/pages/[id]';
import {
    ReportWrapper,
    ReportNodeBox,
    ReportNodeTitle,
    ReportNodeContent
} from './ReportComponent.module.css';

const CloseIcon = require('./images/close.png').default as { src: string };
const OpenIcon = require('./images/open.png').default as { src: string };

interface ReportEntry {
    title: string;
    content: string;
}

const INVALID_REPORT = {
    title: 'Invalid Report',
    content: 'This paste is not a valid report.'
};

interface ReportNodeProps {
    entry: ReportEntry;
}

const ReportNode: FC<ReportNodeProps> = ({ entry }) => {
    const [open, setOpen] = useState<boolean>(true);
    const onToggle = () => setOpen(!open);
    return (
        <div className={ReportNodeBox}>
            <h2
                className={ReportNodeTitle}
                onClick={onToggle}
                style={{
                    background: `#efefef url(${
                        open ? CloseIcon.src : OpenIcon.src
                    }) center left no-repeat`
                }}
            >
                {entry.title}
            </h2>
            <pre
                className={ReportNodeContent}
                style={{ display: open ? 'block' : 'none' }}
            >
                {entry.content}
            </pre>
        </div>
    );
};

enum ReportState {
    CONTENT,
    HEADER_TITLE,
    HEADER_END
}

const REPORT_TITLE_REGEX = /^============+$/;

function generateReportEntries(paste: string): ReportEntry[] {
    const lines = paste.split('\n');
    const sections: ReportEntry[] = [];
    let currentState: ReportState = ReportState.CONTENT;
    let currentSection: ReportEntry = {
        content: '',
        title: ''
    };
    for (let line of lines) {
        line = line.trimEnd();

        switch (currentState) {
            case ReportState.CONTENT:
                if (line.match(REPORT_TITLE_REGEX)) {
                    if (currentSection.content.length !== 0) {
                        sections.push(currentSection);
                    }

                    currentSection = {
                        content: '',
                        title: ''
                    };
                    currentState = ReportState.HEADER_TITLE;
                } else {
                    if (currentSection.content.length !== 0 || line !== '') {
                        currentSection.content += `${line}\n`;
                    }
                }
                break;
            case ReportState.HEADER_TITLE:
                currentSection.title = line;
                currentState = ReportState.HEADER_END;
                break;
            case ReportState.HEADER_END:
                currentState = ReportState.CONTENT;
                break;
        }
    }
    if (
        currentState == ReportState.CONTENT &&
        currentSection.content.length !== 0
    ) {
        sections.push(currentSection);
    }
    if (sections.length === 0) {
        sections.push(INVALID_REPORT);
    }
    return sections;
}

const ReportComponent: FC<PasteProps> = ({ paste }) => {
    const reportEntries = useMemo(() => generateReportEntries(paste), [paste]);

    return (
        <div className={ReportWrapper}>
            {reportEntries.map((entry, i) => (
                <ReportNode key={`entry-${i}`} entry={entry} />
            ))}
        </div>
    );
};

export default ReportComponent;

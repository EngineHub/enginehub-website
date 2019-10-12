import React, { useState } from 'react';
import { PasteProps } from 'paste/pages/[id]';
import styled from '@emotion/styled';

const CloseIcon = require('../../../shared/src/images/close.png');
const OpenIcon = require('../../../shared/src/images/open.png');

interface ReportEntry {
    title: string;
    content: string;
}

const INVALID_REPORT = {
    title: 'Invalid Report',
    content: 'This paste is not a valid report.'
};

const ReportNodeBox = styled.div<{ open: boolean }>`
    tab-size: 3;
    margin: 0 0 5px 0;
    padding: 0;
    border-radius: 3px;

    h2 {
        cursor: pointer;
        margin: 0;
        padding: 0 0 0 25px;
        font-size: 120%;
        background: #efefef url(${props => (props.open ? CloseIcon : OpenIcon)})
            center left no-repeat;
        &:hover {
            text-decoration: underline;
        }
    }

    pre {
        display: ${props => (props.open ? 'block' : 'none')};
        background: transparent;
        border: 0;
        margin: 10px 25px;
        padding: 0;
    }
`;

interface ReportNodeProps {
    entry: ReportEntry;
}

const ReportNode: React.FC<ReportNodeProps> = ({ entry }) => {
    const [open, setOpen] = useState<boolean>(true);
    const onToggle = () => setOpen(!open);
    return (
        <ReportNodeBox open={open}>
            <h2 onClick={onToggle}>{entry.title}</h2>
            <pre>{entry.content}</pre>
        </ReportNodeBox>
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
        line = line.trimRight();

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
                        currentSection.content = `${currentSection.content}${line}\n`;
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
    return sections;
}

const ReportComponent: React.FC<PasteProps> = ({ paste }) => {
    const reportEntries = generateReportEntries(paste);
    if (reportEntries.length === 0) {
        reportEntries.push(INVALID_REPORT);
    }
    return (
        <>
            {reportEntries.map((entry, i) => (
                <ReportNode key={`entry-${i}`} entry={entry} />
            ))}
        </>
    );
};

export default ReportComponent;

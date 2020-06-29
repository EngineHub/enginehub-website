import React from 'react';

export function getFiles(event: React.DragEvent<any>): File[] {
    if (event.dataTransfer.items) {
        return Array.from(event.dataTransfer.items)
            .filter(item => item.kind === 'file')
            .map(item => item.getAsFile()!);
    } else {
        return Array.from(event.dataTransfer.files);
    }
}

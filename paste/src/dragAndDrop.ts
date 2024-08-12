import type { DragEvent } from 'react';

export function getFiles(event: DragEvent<any>): File[] {
    if (event.dataTransfer.items) {
        return [...event.dataTransfer.items]
            .filter(item => item.kind === 'file')
            .map(item => item.getAsFile()!);
    } else {
        return [...event.dataTransfer.files];
    }
}

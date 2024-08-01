export type Extension = '' | 'report' | 'paste' | 'profile' | 'log' | 'schem';

export interface PasteData {
    content: string;
    metadata?: {
        from?: string;
        extension?: Extension;
        name?: string;
        author?: string;
    };
}

export const MAX_SIZE = 1024 * 1024 * 150; // 150MB
export const EXPIRY = 60 * 15 * 1000; // 15 minutes

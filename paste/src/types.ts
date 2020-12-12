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

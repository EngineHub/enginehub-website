import { getPaste } from './dynamoDb';

export async function loadPaste(id: string): Promise<string | undefined> {
    if (id === 'test') {
        return "Test Paste, please ignore";
    }
    try {
        return await getPaste(id);
    } catch (e) {
        return undefined;
    }
}

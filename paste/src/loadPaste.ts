import { getPaste } from './pasteStore';
import type { PasteData } from './types';

const TEST_SCHEM =
    'H4sIAAAAAAAAAF1OXUvDQBCc3GHTnIr/wZ8h2Aex4INFQbF+IGVNN8lieoHcgvrqH/Wn6J4KFedl2JndmQ2oruqON6RSe4RL6lmVF/QKwAeUv4LHwUYi1yM1epR0iGy+89jfqiSjaYXH4VZrR0pp9dQP9fNDisPL23FDfeJHZHiUNzwmGWK+c5icc2y1gwuYLlhpTUoe1XJ+0TSJ9fbT8Ge++zfff4dazBlL2ylcieokN59ajjnTbBdF4Rx2lrLORRX2rqXneVRR4RTyxi4mP3n5Q2v4MJ4Zv+MLMXi6PSsBAAA=';

export async function loadPaste(id: string): Promise<PasteData | undefined> {
    switch (id) {
        case 'test': {
            return {
                content:
                    'Test Paste, please ignore\nTest Paste, please ignore\nTest Paste, please ignore\nTest Paste, please ignore',
                metadata: { extension: '' }
            };
        }
        case 'test-report': {
            return {
                content: `
================================
Section 1
================================

Some information: about stuff

================================
Section 2
================================

More info
`,
                metadata: { extension: 'report' }
            };
        }
        case 'test-schematic': {
            return { content: TEST_SCHEM, metadata: { extension: 'schem' } };
        }
        // No default
    }

    return await getPaste(id);
}

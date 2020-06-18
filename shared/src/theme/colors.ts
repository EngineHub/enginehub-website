export interface ColorPalette {
    normal: string;
    darker: string;
    lighter: string;
    font: string;
    accent: string;
}

export const BRAND: ColorPalette = {
    lighter: '#7b5bb1',
    normal: '#4B3570',
    darker: '#34254e',
    font: '#FFF',
    accent: '#b3a1d2'
};

export const PRIMARY: ColorPalette = {
    lighter: '#2686ff',
    normal: '#0059c9',
    darker: '#003e8c',
    font: '#FFF',
    accent: '#83baff'
};

export const SECONDARY: ColorPalette = {
    lighter: '#f2f2f2',
    normal: '#f5f5f5',
    darker: '#f8f8f8',
    font: '#333',
    accent: '#333'
};

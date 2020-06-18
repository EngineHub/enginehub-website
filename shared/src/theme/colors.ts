export interface ColorPalette {
    normal: string;
    darker: string;
    lighter: string;
    font: string;
    accent: string;
}

export const BRAND: ColorPalette = {
    lighter: '#573D81',
    normal: '#4B3570',
    darker: '#3F2D5F',
    font: '#FFF',
    accent: '#896cb9'
};

export const PRIMARY: ColorPalette = {
    lighter: '#0064e3',
    normal: '#0059c9',
    darker: '#004eb0',
    font: '#FFF',
    accent: '#64a8ff'
};

export const SECONDARY: ColorPalette = {
    lighter: '#f2f2f2',
    normal: '#f5f5f5',
    darker: '#f8f8f8',
    font: '#333',
    accent: '#333'
};

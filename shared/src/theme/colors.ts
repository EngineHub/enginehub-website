export type ColorPalettes = keyof Theme;

export interface Theme {
    gray: ColorPalette;
    brand: ColorPalette;
    primary: ColorPalette;
    secondary: ColorPalette;
}

export interface ColorPalette {
    normal: string;
    darker: string;
    lighter: string;
    accent: string;
    font: FontPalette;
}

export interface FontPalette {
    normal: string;
    lighter: string;
    inverse: string;
}

export const LIGHT_THEME: Theme = {
    gray: {
        normal: '#fff',
        lighter: '#fff',
        accent: '#eee',
        darker: '#808080',
        font: {
            normal: '#000',
            lighter: '#555',
            inverse: '#fff'
        }
    },
    brand: {
        lighter: '#573D81',
        normal: '#4B3570',
        darker: '#3F2D5F',
        accent: '#896cb9',
        font: {
            normal: '#000',
            lighter: '#333',
            inverse: '#FFF'
        }
    },
    primary: {
        lighter: '#0064e3',
        normal: '#0059c9',
        darker: '#004eb0',
        accent: '#64a8ff',
        font: {
            normal: '#000',
            lighter: '#333',
            inverse: '#FFF'
        }
    },
    secondary: {
        lighter: '#f2f2f2',
        normal: '#f5f5f5',
        darker: '#f8f8f8',
        accent: '#cfcfcf',
        font: {
            normal: '#ccc',
            lighter: '#333',
            inverse: '#333'
        }
    }
};

export const DARK_THEME: Theme = {
    gray: {
        normal: '#222',
        lighter: '#000',
        accent: '#555',
        darker: '#808080',
        font: {
            normal: '#fff',
            lighter: '#999',
            inverse: '#000'
        }
    },
    brand: {
        lighter: '#573D81',
        normal: '#4B3570',
        darker: '#3F2D5F',
        accent: '#896cb9',
        font: {
            normal: '#000',
            lighter: '#333',
            inverse: '#FFF'
        }
    },
    primary: {
        lighter: '#0064e3',
        normal: '#0059c9',
        darker: '#004eb0',
        accent: '#64a8ff',
        font: {
            normal: '#000',
            lighter: '#333',
            inverse: '#FFF'
        }
    },
    secondary: {
        lighter: '#0d0d0d',
        normal: '#0a0a0a',
        darker: '#070707',
        accent: '#303030',
        font: {
            normal: '#333',
            lighter: '#333',
            inverse: '#ccc'
        }
    }
};

import deepmerge from 'deepmerge';

export interface ColorPalette {
    normal: string;
    darker: string;
    lighter: string;
    font: string;
    accent: string;
}

export interface BrandPalette extends ColorPalette {
    muted: string;
}

export interface ContentColors {
    text: string;
    background: string;
}

export interface BoxColors extends ContentColors {
    border: string;
}

export interface Theme {
    brand: BrandPalette;
    primary: ColorPalette;
    secondary: ColorPalette;
    pageBackground: string;
    text: {
        normal: string;
        strong: string;
        muted: string;
    };
    border: string;
    shadowColor: string;
    link: {
        text: string;
        hover: string;
        strongHover: string;
    };
    highlight: ContentColors;
    code: ContentColors;
    box: {
        info: BoxColors;
        warning: BoxColors;
    };
    label: {
        text: string;
        infoBackground: string;
        warningBackground: string;
    };
    status: {
        successText: string;
        danger: ContentColors;
    };
}

export const LIGHT_THEME: Theme = {
    brand: {
        lighter: '#573D81',
        normal: '#4B3570',
        darker: '#3F2D5F',
        font: '#FFF',
        accent: '#896cb9',
        muted: '#b4a1d3'
    },
    primary: {
        lighter: '#0064e3',
        normal: '#0059c9',
        darker: '#004eb0',
        font: '#FFF',
        accent: '#64a8ff'
    },
    secondary: {
        lighter: '#f2f2f2',
        normal: '#f5f5f5',
        darker: '#f8f8f8',
        font: '#333',
        accent: '#cfcfcf'
    },
    pageBackground: '#fff',
    text: {
        normal: 'var(--secondary-font)',
        strong: '#000',
        muted: '#777'
    },
    border: 'color-mix(in srgb, var(--secondary-accent) 70%, var(--page-background))',
    shadowColor: '#000',
    link: {
        text: 'var(--primary-normal)',
        hover: 'var(--primary-darker)',
        strongHover: '#003884'
    },
    highlight: {
        background: '#ff0',
        text: '#000'
    },
    code: {
        text: '#c7254e',
        background: '#f9f2f4'
    },
    box: {
        info: {
            background: '#d9edf7',
            text: '#31708f',
            border: '#bce8f1'
        },
        warning: {
            background: '#fcf8e3',
            text: '#8a6d3b',
            border: '#faebcc'
        }
    },
    label: {
        text: 'var(--brand-font)',
        infoBackground: 'var(--text-muted)',
        warningBackground: '#f0ad4e'
    },
    status: {
        successText: '#3c763d',
        danger: {
            text: '#a94442',
            background: '#f2dede'
        }
    }
};

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export const DARK_THEME: Theme = deepmerge<Theme, DeepPartial<Theme>>(
    LIGHT_THEME,
    {
        primary: {
            lighter: '#66a8ff',
            normal: '#3b82e6',
            darker: '#2563c4',
            accent: '#8dc0ff'
        },
        secondary: {
            lighter: '#3a3942',
            normal: '#302f37',
            darker: '#25242b',
            font: '#e6e3eb',
            accent: '#55545f'
        },
        pageBackground: '#18171c',
        text: {
            strong: '#fff',
            muted: '#aaa6b2'
        },
        link: {
            text: 'var(--primary-accent)',
            hover: 'var(--primary-lighter)',
            strongHover: '#b7d7ff'
        },
        highlight: {
            background: '#594d20',
            text: '#fff2b3'
        },
        code: {
            text: '#f08bab',
            background: '#29232b'
        },
        box: {
            info: {
                background: '#1e3440',
                text: '#a9d8ec',
                border: '#32586a'
            },
            warning: {
                background: '#40351e',
                text: '#f2d28b',
                border: '#66552c'
            }
        },
        label: {
            infoBackground: 'var(--secondary-accent)',
            warningBackground: '#b87825'
        },
        status: {
            successText: '#8bd49b',
            danger: {
                text: '#ffaaaa',
                background: '#48282c'
            }
        }
    }
);

export const createThemeCss = (theme: Theme): string => `
    /* Brand */
    --brand-lighter: ${theme.brand.lighter};
    --brand-normal: ${theme.brand.normal};
    --brand-darker: ${theme.brand.darker};
    --brand-font: ${theme.brand.font};
    --brand-accent: ${theme.brand.accent};
    --brand-muted: ${theme.brand.muted};

    /* Primary */
    --primary-lighter: ${theme.primary.lighter};
    --primary-normal: ${theme.primary.normal};
    --primary-darker: ${theme.primary.darker};
    --primary-font: ${theme.primary.font};
    --primary-accent: ${theme.primary.accent};

    /* Secondary */
    --secondary-lighter: ${theme.secondary.lighter};
    --secondary-normal: ${theme.secondary.normal};
    --secondary-darker: ${theme.secondary.darker};
    --secondary-font: ${theme.secondary.font};
    --secondary-accent: ${theme.secondary.accent};

    /* Surfaces, text and borders */
    --page-background: ${theme.pageBackground};
    --text-normal: ${theme.text.normal};
    --text-strong: ${theme.text.strong};
    --text-muted: ${theme.text.muted};
    --border: ${theme.border};
    --shadow-color: ${theme.shadowColor};

    /* Interface accents */
    --link-text: ${theme.link.text};
    --link-hover: ${theme.link.hover};
    --link-strong-hover: ${theme.link.strongHover};
    --highlight-background: ${theme.highlight.background};
    --highlight-text: ${theme.highlight.text};
    --code-text: ${theme.code.text};
    --code-background: ${theme.code.background};
    --info-background: ${theme.box.info.background};
    --info-text: ${theme.box.info.text};
    --info-border: ${theme.box.info.border};
    --warning-background: ${theme.box.warning.background};
    --warning-text: ${theme.box.warning.text};
    --warning-border: ${theme.box.warning.border};
    --label-text: ${theme.label.text};
    --label-info-background: ${theme.label.infoBackground};
    --label-warning-background: ${theme.label.warningBackground};
    --success-text: ${theme.status.successText};
    --danger-text: ${theme.status.danger.text};
    --danger-background: ${theme.status.danger.background};
`;

export const THEME_CSS = `
html {
${createThemeCss(LIGHT_THEME)}
}

@media (prefers-color-scheme: dark) {
    html {
${createThemeCss(DARK_THEME)}
    }
}
`;

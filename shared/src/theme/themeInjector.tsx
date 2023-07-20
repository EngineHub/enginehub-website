import { THEME_CSS } from './colors';

export const ThemeInjector = () => (
    <style dangerouslySetInnerHTML={{ __html: THEME_CSS }} />
);

declare module '*.svg' {
    const content: string;
    export const ReactComponent: React.ComponentType<any>;
    export default content;
}

declare module '*.module.css';
declare module '*.global.css';

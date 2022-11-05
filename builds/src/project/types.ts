export interface Project {
    name: string;
    id: string;
    defaultBranch: string;
    buildType: string;
    icon?: string;
    extraSponsors?: string[];
    pinnedBranches?: string[];
    vcsRoot: string;
}

export const PROJECTS = [
    {
        id: 'worldedit',
        name: 'WorldEdit',
        defaultBranch: 'version/7.2.x',
        icon: '/projects/worldedit-logo.svg',
        buildType: 'bt10',
        pinnedBranches: ['master'],
        vcsRoot: 'https://github.com/EngineHub/WorldEdit'
    },
    {
        id: 'worldguard',
        name: 'WorldGuard',
        defaultBranch: 'version/7.0.x',
        icon: '/projects/worldguard-logo.svg',
        buildType: 'bt11',
        pinnedBranches: ['master'],
        vcsRoot: 'https://github.com/EngineHub/WorldGuard'
    },
    {
        id: 'craftbook',
        name: 'CraftBook',
        defaultBranch: 'master',
        icon: '/projects/craftbook-logo.svg',
        buildType: 'bt6',
        pinnedBranches: ['4.x', 'five'],
        vcsRoot: 'https://github.com/EngineHub/CraftBook'
    },
    {
        id: 'commandbook',
        name: 'CommandBook',
        defaultBranch: 'master',
        icon: '/projects/commandbook-logo.svg',
        buildType: 'bt9',
        vcsRoot: 'https://github.com/EngineHub/CommandBook'
    },
    {
        id: 'commandhelper',
        name: 'CommandHelper',
        defaultBranch: 'master',
        icon: '/projects/commandhelper-logo.svg',
        buildType: 'bt12',
        vcsRoot: 'https://github.com/EngineHub/CommandHelper'
    }
];

export const PROJECT_MAP = new Map<string, Project>(
    PROJECTS.map(proj => [proj.id, proj])
);

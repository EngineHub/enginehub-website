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
        defaultBranch: 'master',
        icon: require('../images/worldedit-logo.svg'),
        buildType: 'bt10',
        pinnedBranches: ['forge-archive/1.12.2'],
        vcsRoot: 'https://github.com/EngineHub/WorldEdit'
    },
    {
        id: 'worldguard',
        name: 'WorldGuard',
        defaultBranch: 'master',
        icon: require('../images/worldguard-logo.svg'),
        buildType: 'bt11',
        vcsRoot: 'https://github.com/EngineHub/WorldGuard'
    },
    {
        id: 'craftbook',
        name: 'CraftBook',
        defaultBranch: 'master',
        icon: require('../images/craftbook-logo.svg'),
        buildType: 'bt6',
        extraSponsors: ['beastnode'],
        pinnedBranches: ['4.x', 'five'],
        vcsRoot: 'https://github.com/EngineHub/CraftBook'
    },
    {
        id: 'commandbook',
        name: 'CommandBook',
        defaultBranch: 'master',
        icon: require('../images/commandbook-logo.svg'),
        buildType: 'bt9',
        vcsRoot: 'https://github.com/EngineHub/CommandBook'
    },
    {
        id: 'commandhelper',
        name: 'CommandHelper',
        defaultBranch: 'master',
        icon: require('../images/commandhelper-logo.svg'),
        buildType: 'bt12',
        vcsRoot: 'https://github.com/EngineHub/CommandHelper'
    }
];

export const PROJECT_MAP = new Map<string, Project>(
    PROJECTS.map(proj => [proj.id, proj])
);

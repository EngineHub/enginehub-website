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
        icon: require('../images/worldedit-icon.png'),
        buildType: 'bt10',
        pinnedBranches: ['forge-archive/1.12.2'],
        vcsRoot: 'https://github.com/EngineHub/WorldEdit'
    },
    {
        id: 'worldguard',
        name: 'WorldGuard',
        defaultBranch: 'master',
        icon: require('../images/worldguard-icon.png'),
        buildType: 'bt11',
        pinnedBranches: ['archive/1.13'],
        vcsRoot: 'https://github.com/EngineHub/WorldGuard'
    },
    {
        id: 'craftbook',
        name: 'CraftBook',
        defaultBranch: 'master',
        icon: require('../images/craftbook-icon.png'),
        buildType: 'bt6',
        extraSponsors: ['beastnode'],
        pinnedBranches: ['3.x', 'five'],
        vcsRoot: 'https://github.com/EngineHub/CraftBook'
    },
    {
        id: 'commandbook',
        name: 'CommandBook',
        defaultBranch: 'master',
        icon: require('../images/commandbook-icon.png'),
        buildType: 'bt9',
        vcsRoot: 'https://github.com/EngineHub/CommandBook'
    },
    {
        id: 'commandhelper',
        name: 'CommandHelper',
        defaultBranch: 'master',
        icon: require('../images/commandhelper-icon.png'),
        buildType: 'bt12',
        vcsRoot: 'https://github.com/EngineHub/CommandHelper'
    }
];

export const PROJECT_MAP = new Map<string, Project>(
    PROJECTS.map(proj => [proj.id, proj])
);

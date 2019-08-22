export interface Project {
    name: string;
    defaultBranch: string;
    icon?: string;
    extraSponsors?: string[];
}

export const PROJECT_MAP = new Map<string, Project>([
    ['worldedit', {
        name: 'WorldEdit',
        defaultBranch: 'master',
        icon: require('../images/worldedit-icon.png')
    }],
    ['worldguard', {
        name: 'WorldGuard',
        defaultBranch: 'master',
        icon: require('../images/worldguard-icon.png')
    }],
    ['craftbook', {
        name: 'CraftBook',
        defaultBranch: 'master',
        icon: require('../images/craftbook-icon.png'),
        extraSponsors: ['beastnode']
    }],
    ['commandbook', {
        name: 'CommandBook',
        defaultBranch: 'master',
        icon: require('../images/commandbook-icon.png')
    }],
    ['commandhelper', {
        name: 'CommandHelper',
        defaultBranch: 'master',
        icon: require('../images/commandhelper-icon.png')
    }]
]);

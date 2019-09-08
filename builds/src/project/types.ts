export interface Project {
    name: string;
    id: string;
    defaultBranch: string;
    buildType: string;
    icon?: string;
    extraSponsors?: string[];
    pinnedBranches?: string[];
}

export const PROJECT_MAP = new Map<string, Project>([
    [
        'worldedit',
        {
            id: 'worldedit',
            name: 'WorldEdit',
            defaultBranch: 'master',
            icon: require('../images/worldedit-icon.png'),
            buildType: 'bt10',
            pinnedBranches: [
                'archives/1.13.2',
                'forge-archive/1.12.2',
                'forge-archive/1.11.2',
                'forge-archive/1.10.2',
                'forge-archive/1.9.4',
                'forge-archive/1.8.9',
                'forge-archive/1.7.10'
            ]
        }
    ],
    [
        'worldguard',
        {
            id: 'worldguard',
            name: 'WorldGuard',
            defaultBranch: 'master',
            icon: require('../images/worldguard-icon.png'),
            buildType: 'bt11'
        }
    ],
    [
        'craftbook',
        {
            id: 'craftbook',
            name: 'CraftBook',
            defaultBranch: 'master',
            icon: require('../images/craftbook-icon.png'),
            buildType: 'bt6',
            extraSponsors: ['beastnode'],
            pinnedBranches: ['3.x', 'five']
        }
    ],
    [
        'commandbook',
        {
            id: 'commandbook',
            name: 'CommandBook',
            defaultBranch: 'master',
            icon: require('../images/commandbook-icon.png'),
            buildType: 'bt9'
        }
    ],
    [
        'commandhelper',
        {
            id: 'commandhelper',
            name: 'CommandHelper',
            defaultBranch: 'master',
            icon: require('../images/commandhelper-icon.png'),
            buildType: 'bt12'
        }
    ]
]);

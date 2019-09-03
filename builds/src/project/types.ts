export interface Project {
    name: string;
    id: string;
    defaultBranch: string;
    buildType: string;
    icon?: string;
    extraSponsors?: string[];
}

export interface Build {
    build_id: string;
    build_number: number;
    build_hash: string;
    project: string;
    state: 'SUCCESS' | 'FAILED';
    build_date: number;
    download_count: number;
    branch: string;
    data: string | BuildData;
}

export interface BuildChange {
    version: string;
    summary: string;
    username: string;
    date: number;
}

export interface BuildArtifact {
    name: string;
    size: number;
}

export interface BuildData {
    artifacts: BuildArtifact[];
    changes: BuildChange[];
}

export const PROJECT_MAP = new Map<string, Project>([
    ['worldedit', {
        id: 'worldedit',
        name: 'WorldEdit',
        defaultBranch: 'master',
        icon: require('../images/worldedit-icon.png'),
        buildType: 'bt10'
    }],
    ['worldguard', {
        id: 'worldguard',
        name: 'WorldGuard',
        defaultBranch: 'master',
        icon: require('../images/worldguard-icon.png'),
        buildType: 'bt11'
    }],
    ['craftbook', {
        id: 'craftbook',
        name: 'CraftBook',
        defaultBranch: 'master',
        icon: require('../images/craftbook-icon.png'),
        buildType: 'bt6',
        extraSponsors: ['beastnode']
    }],
    ['commandbook', {
        id: 'commandbook',
        name: 'CommandBook',
        defaultBranch: 'master',
        icon: require('../images/commandbook-icon.png'),
        buildType: 'bt9'
    }],
    ['commandhelper', {
        id: 'commandhelper',
        name: 'CommandHelper',
        defaultBranch: 'master',
        icon: require('../images/commandhelper-icon.png'),
        buildType: 'bt12'
    }]
]);

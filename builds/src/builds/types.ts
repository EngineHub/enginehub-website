export interface Build {
    build_id: string;
    build_number: number;
    build_hash: string;
    project: string;
    state: 'SUCCESS' | 'FAILED';
    statusText: string;
    build_date: number;
    branch: string;
    artifacts: BuildArtifact[];
    changes: BuildChange[];
}

export interface BuildChange {
    version: string;
    comment: string;
    username: string;
    date: number;
}

export interface BuildArtifact {
    name: string;
    size: number;
}

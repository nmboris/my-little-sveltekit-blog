export interface PreprocessorReturn {
    code: string;
    data?: Record<string, unknown>;
    map?: string;
}

export interface BlogpostMetadata {
    slug: string;
    src: string;
    meta: Record<string, ArrayLike<unknown>>;
}
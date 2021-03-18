export interface Post {
    id?: number;
    title: string;
    text?: string;
    userId?: string;
    user?: object;
}

export interface Like {
    id: number;
    userId: number;
    value: boolean;
}

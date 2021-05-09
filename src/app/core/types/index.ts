export interface Post {
    id?: number;
    title: string;
    text?: string;
    userId?: string;
    user?: object;
}
export interface Comment {
    id?: number;
    userId?: number;
    postId: number;
    content: string;
}

export interface Like {
    id: number;
    userId: number;
    value: boolean;
}

// For paged response of posts
export interface PagedPostResponse {
    content?: Post[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    sort: Sort;
    numberOfElements: number;
    size: number;
    number: number;
    empty: boolean;
}
// export interface ContentEntity {
//     id: number;
//     title: string;
//     text: string;
//     user: User;
// }
// export interface User {
//     id: number;
//     username: string;
//     password: string;
//     email: string;
//     created: string;
// }
export interface Pageable {
    sort: Sort;
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
}
export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

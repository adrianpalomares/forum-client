// There is user and userId
// Server returns user
// userId is used for requests
export interface Comment {
    id?: number;
    userId?: number;
    postId: number;
    content: string;
}

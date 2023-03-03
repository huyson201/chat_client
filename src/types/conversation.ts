
export interface ConversationsResponse {
    docs: (ConversationType)[] | null,
    totalDocs?: number,
    limit: number,
    page: number
}

export interface DocsType {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    online_status: string,
    avatar_url: string,
    is_friend: boolean,
}

export interface ConversationType {
    _id: string,
    name?: string,
    creator?: Omit<DocsType, "is_friend">,
    members: Omit<DocsType, "is_friend">[],
    is_group: boolean,
}
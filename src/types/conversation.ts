


export interface User {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    online_status: string,
    avatar_url: string,
}

export interface ConversationType {
    _id: string,
    name?: string,
    creator?: User,
    members: User[],
    lastMessage?: {
        sender: string,
        content: string
    }
    is_group: boolean,
}
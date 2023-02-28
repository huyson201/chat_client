export interface Auth {
    _id: string
    first_name: string
    last_name: string
    email: string
    password?: string
    token?: string
    avatar_url?: string;
    online_status: 'online' | 'offline'
    friends: Auth[]
    googleId?: string
    createdAt?: Date;
    updatedAt?: Date;
}



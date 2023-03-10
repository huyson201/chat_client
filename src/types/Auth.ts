export interface Auth {
    _id: string
    first_name: string
    last_name: string
    email: string
    password?: string
    token?: string
    avatar_url?: string;
    online_status: 'online' | 'offline'
    googleId?: string
    createdAt?: Date;
    updatedAt?: Date;
}


export interface LoginError {
    email?: string,
    password?: string
}

export interface AuthCommonInfo {
    _id: string
    first_name: string
    last_name: string
    email: string
    avatar_url?: string;
    online_status: 'online' | 'offline'
}
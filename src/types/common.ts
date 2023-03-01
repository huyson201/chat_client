export interface ApiResponse<T, U = {}> {
    message?: string,
    success?: boolean,
    data: T,
    error?: U
}


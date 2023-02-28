export interface ApiResponse<T> {
    message?: string,
    success?: boolean,
    data: T,
    errors?: any
}
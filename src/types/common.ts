export interface ApiResponse<T, U = {}> {
    message?: string,
    success?: boolean,
    data: T,
    error?: U
}

export interface Paginate<T> {
    docs: (T)[] | null,
    totalDocs?: number,
    limit: number,
    page: number
}
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
    page: number,
    totalPages: number,
    nextPage: number | null
}

export interface LinkReviewData {
    url: string,
    title: string,
    siteName: string,
    description: string
    mediaType: string,
    contentType: string
    images: string[],
    videos: string,
    favicons: string[]
}


export interface FileUploadResponse {
    fileUrl: string,
    original_filename: string,
    resource_type: string,
    format: string
    filename: string,
}
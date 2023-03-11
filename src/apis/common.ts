import { ApiResponse, FileUploadResponse, LinkReviewData, Paginate } from "../types/common"
import axiosInstance from "./axiosInstance"

const commonApi = {
    getLinkReview: (url: string) => {
        return axiosInstance.get<ApiResponse<LinkReviewData>>("/link-review", {
            params: {
                url
            }
        })
    },
    uploadFile: (formData: FormData) => {
        return axiosInstance.post<ApiResponse<FileUploadResponse>>("/file-upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}

export default commonApi
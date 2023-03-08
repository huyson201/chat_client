import { ApiResponse, LinkReviewData, Paginate } from "../types/common"
import axiosInstance from "./axiosInstance"

const commonApi = {
    getLinkReview: (url: string) => {
        return axiosInstance.get<ApiResponse<LinkReviewData>>("/link-review", {
            params: {
                url
            }
        })
    }
}

export default commonApi
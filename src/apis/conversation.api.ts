import axiosInstance from "./axiosInstance"

const authApis = {
    getConversations: () => {
        return axiosInstance.get("/users/conversations")
    }
}

export default authApis
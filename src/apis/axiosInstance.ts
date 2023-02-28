import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Tạo instance của Axios với các giá trị mặc định
const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    },
    withCredentials: true
});



// Function để lấy lại token
const refreshToken = () => {
    return axiosInstance.post('/auth/refresh-token', {}, { _retry: true });
};

// axiosInstance.interceptors.response.use((response => {
//     return response.data.data
// }))

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        let originalConfig = error.config;

        if (error.response) {
            let { status } = error.response
            if (status && status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                return refreshToken().then(() => axios(originalConfig)).catch(err => Promise.reject(err))
            }
        }

        return Promise.reject(error);
    }
);
// let isRefresh = false
// const interceptors = axiosInstance.interceptors.response.use((response) => {
//     return response.data.data
// }, error => {
//     let { status, config } = error.response
//     if (status !== 401) {
//         return Promise.reject(error);
//     }

//     if (status && status === 401 && !config._retry) {
//         if (isRefresh) {
//             return
//         }
//         isRefresh = true
//         config._retry = true

//         return refreshToken().then(() => {
//             isRefresh = false
//             return axiosInstance(config)
//         }).catch(err => Promise.reject(err))
//     }
//     return Promise.reject(error);
// })




export default axiosInstance;

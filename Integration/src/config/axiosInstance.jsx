import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if(error.response.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;

            try {
                const res = await axiosInstance.get("/auth/get-accessToken");   
                return axiosInstance(originalRequest);
            } catch (error) {
                console.log("res: ", error);
                window.location.href = "/";
                return Promise.reject(error);
            }
        }
    }
)
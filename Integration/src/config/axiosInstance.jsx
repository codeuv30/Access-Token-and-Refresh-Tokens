import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

// axiosInstance.interceptors.request.use();

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Axios instance response ---->", response);

        return response;
    },
    (error) => {
        console.log("error in response ---->", error);


        if(error.response.status === 401) {
            axiosInstance.get("/get-accessToken");
        }
    }
);
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form"
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../state/AuthReducer";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onLogin = async (data) => {
    try {
        const res = await axiosInstance.post("/auth/login", data);
        dispatch(setUser(res.data.user));
    } catch (error) {
        console.log("Error in login: ", error)
    }
  }

  const onRegister = async (data) => {
    try {
        const response = await axiosInstance.post("/auth/register", data);

        console.log("res from register", res);
    } catch (error) {
        console.log("Error in register: ", error)
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    navigate,
    onSubmit,
    onLogin,
    onRegister
  };
};

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../store/features/auth/authSlice";

const useAuthHook = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting }, } = useForm({
        mode: "onChange",

        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    const dispatch = useDispatch();




    const onSubmitLogin = async (formData) => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: formData.email.trim(),
                password: formData.password,
            });


            const { accessToken, message, success, user } = response.data;
            if (success) {
                toast.success(message);
                dispatch(setUser(user));
                dispatch(setAccessToken(accessToken));
                setTimeout(() => {
                    navigate('/')
                }, 1400);

            }





        } catch (error) {

            setError("root", {
                type: "server",
                message:
                    error.response?.data?.message ||
                    "Unable to sign in. Please try again.",
            });
        }
    };

    const onSubmitRegister = async (data) => {
        try {

            const { confirmPassword, terms, ...userData } = data;

            const response = await axiosInstance.post("/auth/register", userData);


            console.log(response.data)

            const { message, success, user } = response.data;

            if (success) {
                toast.success(message);

                setTimeout(() => {
                    navigate('/login');
                }, 1400);

            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response)
        }

    };

    return {
        register,
        handleSubmit,
        watch,
        errors,
        isSubmitting,
        onSubmitLogin,
        navigate,
        onSubmitRegister,
    };
};

export default useAuthHook;
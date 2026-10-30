import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { clearAuth, setAccessToken, setAuthLoading, setUser } from "../store/features/auth/authSlice";
import axiosInstance from "../api/axiosInstance";



const useAuth = () => {
    const dispatch = useDispatch();


    const initializeAuth = async () => {
        dispatch(setAuthLoading(true));

        try {

            const res = await axiosInstance.post('/auth/refresh');
            const accessToken = res.data.accessToken
            dispatch(setAccessToken(accessToken));

            const meRes = await axiosInstance.get('/auth/me');
            dispatch(setUser(meRes.data.user));


        } catch {
            dispatch(clearAuth());
        } finally {
            dispatch(setAuthLoading(false));

        }


    }


    useEffect(() => {
        initializeAuth();


    }, [dispatch]);


}

export default useAuth

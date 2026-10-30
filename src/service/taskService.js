import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance"



const getTasks = async () => {
    const res = await axiosInstance.get("/tasks");
    return res.data;
};



const deleteTask = async (id) => {
    try {
        const res = await axiosInstance.delete(`/tasks/${id}`);

        const { message, success } = res.data;

        if (success) {
            toast.success(message);
            return true;
        }

        return false;

    } catch (err) {
        console.log(err);
        toast.error("Task delete nahi hua");
        return false;
    }
};


const getTaskById = async (id) => {
    try {
        const res = await axiosInstance.get(`/tasks/${id}`);
        return res.data.task;

    } catch (err) {
        console.log(err);
    }

};

export { getTasks, deleteTask, getTaskById }
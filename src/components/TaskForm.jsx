import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { isEditTask, isOpneTask, refreshTaskList } from '../store/features/task/taskSlice';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { getTaskById, } from '../service/taskService';

const TaskForm = () => {

    const dispatch = useDispatch();

    const { editMode } = useSelector(state => state.task);
    const [taskDetails, setTaskDetails] = useState({});




    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            description: "",
            priority: "Medium",
            status: "Pending",
            dueDate: "",
        },
    });

    const onSubmit = async (data) => {


        // edit Task
        if (editMode) {

            try {
                const res = await axiosInstance.put(`/tasks/${editMode}`, data);
                const { success, message } = res.data;
                if (success) {
                    dispatch(refreshTaskList());
                    toast.success(message);
                    dispatch(isEditTask(null));


                }



            } catch (err) {
                console.log(err.response)
            } finally {

            }


        } else {
            // create Task

            try {
                const res = await axiosInstance.post("/tasks", data);
                const { success, message } = res.data;
                if (success) {

                    dispatch(refreshTaskList());
                    toast.success(message);
                    dispatch(isOpneTask(false));
                }



            } catch (err) {
                console.log(err.response)
            } finally {

            }
        }

    };


    const getTaskDetails = async () => {
        try {
            const res = await getTaskById(editMode);

            console.log("Task Details:", res);

            // API directly task object return kar rahi hai
            setTaskDetails(res);

            // Form ke inputs mein existing data fill karo
            reset({
                title: res.title || "",
                description: res.description || "",
                priority: res.priority || "Medium",
                status: res.status || "Pending",
                dueDate: res.dueDate
                    ? new Date(res.dueDate).toISOString().split("T")[0]
                    : "",
            });

        } catch (error) {
            console.log("Task Details Error:", error);
            toast.error("Task details load nahi hue");
        }
    };



    useEffect(() => {
        if (editMode) {
            getTaskDetails();
        }
    }, [editMode]);









    return (
        <div>
            <div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
                onClick={() => { dispatch(isOpneTask(false)); dispatch(isEditTask(null)) }}
            >
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="task-modal-title"
                    onClick={(e) => e.stopPropagation()}
                    className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#34445a] bg-[#0b1c30] p-6 shadow-2xl"
                >
                    <div className="mb-5 flex items-center justify-between">
                        <h2
                            id="task-modal-title"
                            className="text-xl font-bold text-[#d3e4fe]"
                        >
                            {editMode ? "Edit" : "Create New"} Task
                        </h2>

                        <button
                            type="button"
                            onClick={() => { dispatch(isOpneTask(false)); dispatch(isEditTask(null)) }}
                            aria-label="Close"
                            className="cursor-pointer rounded-lg p-1 text-[#918fa1] hover:bg-[#26364a] hover:text-white"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm text-[#c7c4d8]">
                                Task Title *
                            </label>
                            <input

                                {...register("title", {
                                    required: "Task title is required",
                                })}
                                placeholder="Enter task title"
                                className="w-full rounded-lg border border-[#34445a] bg-[#000f21] px-3 py-2.5 text-sm text-[#d3e4fe] outline-none placeholder:text-[#918fa1] focus:border-[#817bff]"
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-[#ffb4ab]">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm text-[#c7c4d8]">
                                Description
                            </label>
                            <textarea
                                {...register("description")}
                                rows={3}
                                placeholder="Describe the task..."
                                className="w-full rounded-lg border border-[#34445a] bg-[#000f21] px-3 py-2.5 text-sm text-[#d3e4fe] outline-none placeholder:text-[#918fa1] focus:border-[#817bff]"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm text-[#c7c4d8]">
                                    Priority
                                </label>
                                <select
                                    {...register("priority")}
                                    className="w-full cursor-pointer rounded-lg border border-[#34445a] bg-[#000f21] px-3 py-2.5 text-sm text-[#d3e4fe] outline-none focus:border-[#817bff]"
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm text-[#c7c4d8]">
                                    Status
                                </label>
                                <select
                                    {...register("status")}
                                    className="w-full cursor-pointer rounded-lg border border-[#34445a] bg-[#000f21] px-3 py-2.5 text-sm text-[#d3e4fe] outline-none focus:border-[#817bff]"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm text-[#c7c4d8]">
                                Due Date
                            </label>
                            <input
                                type="date"
                                {...register("dueDate", {
                                    required: "Due date is required",
                                })}
                                className="w-full cursor-pointer rounded-lg border border-[#34445a] bg-[#000f21] px-3 py-2.5 text-sm text-[#d3e4fe] outline-none focus:border-[#817bff]"
                            />
                            {errors.dueDate && (
                                <p className="mt-1 text-xs text-[#ffb4ab]">
                                    {errors.dueDate.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 border-t border-[#26364a] pt-4">
                            <button
                                type="button"
                                onClick={() => { dispatch(isOpneTask(false)); dispatch(isEditTask(null)) }}
                                className="cursor-pointer rounded-lg border border-[#34445a] px-4 py-2 text-sm text-[#d3e4fe] hover:bg-[#1b2b3f]"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="cursor-pointer rounded-lg bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6258f5]"
                            >
                                {editMode ? "Edit" : "Create "} Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TaskForm

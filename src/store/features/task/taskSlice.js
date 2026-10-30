import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isToggleTask: false,
    editMode: null,
    refreshTasks: false,
}

const taskSlice = createSlice({
    name: "task",
    initialState,

    reducers: {
        isOpneTask: (state, action) => {
            state.isToggleTask = action.payload;
        },

        isEditTask: (state, action) => {
            state.editMode = action.payload;
        },
        refreshTaskList: (state) => {
            state.refreshTasks = !state.refreshTasks;
        },
    }

});

export const { isOpneTask, isEditTask, refreshTaskList } = taskSlice.actions;

export default taskSlice.reducer;
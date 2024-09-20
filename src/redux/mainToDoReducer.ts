import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ToDoType = {
    isCompleted: boolean;
    task: string;
    id: string;
};
type InitialStateToDo = {
    toDoData: Array<ToDoType>;
    isEditing: boolean,
    taskId: string;
    task: string;
};
const initialState: InitialStateToDo = {
    toDoData: localStorage.getItem('toDoList') ? JSON.parse(localStorage.getItem('toDoList') as string) : [],
    isEditing: false,
    taskId: '',
    task: '',
}
const sliceToDo =  createSlice({
    name: 'toDo/Slice',
    initialState,
    reducers: {
        setToDo(state, action: PayloadAction<ToDoType>){
            return {
                ...state,
                toDoData: state.toDoData.concat(action.payload),
            };
        },
        setCompleteTodo(state, action: PayloadAction<Array<ToDoType>>){
            return {
                ...state,
                toDoData: action.payload,
            };
        },
        setIsEditing(state, action: PayloadAction<{editing: boolean, taskId: string, task: string}>) {
            return {
                ...state,
                isEditing: action.payload.editing,
                taskId: action.payload.taskId,
                task: action.payload.task
            };
        },
    },
});

export const reducerToDo = sliceToDo.reducer;
export const { setToDo, setCompleteTodo, setIsEditing } = sliceToDo.actions;

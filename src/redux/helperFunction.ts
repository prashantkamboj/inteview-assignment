import { ToDoType } from "./mainToDoReducer";

export const setJsonData=  (data: ToDoType) => {
    const dataFLS= localStorage.getItem('toDoList');
    if(dataFLS){
      const jsonData = JSON.parse(dataFLS as string);
      const newJsonData= [...jsonData, data];
      localStorage.setItem('toDoList',  JSON.stringify(newJsonData));
    } else {
      const newJsonData= [data];
      localStorage.setItem('toDoList',  JSON.stringify(newJsonData));
    }
}
export const setJsonArray = (data: Array<ToDoType>) => {
    localStorage.setItem('toDoList',  JSON.stringify(data));
}; 
export const getToDoDataFromLocalStorage = () => {
    const dataFLS = localStorage.getItem('toDoList');
    if (dataFLS){
        return JSON.parse(dataFLS);
    }
    return [];
};
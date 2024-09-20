import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import ComponentAddTodo from './Components/ComponentAddTodo/ComponentAddToDo'
import { RootState } from './redux/store';
import ComponentListToDo from './Components/ComponentListToDo/ComponentListToDo';
import { setCompleteTodo, setIsEditing, ToDoType } from './redux/mainToDoReducer';
import { getToDoDataFromLocalStorage, setJsonArray } from './redux/helperFunction';
import { Checkbox, Container, Typography } from '@mui/material';
import { styles } from './AppStyle';
import { useState } from 'react';

function App() {
  const { toDoData } = useSelector((state: RootState) => state.reducerToDo);
  const [completedTasks, setCompletedTasks] = useState(false);
  const [pendingTodo, setPendingTodo] = useState(false);
  const dispatch = useDispatch();
  const handleOnCheck = (id: string, checked: boolean) => {
    console.log('Running The function', id);
    const newArray = toDoData.map((item) =>({...item, isCompleted: item.id === id ? checked : item.isCompleted}));
    setJsonArray(newArray);
    dispatch(setCompleteTodo(newArray));
  }
  const deleteToDo = (id: string) => {
    const newArray = toDoData.filter((item) => item.id !== id);
    setJsonArray(newArray);
    dispatch(setCompleteTodo(newArray));
  }
  const onEdit = (id: string, task: string) => {
    dispatch(setIsEditing({editing: true, taskId: id, task}))
  };
  const onCompletedChange = (completed: boolean) => {
    if (completed && pendingTodo) {
      setCompletedTasks(completed);
      setPendingTodo(false)
      const allData = getToDoDataFromLocalStorage();
      const newArray = allData.filter((item: ToDoType) => item.isCompleted === true);
      dispatch(setCompleteTodo(newArray));
      return;
    }
    if (completed) {
      setCompletedTasks(completed);
      setPendingTodo(false)
      const newArray = toDoData.filter((item) => item.isCompleted === true);
      dispatch(setCompleteTodo(newArray));
      return;
    }
    setCompletedTasks(false)
    const allData = getToDoDataFromLocalStorage();
    dispatch(setCompleteTodo(allData));
  };
const onPendingChange = (pending: boolean) => {
  if (pending && completedTasks) {
    setPendingTodo(pending);
    setCompletedTasks(false);
    const allData = getToDoDataFromLocalStorage();
    const newArray = allData.filter((item: ToDoType) => item.isCompleted === false);
    dispatch(setCompleteTodo(newArray));
    return;
  }
  if(pending){
    setPendingTodo(pending);
    setCompletedTasks(false);
    const newArray = toDoData.filter((item) => item.isCompleted === false);
    dispatch(setCompleteTodo(newArray));
    return;
  }
  setPendingTodo(false);
  const allData = getToDoDataFromLocalStorage();
    dispatch(setCompleteTodo(allData));
};
  return (
    <>
      <h1>To Do</h1>
      <Container sx={styles.filterContainer}>
        <Checkbox onChange={(_e, completed) => onCompletedChange(completed)} checked={completedTasks}/>
          <Typography>Completed</Typography>
          <Checkbox onChange={(_e, pending) => onPendingChange(pending)} checked={pendingTodo} />
        <Typography>Pending</Typography>
      </Container>
      <ComponentAddTodo />
      {toDoData?.map((item) => (
        <ComponentListToDo
          isChecked={item.isCompleted}
          task={item.task}
          onChecked={handleOnCheck}
          id={item.id}
          onDelete={deleteToDo}
          onEdit={onEdit}
        />
      ))}
    </>
  );
}

export default App

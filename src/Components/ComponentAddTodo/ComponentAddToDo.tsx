import { Button, Container, Input } from "@mui/material";
import { styles } from "./style";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { setCompleteTodo, setIsEditing, setToDo } from "../../redux/mainToDoReducer";
import { setJsonArray, setJsonData } from "../../redux/helperFunction";
import { RootState } from "../../redux/store";

function ComponentAddTodo(){
  const {isEditing, toDoData, taskId, task} = useSelector((state: RootState) => state.reducerToDo);
  const [inputValue, setInputValue] = useState(task);
  const dispatch = useDispatch();
  const handleOnClick = () => {
    if (inputValue === ''){
      alert('Please Enter The Value');
      return;
    }
    if (isEditing){
      handleEditData();
    }else {
      handleAddData()
    }
  };
  const handleAddData = () => {
   
    const data = {
      id: nanoid(),
      task: inputValue,
      isCompleted: false,
    };
    setInputValue('');
    setJsonData(data);
    dispatch(setToDo(data));
  };

  const handleEditData = () => {
    const newArray = toDoData.map((item) => ({...item, task: item.id === taskId ? inputValue : item.task}));
    dispatch(setCompleteTodo(newArray));
    setJsonArray(newArray);
    setInputValue('');
    dispatch(setIsEditing({editing: false, taskId: '', task: ''}));
  };

    return (
        <Container sx={styles.mainContainer}>
          <Input onChange={(e) => setInputValue(e.target.value)} value={inputValue}/>
          <Button variant="contained" className="addButton" onClick={handleOnClick}>{isEditing ? 'Done' : 'Add'}</Button>
        </Container>
    );
}
export default ComponentAddTodo;
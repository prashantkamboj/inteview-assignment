import { Button, Checkbox, Container, Typography } from "@mui/material";
import { styles } from "./style";

type TypePropsListToDo = {
    task: string;
    isChecked: boolean;
    id: string;
    onChecked: (id: string, checked: boolean) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, task: string) => void;
};
function ComponentListToDo({task, isChecked, onChecked, id, onDelete, onEdit}: TypePropsListToDo ) {
    const handleOnCheck = (check: boolean) => {
        onChecked(id, check);
    }
    return (
        <Container sx={styles.mainContainer}>
            <Typography>{task}</Typography>
            <Checkbox checked={isChecked} onChange={(_e,check) => handleOnCheck(check) }/>
            <Button onClick={() => onDelete(id)}>Delete</Button>
            <Button onClick={() => onEdit(id, task)}>Edit</Button>
        </Container>
    );
}
export default ComponentListToDo;
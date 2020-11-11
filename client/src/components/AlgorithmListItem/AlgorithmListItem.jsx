// React
import { Link } from "react-router-dom";
// Material UI
import {
  Divider,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const AlgorithmListItem = ({ title, author, id }) => {
  const handleDelete = (e)=>{
    console.log(id);
  }
  return (
    <div>
      <Divider />
      <ListItem button component={Link} to={`/algorithms/${id}`}>
        <ListItemText primary={title} />
        <ListItemText align="right" secondary={author} />
        {!author ? (
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <EditIcon />
            </IconButton>
            <IconButton value={id} onClick={handleDelete} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        ) : (
          ""
        )}
        {/* {author ? (
          <ListItemText align="right" secondary={author} />
        ) : (
          <>
            <Fab color="primary" aria-label="add">
              <DeleteIcon />
            </Fab>
            <Fab color="secondary" aria-label="edit">
              <EditIcon />
            </Fab>
          </>
        )} */}
      </ListItem>
      <Divider />
    </div>
  );
};

export default AlgorithmListItem;

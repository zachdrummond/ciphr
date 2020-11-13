// React
import { Link } from "react-router-dom";
// File imports
import API from "../../utils/API";
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
import { Stars } from "@material-ui/icons";

const AlgorithmListItem = ({ title, author, id, handleDelete, stars }) => {
  return (
    <div>
      <Divider />
      <ListItem button component={Link} to={`/algorithms/${id}`}>
        <ListItemText primary={title} />
        <ListItemText align="center" secondary={stars} ><Stars/></ListItemText>
        <ListItemText align="right" secondary={author} />
        {!author ? (
          <ListItemSecondaryAction>
            <IconButton
              component={Link}
              to={`/algorithms/edit/${id}`}
              edge="end"
              aria-label="delete"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              value={id}
              onClick={()=>handleDelete(id)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        ) : (
          ""
        )}
      </ListItem>
      <Divider />
    </div>
  );
};

export default AlgorithmListItem;

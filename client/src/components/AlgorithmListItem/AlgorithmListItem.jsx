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

const AlgorithmListItem = ({ title, author, id }) => {
  const handleDelete = (e) => {
    console.log(id);
    API.deleteAlgorithm(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Divider />
      <ListItem button component={Link} to={`/algorithms/${id}`}>
        <ListItemText primary={title} />
        <ListItemText align="right" secondary={author} />
        {!author ? (
          <ListItemSecondaryAction>
            <IconButton
              component={Link}
              to={`/algorithms/${id}/edit`}
              edge="end"
              aria-label="delete"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              value={id}
              onClick={handleDelete}
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

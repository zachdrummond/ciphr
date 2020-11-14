// React
import { Link } from "react-router-dom";
// File imports

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
// import { Stars } from "@material-ui/icons";

const AlgorithmListItem = ({ title, author, id, handleDelete, stars, hashtags }) => {
  return (
    <div>
      <Divider />
      <ListItem button component={Link} to={`/algorithms/${id}`}>
        <ListItemText primary={title} secondary={`StarRating: ${stars}`}/>
        <ListItemText align="right" primary={author} secondary={hashtags} />
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

// React
import { Link } from "react-router-dom";
// Material UI
import { Divider, ListItem, ListItemText } from "@material-ui/core";

const AlgorithmListItem = ({ title, author, id }) => {
  return (
    <div>
      <Divider />
      <ListItem button component={Link} to={`/algorithms/${id}`}>
        <ListItemText primary={title} />
        <ListItemText align="right" secondary={author} />
      </ListItem>
      <Divider />
    </div>
  );
};

export default AlgorithmListItem;

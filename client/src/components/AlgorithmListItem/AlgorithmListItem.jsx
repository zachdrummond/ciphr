import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

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

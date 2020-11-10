import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";

const AlgorithmListItem = ({ title, author, handleClick, id }) => {
  return (
    <div onClick={handleClick} >
      <Divider />
      <ListItem  button component={Link} to={`/api/algorithms/${id}`}>
        <ListItemText  primary={title} />
        <ListItemText  align="right" secondary={author}/> 
      </ListItem>
      <Divider />
    </div>
  );
};

export default AlgorithmListItem;

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const AlgorithmListItem = ({ title, author }) => {
  return (
    <div>
      <Divider />
      <ListItem button>
        <ListItemText  primary={title} />
        <ListItemText align="right" secondary={author}/> 
      </ListItem>
      <Divider />
    </div>
  );
};

export default AlgorithmListItem;

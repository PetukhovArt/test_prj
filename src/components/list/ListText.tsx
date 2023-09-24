import { ListItem, ListItemText } from '@mui/material';

type ListText = {
  title: string;
  main: string | number;
};

const ListText = ({ title, main }: ListText) => {
  return (
    <ListItem>
      <ListItemText primary={title} />
      <span style={{color: 'grey'}}>{main}</span>
    </ListItem>
  );
};

export default ListText;

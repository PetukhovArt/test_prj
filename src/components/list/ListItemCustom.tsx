import { ListItem, ListItemText } from '@mui/material';
import {ReactNode, CSSProperties } from 'react';

type ListItemCustom = {
  title: string | ReactNode;
  children: ReactNode;
  deniedBreakStroke?: boolean;
  style?: CSSProperties;
};

const ListItemCustom = ({ title, style, children}: ListItemCustom) => {

  return (
    <ListItem style={{...style}}>
      <ListItemText primary={title} />
      <div>{children}</div>
    </ListItem>
  );
};

export default ListItemCustom;

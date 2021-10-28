import * as React from 'react';
import './ContactsByRows.css'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function ContactsByRows(props) {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Divider />
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
            <Typography variant="h5" gutterBottom component="div">
              {props.username}{props.email}
            </Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

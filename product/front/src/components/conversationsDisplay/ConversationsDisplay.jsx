import * as React from "react";
import "./ConversationsDisplay.css";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function ConversationsDisplay(props) {
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Divider />
      <nav className = "bgColor">
        <List>
          <a className='list-conv' href={`/${props.user_id}/conversation/${props.id}`}>
            <ListItem disablePadding>
              <ListItemButton>
                <Typography
                  variant='h5'
                  color='primary.dark'
                  component='div'>
                  {props.name}
                </Typography>
              </ListItemButton>
            </ListItem>
          </a>
        </List>
      </nav>
    </Box>
  );
}

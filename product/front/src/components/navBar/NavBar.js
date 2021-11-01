import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography, Link } from "@mui/material";
import { Home, Book, AccountBox } from "@mui/icons-material";

function NavBar(props) {
  console.log(props);
  return (
    <List component='nav'>
      <ListItem component='div'>
        <ListItemText inset>
          <Typography color='inherit' variant='title'>
            <Home startIcon={<Home />} />
            Accueil
          </Typography>
        </ListItemText>

        <ListItemText inset>
          <Typography color='inherit' variant='title'>
            <Link color='inherit' href='./test'>
              <Book startIcon={<Book />} />
              Messages
            </Link>
          </Typography>
        </ListItemText>

        <ListItemText inset>
          <Typography color='inherit' variant='title'>
            <AccountBox startIcon={<AccountBox />} />
            Contacts
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
}

export default NavBar;

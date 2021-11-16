import "./UserHomePage.css";
import "../../components/participantsDisplay/ParticipantsDisplay.css";
import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import BackToTop from "../../components/backToTop/BackToTop";
import ConversationsDisplay from "../../components/conversationsDisplay/ConversationsDisplay";
import HeaderLogout from "../../components/headerLogout/HeaderLogout";
import ContactsDisplay from "../../components/contactsDisplay/ContactsDisplay";

class UserHomePage extends React.Component {
  constructor(props) {
    super(props);
    // Etat du composant
    this.state = {
      conversations: [],
      contacts: [],
      user_id: [],
      username: [],
    };
    this.getConversations = this.getConversations.bind(this);
  }

  componentDidMount() {
    console.log("params: ", this.props.match.params.user_id);
    this.getConversations();
    this.createConvMouseOver();
    this.createContactMouseOver();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user_id !== this.state.user_id) {
      this.setHref();
    }
  }

  getConversations = () => {
    fetch(
      "http://localhost:5000/" +
        this.props.match.params.user_id +
        "/conversation-list"
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (convers_list) => {
          console.log("UserHome/getConversations/convers_list", convers_list);
          console.log(
            "UserHome/getConversations/convers_list",
            typeof convers_list
          );
          if (convers_list["contacts"]) {
            this.setState({
              conversations: convers_list.conversations,
              contacts: convers_list.contacts,
              user_id: convers_list.user_id,
              username: convers_list.username,
             })
          }
          else {
            alert("User not connected")
          }
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  };

  createContactMouseOver() {
    let createContactIcon = document.getElementById("create-contact");
    createContactIcon.addEventListener(
      "mouseover",
      function (event) {
        // on met l'accent sur la cible de mouseover
        let div = (document.getElementById("create-contact-msg").textContent =
          "Créer un contact");

        createContactIcon.addEventListener("mouseleave", function (e) {
          let div = (document.getElementById("create-contact-msg").textContent =
            "");
        });
      },
      false
    );
  }

  createConvMouseOver() {
    let createIcon = document.getElementById("create-conv");
    createIcon.addEventListener(
      "mouseover",
      function (event) {
        // on met l'accent sur la cible de mouseover
        let div = (document.getElementById("create-mssg").textContent =
          "Créer une conversation");

        createIcon.addEventListener("mouseleave", function (e) {
          let div = (document.getElementById("create-mssg").textContent = "");
        });
      },
      false
    );
  }

  setHref = () => {
    document.getElementById(
      "cr-cont"
    ).href = `/${this.state.user_id}/create-contact`;
    document.getElementById(
      "cr-conv"
    ).href = `/${this.state.user_id}/create-conversation`;
  };

  // Rendu React du composant
  render() {
    return (
      <>
        <HeaderLogout
          userName={this.state.username}
          user={this.state.user_id}
        />
        <BackToTop>
          <Fab color='secondary' size='large' aria-label='Haut de page'>
            <KeyboardArrowUp />
          </Fab>
        </BackToTop>
        <Box
          id='back-to-top-anchor'
          component='main'
          sx={{
            display: "flex",
            fontSize: "1.6rem",
            minHeight: "100vh",
          }}>
          <Box
            sx={{ pt: "1.5rem" }}
            color='common.white'
            bgcolor='secondary.main'>
            <Typography
              variant='h4'
              component='h2'
              fontWeight='700'
              letterSpacing='0.2rem'
              color='common.white'
              textAlign='center'>
              CONTACTS
              <Divider
                sx={{
                  bgcolor: (theme) => theme.palette.common.white,
                  mt: 3,
                }}
                style={{
                  borderBottomWidth: 5,
                  // borderRadius: 2,
                  height: 2,
                }}
              />
            </Typography>
            {this.state.contacts.map((member, i) => {
              return (
                <ContactsDisplay
                  key={i}
                  id={member.contact_id}
                  username={member.username}
                  email={member.email}
                />
              );
            })}
            <Box
              sx={{
                position: "fixed",
                bottom: "2.5rem",
                left: "6rem",
              }}>
              <a id='cr-cont' href={`/${this.state.user_id}/create-contact`}>
                <img
                  id='create-contact'
                  src='/creer_un_contact_1.png'
                  alt='Cliquer pour créer un contact'
                />
              </a>
              <div style={{ color: "#000" }} id='create-contact-msg'></div>
            </Box>
          </Box>

          <Box
            sx={{
              pt: "1.5rem",
              // pl: "1.5rem",
              alignSelf: "stretch",
              flexGrow: 1,
              bgcolor: "#C4C4C4",
            }}
            color='common.white'
            textAlign='center'>
            <Typography
              variant='h4'
              component='h2'
              fontWeight='700'
              letterSpacing='0.2rem'
              ml='1rem'
              color='primary.main'>
              CONVERSATIONS
            </Typography>
            <Divider
              sx={{
                bgcolor: (theme) => theme.palette.common.white,
                mt: 3,
              }}
              style={{
                borderBottomWidth: 5,
                height: 2,
              }}
            />

            {this.state.conversations.map((conv, i) => {
              return (
                <ConversationsDisplay
                  key={i}
                  id={conv.id}
                  name={conv.name}
                  user_id={this.state.user_id}
                />
              );
            })}
            <div id='create-conv-container'>
              <a id='cr-conv' href=''>
                <img
                  id='create-conv'
                  src='/creer_une_conversation-2.png'
                  alt='Cliquer pour créer une conversation'
                />
              </a>
              <div style={{ color: "#000" }} id='create-mssg'></div>
            </div>
          </Box>
        </Box>
      </>
    );
  }
}

export default UserHomePage;

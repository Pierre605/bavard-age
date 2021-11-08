import React from "react";
import { withRouter } from "react-router-dom";
import HeaderLogout from "../../components/headerLogout/HeaderLogout";
import "./CreateConversation.css";
import ContactsSelect from "../../components/contactsSelect/ContactsSelect";
import NavBar from "../../components/navBar/NavBar.js";


class CreateConversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      selected_contacts: [],
      selected_contacts_string: '',
    }

    this.createConversation = this.createConversation.bind(this);
  }

  handleAddContact = (childData) =>{
    let L = this.state.selected_contacts
    L.push(childData)
    this.setState({selected_contacts: L})
    let string = this.addAdressSpace()
    this.setState({selected_contacts_string: string})
  }

  handleRemoveContact = (childData) =>{
    let L = this.state.selected_contacts
    if (L.includes(childData)) {
      let filter = L.filter(email => email !== childData)
      this.setState({selected_contacts: filter, selected_contacts_string: String(filter).split(',').join(', ')})
    }
  }

  addAdressSpace = () => {
    let L = []
    let input = this.state.selected_contacts
      let string = new String(input)
      let formed_string = string.split(',').join(', ')
      console.log(formed_string)
      return formed_string
  }

  componentDidMount() {
    this.getContacts()
  }

  createConversation(ev) {
    ev.preventDefault();

    const data = new FormData();
    if (this.emails.value && this.emailsmano.value == '') {
      data.append('email', this.emails.value);
    }
    else if (this.emailsmano.value && this.emails.value == '') {
      data.append('email', this.emailsmano.value);
    }
    data.append("name", this.name.value);

    fetch("http://localhost:5000/create_conversation", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        let created_conv = data;
        console.log(created_conv);
        console.log(typeof created_conv);
        if (created_conv.includes("conversation_id")) {
          this.props.history.push("/conversation-list");
        } else {
          alert('Adresse(s) email non reconnues')
        }
        // window.location.reload(false);
      });
  }

  getContacts = () => {
    fetch('http://localhost:5000/conversation-list')
    .then(response => {
      return(
        response.json()
    )})
    .then(convers_list => {
      console.log('UserHome/getConversations/convers_list', convers_list)
      // Sauvegarde de l'état du composant avec le résultat de la réponse parsée de la DB
      this.setState({
        contacts : convers_list.contacts
      });
          }, (error) => {
            this.setState({
              error
            });
          }
      )
  };


  render() {
    return (
      <>    
        <HeaderLogout />
        <div id="div-aside">
          <div className="side-bar-not-fixed">
            <section>
              <div>Contacts:</div>             
                {this.state.contacts.map((member) => {
                  return (
                    <ContactsSelect contacts={member} parentCallbackAdd={this.handleAddContact} parentCallbackRemove={this.handleRemoveContact}/>
                  )
                })}
              <div id="create-contact-container">
                <a href='http://localhost:3000/create-contact'><img id="create-contact" src="/convers-icon.png"/></a>
                <div id="create-contact-msg"></div>
              </div> 
            </section>                         
          </div> 
          <form onSubmit={this.createConversation}>
            <div className='flex'>
              <div className='input-style'>          
                <label for=''>Selectionnez parmi vos contacts un ou plusieurs participant(s) : </label>
                <input
                  id='emails'
                  className='input'
                  type='text'
                  ref={(ref) => {
                    this.emails = ref;
                  }}
                  value={this.state.selected_contacts_string}
                />
                <label for=''>Ou bien saisissez une ou plusieurs adresses emails de participant(s) : </label>              
                <input id="emails-mano" class="input" type="text" ref={(ref) => { this.emailsmano = ref; }} />              
                <div id='emails-syntaxe-requirement'>
                  Si plusieurs adresses, n'oubliez pas de les séparer par une virgule et un espace (entre chaque email saisi) :
                  julien@blabla.fr, laura@blabla.fr, ...
                </div>
              </div>
              <div className='input-style'>
                <label for=''>Nom de la conversation : </label>
                <input
                  type='text'
                  ref={(ref) => {
                    this.name = ref;
                  }}
                  required></input>
              </div>
            </div>
            <div>
              <button>Créer une conversation</button>
            </div>
          </form>
        </div>        
      </>
    );
  }
}

export default withRouter(CreateConversation);

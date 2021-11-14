import React from 'react';
import {withRouter} from 'react-router-dom';
import HeaderLogout from '../../components/headerLogout/HeaderLogout';
import './CreateConversation.css'
import ContactsSelect from '../../components/contactsSelect/ContactsSelect';

class CreateConversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      username: [],
      selected_contacts: [],
      selected_contacts_string: '',
      selected_usernames : [],
      selected_usernames_string: '',
    }

    this.createConversation = this.createConversation.bind(this);
  }

  handleAddContact = (childData, childData2) =>{
    let L = this.state.selected_contacts
    L.push(childData)
    let L2 = this.state.selected_usernames
    L2.push(childData2)
    
    this.setState({selected_contacts: L, 
      selected_contacts_string: String(L).split(',').join(', '),
      selected_usernames: L2,
      selected_usernames_string: String(L2).split(',').join(', ')
      })
}

  handleRemoveContact = (childData1, childData2) =>{
    let L = this.state.selected_contacts
    let L2 = this.state.selected_usernames
    if (L.includes(childData1)) {
      let filter = L.filter(email => email !== childData1)
      this.setState({selected_contacts: filter, selected_contacts_string: String(filter).split(',').join(', ')})
    }
    if (L2.includes(childData2)) {
      let filter2 = L2.filter(user_name => user_name !== childData2)
      this.setState({selected_usernames: filter2, selected_usernames_string: String(filter2).split(',').join(', ')})
    }
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

    data.append('name', this.name.value)


    fetch('http://localhost:5000/' + this.props.match.params.user_id + '/create_conversation', {
    method: 'POST',
    body: data,
  })
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    let created_conv = data
    console.log(created_conv)
    console.log(typeof created_conv)
    if (created_conv.includes('conversation_id')) {
      this.props.history.push('/' + this.props.match.params.user_id +  '/conversation-list')
    }
    else {
      alert('Adresse(s) email non reconnues')
    }
  });
  }

  getContacts = () => {
    fetch('http://localhost:5000/' + this.props.match.params.user_id + '/conversation-list')
    .then(response => {
      return(
        response.json()
    )})
    .then(convers_list => {
      console.log('UserHome/getConversations/convers_list', convers_list)
      this.setState({
        contacts : convers_list.contacts,
        username: convers_list.username,
      });
          }, (error) => {
            this.setState({
              error
            });
          }
      )
  };

  setNameValue = (ev) => {
    ev.preventDefault()
    let name_input = document.getElementById('name-input')
    if (name_input.value !== this.state.username + ', ' + this.state.selected_usernames_string) {
    name_input.value = this.state.username + ', ' + this.state.selected_usernames_string
    }
    else {
      name_input.value = ''
    }
  }



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
        <form className="form" id="form1" onSubmit={this.createConversation}>
          <div className="flex2">
              <div className="input-style-2">
                <label for="">Selectionnez parmi vos contacts: </label>
                <input id="emails" className="input2" type="text" ref={(ref) => { this.emails = ref; }} value={this.state.selected_contacts_string}/>
                <div>Ou bien saisissez une ou des adresses emails: </div>
                <input id="emails-mano" className="input2" type="text" ref={(ref) => { this.emailsmano = ref; }} />
                <div className="requir" id="emails-syntaxe-requirement">Si plusieurs adresses, les séparer par des virgule espace: julien@blabla.fr, laura@blabla.fr, ...</div>
              </div>
              <div className="input-style-2">
                <label for="">Nom de la conversation: </label>
                <button onClick={this.setNameValue}>nom par défault</button>
                <input id="name-input" type="text" className="input2" ref={(ref) => { this.name = ref; }} />
              </div>
          </div>
          <div>
          <button type="submit" form="form1" className="button-form">Créer conversation</button>
          </div>
        </form>
        </div>
      </>
      );
  }
}

export default withRouter(CreateConversation);
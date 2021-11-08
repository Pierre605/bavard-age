import React from 'react';
import './DeleteMessage.css'


export default class DeleteMessage extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            conv_id: "",
        }
        this.handleDelete = this.handleDelete.bind(this)
    }
    
    

    openSelect = () => {
        this.setState({conv_id: this.props.conversation})
        // let my_messages = document.getElementsByClassName("user-messages")
        // console.log(my_messages)
        let expanded = this.state.expanded

        let my_messages2 = document.getElementsByClassName("checkbox")
        console.log(my_messages2)
        if (expanded == false) {
            let L = []
        for (let i=0; i < my_messages2.length; i++) {
            L.push(my_messages2[i])
        }

        for (let j=0; j < L.length; j++) {
            L[j].style.display = "block"
        }

        let del_button = document.getElementById("delete")
        del_button.style.display = "block"
        document.getElementById('open').textContent = "Annuler"
        this.setState({expanded: true})
        }

        else {
            let L = []
        for (let i=0; i < my_messages2.length; i++) {
            L.push(my_messages2[i])
        }

        for (let j=0; j < L.length; j++) {
            L[j].style.display = "none"
        }

        let del_button = document.getElementById("delete")
        del_button.style.display = "none"
        document.getElementById('open').textContent = "Supprimer un message"
        this.setState({expanded: false})
        }
    }

    handleDelete = () => {
        let form = document.querySelectorAll('input')
        console.log(form)
        let data = new FormData()
        for (let i=0; i < form.length; i++) {
            if (form[i].checked == true) {
                data.append('id', form[i].value)
            }
        }
        console.log(data)
        console.log(this.state.conv_id)
        fetch("http://localhost:5000/conversation/" + this.state.conv_id, {
        method : 'PUT',
        body: data,
    })
        .then((response) => {
          return response.json();
        })

    }

    scrollBottom = (event) => {
        window.scrollTo(0,document.getElementById("background").scrollHeight)
      }
    
    render() {


    return (
        <div className="rm-button">
            <button onClick={this.scrollBottom}>⬇️</button>
            <button onClick={this.handleDelete} id="delete">Supprimer</button>
            <button id="open" onClick={this.openSelect}>Supprimer un message</button>
        </div>
    )
}}
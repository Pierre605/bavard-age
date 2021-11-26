import React from 'react';
import './DeleteMessage.css'
import { useState, useEffect } from 'react';


export default function DeleteMessage(props)  {

    const [expanded, setExpanded] = useState(false)
    const [conv_id, setConv] = useState([])
    const [user_id, setUser] = useState([])
    const [count, setCount] = useState(10)
    // this.handleDelete = this.handleDelete.bind(this)
    
    useEffect(() => {
        setCount(count * 0.5)
      }, []
      );
      useEffect(() => {
        setConv(props.conversation);
        setUser(props.user);
      })

    const openSelect = () => {
        // let my_messages = document.getElementsByClassName("user-messages")
        // console.log(my_messages)
        console.log("user_id: ", {user_id})

        let my_messages2 = document.getElementsByClassName("checkbox")
        console.log(my_messages2)
        if (expanded === false) {
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
        setExpanded(true)
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
        setExpanded(false)
        }
    }

    const handleDelete = () => {
        let form = document.querySelectorAll('input')
        console.log(form)
        let data = new FormData()
        for (let i=0; i < form.length; i++) {
            if (form[i].checked === true) {
                data.append('id', form[i].value)
            }
        }
        console.log(data)
        fetch(`http://localhost:5000/${user_id}/conversation/${conv_id}`, {
        method : 'PUT',
        body: data,
    })
        .then((response) => {
          return response.json();
        })
        .then(() => {
            props.refresh()
            openSelect()
        })

    }

    const scrollBottom = (event) => {
        window.scrollTo(0,document.getElementById("background").scrollHeight)
      }


    return (
        <div className="rm-button">
            <button onClick={() => scrollBottom()}>⬇️</button>
            <button onClick={() => handleDelete()} id="delete">Supprimer</button>
            <button id="open" onClick={() => openSelect()}>Supprimer un message</button>
        </div>
    )
}
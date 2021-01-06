import React, { Component } from 'react';
import CreateContact from './CreateContact';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import { Route } from 'react-router-dom';


class App extends Component {

  state = {
     contacts :[
    //   {
    //     id:'tyler',
    //     name:'Tyler McGinisie',
    //     handle: '@tylerMc',
    //     avatarURL: 'http://localhost:5001/tyler.jpg'
    //   },
    
    //   {
    //     id:'jon',
    //     name:'Jon Snow',
    //     handle: '@jonsnow',
    //     avatarURL: 'http://localhost:5001/richard.jpg'
    //   }, 
    //   {
    //    id: "karen",
    //    name: "Karen Isgrigg",
    //    handle: "@karen_isgrigg",
    //    avatarURL: "http://localhost:5001/karen.jpg"
    //   }
    ]
  }

  //api call for the contacts from ContactsAPI 
  componentDidMount(){
    ContactsAPI.getAll().then((contacts) => {
      this.setState(() => ({contacts}))
    })
  }
  
removeContact = (contact) => {
    this.setState((currentState) => ({
          contacts: currentState.contacts.filter((c) => {
            console.log(`${contact.id} was removed`);
            return c.id !== contact.id
            
          })
    }))
  ContactsAPI.remove(contact)  
}

localcreateContact = (contact) => {
  this.setState((currentState)=> ({
    contacts: currentState.contacts.concat([contact])
  }))
}


createContact = (contact) => {
  ContactsAPI.create(contact)
  .then((contact)=> {
    this.setState((currentState)=> ({
      contacts: currentState.contacts.concat([contact])
    }))
  })
}

  render() {
    return (
      <div>
        {/* Below, I am passing the contact array array as a prop into the component */}
        
        <Route exact path = '/' render = {() => (
        <ListContacts 
        contacts={this.state.contacts}
        onDeleteContact = {this.removeContact}
        />
    )}/>
        <Route path = '/create' render={({history})=>(
         <CreateContact 
         onCreateContact = {(contact)=>{
           this.localcreateContact(contact)
          history.push('/')
          }} /> 
        )}
       />
      </div>
    );
  }
}

export default App;

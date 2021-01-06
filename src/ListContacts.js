import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';



class ListContacts extends Component {
//proptypes let you specify the type of prop that you will be passing into your compneont throughout your application
    static propTypes = { 
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }
//creating a blank state for query that is called when a user inputs the text into the input form field 

//it is an empty query by default
    state = {
        query:''
    }

//updating the state of the query that is called when a user inputs the text into the input form field 
    updateQuery = (query) => {
        this.setState (() => ({
            query: query.trim()
        }))
    }

    clearQuery = () => {
        this.updateQuery('')
    }

 render() {


    //to update the UI, we stick the input form field onm the component state. 
    //Whenever the compneont state chnages, its going to casue a re-render. This is what is called CONTROL COMPONENT

//destruturing

        const {query} = this.state
        const {contacts, onDeleteContact} = this.props

//filter contacts vased on what is in the input field 
    
        const showContacts = query === '' ? contacts : contacts.filter((c) => (
            c.name.toLowerCase().includes(query.toLowerCase())
        ))

     return (
                <div className= 'list-contacts'>
                    <div className='list-contacts-top'>
                    <input className= 'search-contacts' 
                        type= 'text' 
                        placeholder='Search Contacts' 
                        value= {query}  
                        onChange = {(event) => this.updateQuery(event.target.value)} 
                    />
                    <Link to = '/create' 
                    className = 'add-contact'> Add Contact</Link> 
                </div>   


                {/* display the number of records being showed to the user */}
            {showContacts.length !== contacts.length && (
                <div className='showing-contacts'>
                    <span> showing {showContacts.length} of {contacts.length} </span>
                    <button onClick ={this.clearQuery}> Show all</button>
                    
                </div>
            )}


            <ol className= 'contact-list'> 
                {showContacts.map((contact) => ( //mapping through the showContacts to return the list of profile
                <li key = {contact.id} className='contact-list-item'>
                    <div 
                        className='contact-avatar'
                        style={{
                        backgroundImage: `url(${contact.avatarURL})`
                    }}>  
                    </div>

                    <div className = 'contact-details'>
                        <p>{contact.name}</p>
                        <p>{contact.handle}</p>     
                    </div>

                    <button className='contact-remove' onClick = {() => onDeleteContact(contact)} >
                        Remove
                    </button>    
                </li>
            ))}
            </ol>
        </div>
        
     )
 }    
}

export default ListContacts
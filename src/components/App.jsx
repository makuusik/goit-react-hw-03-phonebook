import React, { Component } from 'react';
import ContactForm from './Contact/ContactForm';
import ContactList from './Contact/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (!name || !number) {
      return;
    }

    if (this.state.contacts.some(item => item.name === contact.name)) {
      alert(`Contact with name "${contact.name}" already exists!`);
      return;
    }

    this.setState(
      prevState => ({
        contacts: [...prevState.contacts, contact],
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
  };

  deleteContact = id => {
    this.setState(
      prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;

const path = require('path');
const fs = require('fs/promises');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, "/db/contacts.json");


async function listContacts() {
    try{
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        return contacts;
    }
    catch(err){
        console.log(err);
    }
}
  
async function getContactById(contactId) {
    try{
        const contacts = await listContacts();
        const result = contacts.find(item => item.id === contactId.toString());
        if(!result){
            return null;
        }
        return result;
    }
    catch(err){
        console.log(err);
    }
  }
  
 async function removeContact(contactId) {

    try{
        const contacts = await listContacts();
        const index = contacts.findIndex(item => item.id === contactId.toString());
        if(index === -1){
            throw new Error(`Contact with id: ${contactId} not found`);
        }
        const contact = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return contact[0];
    }
    catch(err){
        console.log(err);
    }
  }
  
 async function addContact(name, email, phone) {
    try{
        const contacts = await listContacts();
        const newItem = {
            name, 
            email,
            phone,
            id: v4()
        }
        contacts.push(newItem);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return newItem.id;
    }
    catch(err){
        console.log(err);
    }
  }


  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
  }
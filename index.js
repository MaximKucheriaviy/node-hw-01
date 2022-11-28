const contacts = require('./contacts.js');
const yargs = require('yargs');

const {argv} = yargs(process.argv);

async function invokeAction({action, id, name, email, phone}){
    switch (action) {
        case "list":
            try{
                const result = await contacts.listContacts();
                console.log(result);
            }
            catch(err){
                console.log(err);
            }
        break;

        case "get":
            try{
                const result = await contacts.getContactById(id);
                console.log(result);
            }
            catch(err){
                console.log(err);
            }
        break;

        case "add":
            try{
                const id = await contacts.addContact(name, email, phone);
                console.log(`Contact ${name} added with id: ${id}`);
            }
            catch(err){
                console.log(err);
            }
        break;

        case "remove":
            try{
                const result = await contacts.removeContact(id);
                console.log(`Contact ${result.name} removed`);
            }
            catch(err){
                console.log(err);
            }
        break;

        default:
        console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
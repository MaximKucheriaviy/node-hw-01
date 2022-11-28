const contacts = require('./contacts.js');

(async () => {
    const listOfContacts = await contacts.getContactById('fa11f935-8696-42ce-9889-c1987fd349aa');
    console.log(listOfContacts); 
})();
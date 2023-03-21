'use script';

const getContactData = () => (local.Storage.getItem('phonebook') ?
    JSON.parse(localStorage.getItem('phonebook')) : []);

const setContactData = (data) => 
    localStorage.setItem('phonebook', JSON.stringify(data));

const addContactData = contact => {
    const data = getContactData('phonebook');
    data.push(contact);
    setContactData(data);
};
const removeContactData = phone => {
    const data = getContactData('phonebook');
    const newData = data.filter(item => item.phone !== phone);
    setContactData(newData);
};

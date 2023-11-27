const contactProcessing = require('./contactProcessing') // дії з контактами
const userProcessing = require('./userProcessing')// дії з користувачем


// обробка запитів для роботи з контактами
const getAllContacts = contactProcessing.getAllContacts
const getContactById =  contactProcessing.getContactById
const newContact =  contactProcessing.newContact
const deleteContact = contactProcessing.deleteContact
const updatedContactById = contactProcessing.updatedContactById
const favoritStatus = contactProcessing.favoritStatus

// обробка запитів для роботи з користувачами
const userRegister = userProcessing.register;
const userLogin = userProcessing.login
const userLogout = userProcessing.logout
const corentUserData = userProcessing.corentUserData
const updateAvatar = userProcessing.updateAvatar
const verify = userProcessing.verify

module.exports = {
    getAllContacts,
    getContactById,
    newContact,
    deleteContact,
    updatedContactById,
    favoritStatus,
    userRegister,
    userLogin,
    userLogout,
    corentUserData,
    updateAvatar,
    verify,
}

const data = require('./MOCK_DATA.json');

module.exports = {
    getUsers: () => data,

    getUser: (id) => {
        let identificador = Number(id);
        let user = data.filter( (person) => person.id === identificador);
        return user;
    },

    createUser: (dataUser) => {
        let newUser = {
            id: data.length + 1,
            ...dataUser,
        }
        data.push(newUser);
        
        return newUser;
    },

    updateUser: ({id, input}) => {
        
        let identificador = Number(id)
        
        let user = data.findIndex((person) => person.id === identificador);
        if(user === -1) return false;
        
        data[user] = {
            ...data[user],
            ...input
        }
        return data[user];
    },

    deleteUser: (id) => {
        let idUser = Number(id);
        let eliminar = data.findIndex((identificador) => identificador.id === idUser);
        data.splice(eliminar, 1);
        return true;
    }
};
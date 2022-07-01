const users = require('../database/models/init-models').initModels().users;
const uuid =require('uuid')


const registerNewUser = async (data, hashPassword) =>{
    const id = uuid.v4()
    const newUser = await users.create({
        id,
        ...data,
        password: hashPassword
    })
    return newUser
}

const getMyUserByEmail = async (email) => {
    const myUser = await users.findOne({
        where:{
            email
        }
    })
    return myUser
}
module.exports = {
    registerNewUser,
    getMyUserByEmail
}
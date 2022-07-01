const bcrypt = require('bcrypt')

const hashPassword = (plainPassword) =>{
    return bcrypt.hashSync(plainPassword, 15)
}

const comparePassword = (planePassword, hashPassword) =>{
    return bcrypt.compareSync(planePassword, hashPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}
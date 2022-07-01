const router = require('express').Router()
const passport = require('passport')
require('../tools/auth.passport')(passport)
const http = require('./users.http')

router.route('/users')
    .get(http.getAllUsers)

router.route('/users/me')
    .get(passport.authenticate('jwt', {session: false}), http.getMe)

router.route('/users/:uuid')
    .get(http.getOneUser)
    .put(passport.authenticate('jwt', {session: false}), http.updateUser)
    .delete(passport.authenticate('jwt', {session: false}), http.deleteUser)
    //.delete()



exports.router = router
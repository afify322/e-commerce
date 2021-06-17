const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {user,userById,signUp,deleteUser,update,login}=require('../controller/users')

router.get(`/`,user)

router.get('/:id',userById)

router.post('/',signUp)

router.put('/:id',update)

router.post('/login',passport.authenticate('local'),login);



router.delete('/:id',deleteUser)




module.exports =router;
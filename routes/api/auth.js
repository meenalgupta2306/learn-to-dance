const {Router} = require('express');
const AuthController = require ('../../controllers/AuthController');

const router=Router()

router.post('/signup',AuthController.signup)
router.post('/login',AuthController.login)
router.get('/logout/:id',AuthController.logout)

module.exports= router
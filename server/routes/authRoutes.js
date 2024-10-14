const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')
const {profileStg} = require('../helpers/multer')


router.post('/signup',authController.doUserSignUp);
router.post('/login',authController.doUserLogin);
router.patch('/profileImage',profileStg.single('image'),authController.uploadImage);


module.exports = router ;
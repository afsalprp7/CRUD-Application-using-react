const express = require('express');

const router = express.Router() ;
const adminController = require('../controller/adminController');


router.get('/adminContent',adminController.getAdminHome);
router.get('/editUser/:id',adminController.getEdituser);
router.patch('/doEditUser/:id',adminController.doEditUser);
router.delete('/deleteUser/:id',adminController.deleteUser);
router.post('/searchUser',adminController.searchUser);



module.exports = router ;
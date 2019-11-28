const express = require('express');
const {check} = require('express-validator');

const router = express.Router();

const AdminUser = require('../../controllers/admin/user');

const validate = require('../../middlewares/validate');
const { grantAccess} = require('../../middlewares/permission');

//INDEX
// router.get('/', permission('read:users'), AdminUser.index);
router.get('/',  grantAccess('readAny', 'profile'), AdminUser.index);
// router.get('/create', permission('create:users'), AdminUser.create);

//STORE
// router.post('/', permission('create:users'), AdminUser.store);
router.post('/', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('username').not().isEmpty().withMessage('You username is required'),
    check('firstName').not().isEmpty().withMessage('You first name is required'),
    check('lastName').not().isEmpty().withMessage('You last name is required')
], validate,  grantAccess('readAny', 'profile'),  AdminUser.store);

//SHOW
// router.put('/:id', permission('update:users'), AdminUser.show);
router.put('/:id',  AdminUser.show); //usrt can view other info if they are logged in

//UPDATE
// router.put('/:id',permission('update:users'), AdminUser.update);
router.put('/:id',  grantAccess('updateAny', 'profile'), AdminUser.update);

//DELETE
// router.delete('/:id', permission('delete:users'), AdminUser.destroy);
router.delete('/:id',  grantAccess('deleteAny', 'profile'), AdminUser.destroy);


module.exports = router;
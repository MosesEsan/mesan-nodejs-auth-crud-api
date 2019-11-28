const express = require('express');
const {check} = require('express-validator');

const router = express.Router();

const Product = require('../controllers/product');

const validate = require('../middlewares/validate');
const { grantAccess} = require('../middlewares/permission');

//INDEX
router.get('/', Product.index);

//STORE
router.post('/', [
    check('name').not().isEmpty().withMessage('Product name is required'),
    check('category').not().isEmpty().withMessage('Product category is required'),
    check('quantity').not().isEmpty().withMessage('Quantity is required'),
    check('cost').not().isEmpty().withMessage('Product cost is required'),
    check('price').not().isEmpty().withMessage('Selling price is required')
], validate,  Product.store);

//SHOW
router.put('/:id',  Product.show);

//UPDATE
router.put('/:id', Product.update);

//DELETE
router.delete('/:id', Product.destroy);


module.exports = router;



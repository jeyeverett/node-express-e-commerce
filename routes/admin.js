const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Middleware
const {
    isLoggedIn
} = require('../middleware/is-auth');

const {
    validateProduct
} = require('../middleware/is-valid');

//Controllers
const { 
    getProductAdd, 
    postProductAdd,
    getProducts,
    getProductEdit,
    postProductEdit,
    deleteProduct
} = require('../controllers/admin')

//CREATE
router.get('/add-product', isLoggedIn, getProductAdd);
router.post('/add-product', 
    isLoggedIn, 
    validateProduct,
    postProductAdd);

//READ
router.get('/admin-products', isLoggedIn, getProducts);

//UPDATE
router.get('/edit-product/:productId', isLoggedIn, getProductEdit);
router.post('/edit-product', 
    isLoggedIn, 
    validateProduct, 
    postProductEdit);

//DELETE
router.post('/delete-product', isLoggedIn, deleteProduct);

module.exports = router;
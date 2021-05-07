const Product = require('../models/product');

// READ
const getProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.render('admin/admin-products', 
            { 
                pageTitle: 'Admin | Products', 
                products: products, 
                path: '/admin/admin-products',
                isAuthenticated: req.session.isLoggedIn,
                csrfToken: req.csrfToken()
            });
        })
        .catch(err => console.log(err));
}

// CREATE
const getProductAdd = (req, res) => {
    res.render('admin/edit-product', 
    { 
        pageTitle: 'Admin | Add Product', 
        path: '/admin/add-product',
        edit: false,
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
    });
}

const postProductAdd = (req, res) => {
    const { title, price, imageUrl, description } = req.body;
    const product = new Product({ title, price, description, imageUrl, userId: req.user });
    product.save()
        .then(() => res.redirect('/admin/admin-products'))
        .catch(err => console.log(err));
}

// UPDATE
const getProductEdit = (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) return res.redirect('/');
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            product ?
                res.render('admin/edit-product.ejs', 
                { 
                    pageTitle: 'Admin | Edit Product', 
                    path: '/admin/edit-product',
                    edit: editMode,
                    product
                })
                :
                res.status(401).redirect('/'); //Change later to redirect to error page
        })
        .catch(err => console.log(err));
}

const postProductEdit = (req, res) => {
    const { title, price, description, imageUrl, id } = req.body;
    Product.findById(id)
        .then(product => {
            product.title = title;
            product.price = price;
            product.description = description;
            product.imageUrl = imageUrl;
            return product.save();
        })
        .then(() => res.redirect('/admin/admin-products'))
        .catch(err => console.log(err));
}

// DELETE
const deleteProduct = (req, res) => {
   Product.findByIdAndRemove(req.body.id)
        .then(() => req.user.deleteFromCart(req.body.id))
        .then(() => res.redirect('/admin/admin-products'))
        .catch(err => console.log(err));
}



module.exports = {
    getProductAdd,
    postProductAdd,
    getProducts,
    getProductEdit,
    postProductEdit,
    deleteProduct
}
const Product = require('../models/productModel');
const { getPostData } = require('../utils');

//!get all products
//!get/api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findALL();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

//*get single product
//* route-get/api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findByID(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'product not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { name, description, price } = JSON.parse(body);

    const product = {
      name,
      description,
      price,
    };

    //!await is required as func is returning a promise,,then only result will come not empty

    const newProduct = await Product.create(product);

    console.log('new product in controller', JSON.stringify(newProduct));

    res.writeHead(201, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(req, res, id) {
  try {
    const product = await Product.findByID(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'product not found' }));
    } else {
      const body = await getPostData(req);

      const { name, description, price } = JSON.parse(body);

      const productData = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
      };

      //!await is required as func is returning a promise,,then only result will come not empty

      const updateProduct = await Product.update(productData, id);

      console.log('new product in controller', JSON.stringify(updateProduct));

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify(updateProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

//*delete single product
//* route-get/api/product/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findByID(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'product not found' }));
    } else {
      await Product.remove(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `${id}  removed successfully` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

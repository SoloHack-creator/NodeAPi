let products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');

function findALL() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findByID(id) {
  return new Promise((resolve, reject) => {
    //* return is required while using {}
    const product = products.find((product) => {
      return product.id === id;
    });
    console.log(product);

    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };

    console.log('new product in Model', newProduct);
    products.push(newProduct);
    writeDataToFile('./data/products.json', products);
    resolve(newProduct);
  });
}

function update(product, id) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };

    console.log('new product in Model', products[index]);

    writeDataToFile('./data/products.json', products);
    resolve(products[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id);
    writeDataToFile('./data/products.json', products);
    resolve();
  });
}
module.exports = { findALL, findByID, create, update, remove };

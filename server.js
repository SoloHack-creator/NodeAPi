const http = require('http');
const {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./controllers/productController');

//!status code 300-redirects 400-not found

const server = http.createServer((req, res) => {
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'text/html');
  //   res.write('<h1>Hello World</h1>');
  //*get product
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3];
    console.log('id', id);
    getProduct(req, res, id);
  } //*add new product
  else if (req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res);
  }
  //* Update product
  else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    console.log('id', id);
    updateProduct(req, res, id);
  }
  //*delete
  else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3];
    console.log('id', id);
    deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server runing at ${PORT} \u2601  \u2600`);
});

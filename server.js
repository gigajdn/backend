const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'img/' });
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/img', express.static(path.join(__dirname, 'img')));

let products = [];

// Create a product
app.post('/api/products', upload.single('image'), (req, res) => {
  const { name, phone } = req.body;
  const image = req.file;

  // Handle image processing (e.g., saving to disk or cloud storage)
  if (image) {
    const ext = path.extname(image.originalname); // Get the file extension
    const filename = `img/${products.length + 1}${ext}`; // Generate the filename
    const imagePath = path.join(__dirname, filename);
    fs.rename(image.path, imagePath, (err) => {
      if (err) {
        console.error('Error moving uploaded image:', err);
      } else {
        console.log('Image moved successfully');
      }
    });

    const newProduct = {
      id: products.length + 1,
      name,
      phone: parseInt(phone),
      image: filename // Save the filename in the product object
    };

    products.push(newProduct);

    // Save products to JSON file
    saveProductsToFile(products);

    res.status(201).json(newProduct);
  } else {
    res.status(400).json({ error: 'Image file not provided' });
  }
});

// Read all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Read a single product
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Update a product
app.put('/api/products/:id', upload.single('image'), (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, phone } = req.body;
  const image = req.file;

  const product = products.find(p => p.id === productId);

  if (product) {
    product.name = name;
    product.phone = parseInt(phone);
    product.image = image ? image.originalname : product.image;

    // Save products to JSON file
    saveProductsToFile(products);

    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex !== -1) {
    products.splice(productIndex, 1);

    // Save products to JSON file
    saveProductsToFile(products);

    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Save products to JSON file
function saveProductsToFile(products) {
  fs.writeFile('data.json', JSON.stringify(products), err => {
    if (err) {
      console.error('Error saving products to file:', err);
    } else {
      console.log('Products saved to file');
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

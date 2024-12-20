const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-commerce";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  Jwt.sign({ user: result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "Something went wrong. Please try again later." });
    }
    res.send({ result, auth: token });
  });  
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "Something went wrong. Please try again later." });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "User not found" });
    }
  } else {
    res.send({ result: "User not found" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  const userId = req.user._id;
  const { name, price, category, company } = req.body;

  if (!name || !price || !category || !company) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  if (typeof price !== 'number' || isNaN(price) || price <= 0) {
    return res.status(400).json({ error: 'O preço deve ser um número válido e maior que zero' });
  }

  let product = new Product({...req.body, userId});
  let result = await product.save();
  res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
  const userId = req.user._id;
  const products = await Product.find({ userId });
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No product found" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record found" });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  const userId = req.user._id;
  const product = await Product.findOne({ _id: req.params.id });

  if (!product) {
    return res.status(404).send({ result: "Product not found" });
  }

  if (product.userId.toString() !== userId.toString()) {
    return res.status(403).send({ result: "You do not have permission to update this product" });
  }

  const updatedData = { ...req.body };

  if (updatedData.price && (typeof updatedData.price !== 'number' || isNaN(updatedData.price))) {
    return res.status(400).json({ error: 'O preço deve ser um número válido' });
  }

  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: updatedData }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  const userId = req.user._id;

  const searchKey = req.params.key.trim().toLowerCase();

  let result = await Product.find({
    userId,
    $or: [
      {
        name: { $regex: searchKey, $options: 'i' },
      },
      {
        company: { $regex: searchKey, $options: 'i' },
      },
      {
        category: { $regex: searchKey, $options: 'i' },
      },
    ],
  });
  
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({result: "Token is not valid"});
      } else {
        req.user = valid.user;
        next();
      }
    });
  } else {
    res.status(403).send({result: "Token is not valid"});
  }
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
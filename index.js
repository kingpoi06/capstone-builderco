const express = require("express");
const cors = require("cors");

const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Gunakan middleware CORS
app.use(cors());

// Sajikan file statis dari direktori "public" dengan menetapkan Content-Type
app.use('/public', (req, res, next) => {
  const filePath = req.path;
  
  if (filePath.endsWith('.js')) {
    res.header('Content-Type', 'application/javascript');
  }

  express.static('public')(req, res, next);
});

const tukangRouter = require('./routes/tukang-router');
const authRouter = require('./routes/auth-router');

app.use("/api/v1/tukang", tukangRouter);
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server sedang berjalan....");
});
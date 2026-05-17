const express = require("express");
const path = require("path");

const indexRoutes = require("./src/routes/indexRoutes");

const app = express();

app.use(express.json())

// arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "src")));

// rotas
app.use("/", indexRoutes);

module.exports = app;
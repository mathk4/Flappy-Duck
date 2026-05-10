// server.js
const express = require("express");
const path = require("path");
const homeRoutes = require("./src/js/routes/indexRoutes");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

// usa o conjunto de rotas da home
app.use("/", homeRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, 'src')));
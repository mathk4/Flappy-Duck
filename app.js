const express = require("express");
const path = require("path");

const indexRoutes = require("./src/routes/indexRoutes");
const authRoutes = require("./src/routes/apiAuthRoutes");
const rankingRoutes = require("./src/routes/apiRankingRoutes");
const scoreRoutes = require("./src/routes/apiScoreRoutes");

const app = express();

app.use(express.json())

// arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "src")));

// rotas
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/ranking", rankingRoutes);
app.use("/score", scoreRoutes);

module.exports = app;
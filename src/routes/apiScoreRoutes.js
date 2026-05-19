// rota  da api de atualizar a pontuação do usuario

const express = require("express");
const router = express.Router();

const { 
    save
    } = require("../controllers/apiScoreController");

router.post("/save", save);

module.exports = router;
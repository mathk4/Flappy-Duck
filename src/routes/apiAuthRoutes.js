// rotas de autenticação da api
const express = require("express");
const router = express.Router();

const { 
    register,
    login 
    } = require("../controllers/apiAuthController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
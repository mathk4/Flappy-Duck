// logica da api de login e registro de usuarios

const { 
    findUserByEmail,
    createUser
    } = require("../models/userModel");

export async function register(req, res) {

    // logica de registro do usuario    (deve retornar o usuario criado ou um erro caso o email já exista para o frontend)
}

export async function login(req, res) {

    // logica de login do usuario (deve retornar o usuario encontrado ou um erro caso o email ou senha estejam incorretos para o frontend)
}
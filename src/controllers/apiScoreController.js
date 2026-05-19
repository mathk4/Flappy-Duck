// logica da api para salvar score do usuario

const { saveScore, getUserById } = require("../models/userModel");

export async function save(req, res) {

    const {id_user, newScore} = req.body;

    const user = await getUserById(id_user);
    
    await saveScore(id_user, newScore);

    return res.status(200).json({ message: "Pontuação salva com sucesso" });

}
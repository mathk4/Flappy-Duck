// logica da api para salvar score do usuario

const { saveScore, getUserById } = require("../models/userModel");

export async function save(req, res) {

    const {id_user, newScore} = req.body;

    const user = await getUserById(id_user);

    if (newScore > user.score) {
        
        await saveScore(id_user, newScore);

        return res.status(200).json({ message: "Pontuação salva com sucesso" });
    } else {
        return res.status(200).json({ message: "Pontuação não atualizada, nova pontuação é menor que a atual" });
    }

}
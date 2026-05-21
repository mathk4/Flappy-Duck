// logica de puxar as infromações do banco de dados do usuario

export async function findUserByEmail(email) {

    // pegar os dados do usuario do banco de dados usando o email
}

export async function createUser(username, email, password) {

    // criar um novo usuario no banco de dados e retornar o usuario criado
}

export async function getTopPlayers() {

    // pegar os top 10 jogadores do banco de dados pelo indice de score
}

export async function saveScore(id, score) {

    // salvar o novo score do usuario no banco de dados, se for maior que o score atual
}
class Conta {

    constructor(id, nome, email, senha, pontuacao = 0){

        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.pontuacao = pontuacao;
    }

    login(email, senha){

        return (
            this.email === email &&
            this.senha === senha
        );
    }

    static salvar(contas){

        localStorage.setItem(
            "contas",
            JSON.stringify(contas)
        );
    }

    static carregar(){

        const dados =
            JSON.parse(localStorage.getItem("contas"))
            || [];

        return dados.map(conta =>
            new Conta(
                conta.id,
                conta.nome,
                conta.email,
                conta.senha,
                conta.pontuacao
            )
        );
    }

}
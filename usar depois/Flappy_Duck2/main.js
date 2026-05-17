const jogo = new Jogo();

let jogadorAtual = null;

function register(){

    const nome =
        document.getElementById(
            "registerName"
        ).value;

    const email =
        document.getElementById(
            "registerEmail"
        ).value;

    const senha =
        document.getElementById(
            "registerPassword"
        ).value;

    const contas = Conta.carregar();

    if(
        contas.find(c => c.email === email)
    ){

        alert("E-mail já existe!");
        return;
    }

    const novaConta = new Conta(
        Date.now(),
        nome,
        email,
        senha
    );

    contas.push(novaConta);

    Conta.salvar(contas);

    alert("Cadastro realizado!");

    document.getElementById("loginEmail").value = email;
    document.getElementById("loginPassword").value = senha;

    login();
}

function login(){

    const email =
        document.getElementById(
            "loginEmail"
        ).value;

    const senha =
        document.getElementById(
            "loginPassword"
        ).value;

    const contas = Conta.carregar();

    const conta = contas.find(
        c => c.login(email, senha)
    );

    if(!conta){

        alert("Conta não encontrada!");
        return;
    }

    jogadorAtual =
        new Jogador(conta);

    ScreenManager.show(
        "menuScreen"
    );
}

function logout(){

    jogadorAtual = null;

    ScreenManager.show(
        "authScreen"
    );
}

function startGame(){

    if(!jogadorAtual){
        alert("Faça login antes de iniciar o jogo.");
        return;
    }

    jogo.iniciar(jogadorAtual);
}

function restartGame(){

    jogo.iniciar(jogadorAtual);
}

function goMenu(){

    ScreenManager.show(
        "menuScreen"
    );
}

function openProfile(){

    document.getElementById(
        "profileId"
    ).innerText =
        jogadorAtual.conta.id;

    document.getElementById(
        "profileName"
    ).innerText =
        jogadorAtual.conta.nome;

    document.getElementById(
        "profileScore"
    ).innerText =
        jogadorAtual.conta.pontuacao;

    ScreenManager.show(
        "profileScreen"
    );
}

function openRanking(){

    const ranking =
        Ranking.top10();

    const lista =
        document.getElementById(
            "rankingList"
        );

    lista.innerHTML = "";

    ranking.forEach(conta => {

        const li =
            document.createElement("li");

        li.innerText =
            `${conta.nome} - ${conta.pontuacao}`;

        lista.appendChild(li);
    });

    ScreenManager.show(
        "rankingScreen"
    );
}
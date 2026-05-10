export function telaMenu(navegarPara) {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1>Flappy Duck</h1>
        <button id="btn-jogar">Jogar</button>
        <button id="btn-ranking">Ver Ranking</button>
        <button id="btn-conta">Conta</button>
    `;

    const btnRanking = document.getElementById('btn-ranking');
    const btnJogar = document.getElementById('btn-jogar');
    const btnConta = document.getElementById('btn-conta');
    
    btnRanking.addEventListener('click', () => {
        navegarPara('ranking');
    });

    btnJogar.addEventListener('click', () => {
        navegarPara('jogar');
    });

    btnConta.addEventListener('click', () => {
        navegarPara('conta');
    });
}
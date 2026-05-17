export function telaLogin(navegarPara) {
    document.getElementById('app').innerHTML = `
        <h1>Esse pra conectar ou criar a conta</h1>
        <button id="btn-voltar">Voltar</button>
    `;
    const btnVoltar = document.getElementById('btn-voltar');
    
    btnVoltar.addEventListener('click', () => {
        navegarPara('menu');
    });
}
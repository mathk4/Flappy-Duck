export function telaGameover(navegarPara) {
    document.getElementById('app').innerHTML = `
        <h1>Game Over</h1>
        <button id="btn-voltar">Voltar</button>
    `;
    const btnVoltar = document.getElementById('btn-voltar');
    
    btnVoltar.addEventListener('click', () => {
        navegarPara('menu');
    });
}
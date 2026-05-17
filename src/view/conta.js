export function telaConta(navegarPara) {
    document.getElementById('app').innerHTML = `
        <h1>Esse ver dados daconta</h1>
        <button id="btn-voltar">Voltar</button>
    `;
    const btnVoltar = document.getElementById('btn-voltar');
    
    btnVoltar.addEventListener('click', () => {
        navegarPara('menu');
    });
}
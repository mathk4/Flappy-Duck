// chamar a view de jogo, e quando o jogo acabar navegar para a view de gameover
import { telaJogar } from "../view/jogar.js";
import { getConta } from "../state/session.js";
import Jogo from "../classes/Jogo.js";

export function jogarController(navegarPara) {
    telaJogar();

    const jogar = document.getElementById('gameScreen');
    jogar.style.display = 'none';

    const gameover = document.getElementById('gameOverScreen');
    gameover.style.display = 'none';

    const jogo = new Jogo(navegarPara);

    jogo.iniciar(getConta());

}
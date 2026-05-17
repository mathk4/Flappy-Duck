import { telaMenu } from '../view/menu.js';
import { telaRanking } from '../view/ranking.js';
import { telaJogar } from '../view/jogar.js';
import { telaConta } from '../view/conta.js';
import { telaLogin } from '../view/login.js';
import { telaGameover } from '../view/gameover.js';


function navegarPara(tela) {
    //const app = document.getElementById('app');


    if (tela === 'menu') {
        telaMenu(navegarPara);
    } else if (tela === 'ranking') {
        telaRanking(navegarPara);
    }
    else if (tela === 'jogar') {
        telaJogar(navegarPara);
    }
    else if (tela === 'conta') {
        telaConta(navegarPara);
    }
    else if (tela === 'login') {
        telaLogin(navegarPara);
    }
    else if (tela === 'gameover') {
        telaGameover(navegarPara);
    }
}
// Inicia o app chamando a primeira tela
navegarPara('menu');
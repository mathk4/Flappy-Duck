const tela =
    document.getElementById(
        "gameCanvas"
    );

const contexto =
    tela.getContext("2d");

class Jogo {

    constructor(){

        // Canvas
        this.canvas = tela;
        this.ctx = contexto;

        // Pixel art
        this.ctx.imageSmoothingEnabled =
            false;

        // Estado
        this.estado = "MENU";

        // Pontuação
        this.pontuacao = 0;

        // Canos
        this.obstaculos = [];

        // Distância entre canos
        this.distanciaCanos = 280;

        // Velocidade dos canos
        this.velocidadeCano = 4;

        // Jogador atual
        this.jogador = null;

        // Carregar imagens
        this.carregarImagens();

        // Controles
        this.configurarControles();
    }

    carregarImagens(){

        // Fundo
        this.fundo = new Image();

        this.fundo.src =
            "./img/fundo_if.jpeg";

        // Pato
        this.imagemPato =
            new Image();

        this.imagemPato.src =
            "./img/pato.jpeg";

        // Cano
        this.imagemCano =
            new Image();

        this.imagemCano.src =
            "./img/cano.jpeg";
    }

    configurarControles(){

        document.addEventListener(
            "keydown",
            e => {

                if(
                    e.code === "Space"
                ){

                    e.preventDefault();

                    // Pular
                    if(
                        this.estado ===
                        "JOGANDO"
                    ){

                        this.pato.pular();
                    }

                    // Reiniciar
                    else if(
                        this.estado ===
                        "GAME_OVER"
                    ){

                        this.iniciar(
                            this.jogador
                        );
                    }
                }
            }
        );
    }

    iniciar(jogador){

        this.jogador = jogador;

        this.estado = "JOGANDO";

        this.pontuacao = 0;

        document.getElementById(
            "score"
        ).innerText = 0;

        this.obstaculos = [];

        // Criar pato
        this.pato = new Pato();

        // Passar sprite
        this.pato.setSprite(
            this.imagemPato
        );

        // Mostrar tela do jogo
        ScreenManager.show(
            "gameScreen"
        );

        // Começar loop imediatamente
        this.loop();
    }

    loop(){

        // Se morreu
        if(
            this.estado !==
            "JOGANDO"
        ){

            this.desenharGameOver();

            return;
        }

        // Atualizar
        this.atualizar();

        // Desenhar
        this.desenhar();

        // Próximo frame
        requestAnimationFrame(
            () => this.loop()
        );
    }

    atualizar(){

        // Atualizar pato
        this.pato.atualizar();

        // Criar canos
        if(

            this.obstaculos.length === 0 ||

            this.obstaculos[
                this.obstaculos.length - 1
            ].x

            <

            this.canvas.width -
            this.distanciaCanos

        ){

            this.obstaculos.push(

                new Cano(

                    this.canvas.width,

                    170,

                    this.imagemCano,

                    this.canvas.height
                )
            );
        }

        // Atualizar canos
        for(

            let i =
            this.obstaculos.length - 1;

            i >= 0;

            i--

        ){

            let cano =
                this.obstaculos[i];

            // Movimento
            cano.atualizar(
                this.velocidadeCano
            );

            // Colisão
            if(
                this.verificarColisao(
                    this.pato,
                    cano
                )
            ){

                this.gameOver();
            }

            // Pontuação
            if(

                !cano.passou &&

                cano.x + cano.largura <
                this.pato.x

            ){

                cano.passou = true;

                this.pontuacao++;

                document.getElementById(
                    "score"
                ).innerText = this.pontuacao;
            }

            // Remover cano
            if(
                cano.x <
                -cano.largura
            ){

                this.obstaculos.splice(
                    i,
                    1
                );
            }
        }

        // Limites tela
        if(

            this.pato.y +
            30 >

            this.canvas.height

            ||

            this.pato.y - 30 < 0

        ){

            this.gameOver();
        }
    }

    desenhar(){

        // Fundo
        this.ctx.drawImage(

            this.fundo,

            0,
            0,

            this.canvas.width,
            this.canvas.height
        );

        // Canos
        this.obstaculos.forEach(
            cano => {

                cano.desenhar(this.ctx);
            }
        );

        // Pato
        this.pato.desenhar(this.ctx);
    }

    verificarColisao(
        pato,
        cano
    ){

        let hb = 18;

        if(

            pato.x + hb >
            cano.x

            &&

            pato.x - hb <
            cano.x +
            cano.largura

        ){

            if(

                pato.y - hb <
                cano.alturaSuperior

                ||

                pato.y + hb >

                cano.alturaSuperior +
                cano.espaco

            ){

                return true;
            }
        }

        return false;
    }

    desenharGameOver(){

        this.ctx.fillStyle =
            "rgba(0,0,0,0.7)";

        this.ctx.fillRect(

            0,
            0,

            this.canvas.width,
            this.canvas.height
        );

        this.ctx.fillStyle =
            "white";

        this.ctx.textAlign =
            "center";

        this.ctx.font =
            "bold 40px Arial";

        this.ctx.fillText(

            "GAME OVER",

            this.canvas.width / 2,
            220
        );

        this.ctx.font =
            "bold 70px Arial";

        this.ctx.fillText(

            this.pontuacao,

            this.canvas.width / 2,
            320
        );

        this.ctx.font =
            "20px Arial";

        this.ctx.fillText(

            "ESPAÇO PARA REINICIAR",

            this.canvas.width / 2,
            400
        );
    }

    gameOver(){

        this.estado =
            "GAME_OVER";

        // Atualizar recorde
        if(this.jogador){

            let conta =
                this.jogador.conta;

            if(

                this.pontuacao >
                conta.pontuacao

            ){

                conta.pontuacao =
                    this.pontuacao;

                let contas =
                    Conta.carregar();

                contas = contas.map(c => {

                    if(
                        c.id ===
                        conta.id
                    ){

                        return conta;
                    }

                    return c;
                });

                Conta.salvar(contas);
            }
        }

        // Atualizar ranking
        Ranking.top10();

        // Mostrar tela de game over
        document.getElementById(
            "finalScore"
        ).innerText = this.pontuacao;

        document.getElementById(
            "bestScore"
        ).innerText = this.jogador.conta.pontuacao;

        ScreenManager.show(
            "gameOverScreen"
        );
    }
}
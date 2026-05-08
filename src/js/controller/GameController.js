const tela = document.getElementById("gameCanvas");
const contexto = tela.getContext("2d");
contexto.imageSmoothingEnabled = false;

// --- CLASSES DO JOGO ---

class Pato {
    constructor() {
        this.x = 50;
        this.y = 150;
        this.largura = 60;
        this.altura = 60;
        this.velocidadeY = 0;
        this.gravidade = 0.5;
        this.forcaPulo = -6;
        this.frame = 0;
        this.contadorAnim = 0;
        // Referência para a imagem já carregada no motor
        this.sprite = null; 
    }

    // Método para receber a imagem já carregada
    setSprite(imagem) {
        this.sprite = imagem;
    }

    pular() {
        this.velocidadeY = this.forcaPulo;
        this.frame = 0;
    }

    atualizar() {
        this.velocidadeY += this.gravidade;
        this.y += this.velocidadeY;

        // Animação das asas
        this.contadorAnim++;
        if (this.contadorAnim % 6 === 0) {
            this.frame = (this.frame + 1) % 6;
        }
    }

    desenhar() {
        if (this.sprite && this.sprite.complete) {
            let coluna = this.frame % 2;
            let linha = Math.floor(this.frame / 2);
            contexto.drawImage(
                this.sprite,
                coluna * 32, linha * 32, 32, 32,
                this.x - 30, this.y - 30, this.largura, this.altura
            );
        }
    }
}

class Cano {
    constructor(x, espaco, imagem) {
        this.x = x;
        this.largura = 60;
        this.espaco = espaco;
        this.sprite = imagem;
        this.passou = false;
        
        let areaSegura = tela.height - this.espaco - 120;
        this.alturaSuperior = Math.floor(Math.random() * areaSegura) + 60;
    }

    atualizar(velocidade) {
        this.x -= velocidade;
    }

    desenhar() {
        if (this.sprite && this.sprite.complete) {
            // Desenho do Cano Superior (Invertido)
            contexto.save();
            contexto.translate(this.x, this.alturaSuperior);
            contexto.scale(1, -1);
            contexto.drawImage(this.sprite, 0, 0, this.largura, this.alturaSuperior);
            contexto.restore();

            // Desenho do Cano Inferior
            contexto.drawImage(
                this.sprite,
                this.x, this.alturaSuperior + this.espaco,
                this.largura, tela.height - (this.alturaSuperior + this.espaco)
            );
        } else {
            // Backup visual caso o sprite do cano falhe
            contexto.fillStyle = "#2e7d32";
            contexto.fillRect(this.x, 0, this.largura, this.alturaSuperior);
            contexto.fillRect(this.x, this.alturaSuperior + this.espaco, this.largura, tela.height);
        }
    }
}

// --- GERENCIADOR DO JOGO (POO) ---

class MotorDoJogo {
    constructor() {
        // Inicializa as imagens primeiro
        this.fundo = new Image();
        this.fundo.src = 'images/fundo.jpeg';
        
        this.imagemCano = new Image();
        this.imagemCano.src = 'images/cano.jpeg';

        this.imagemPato = new Image();
        this.imagemPato.src = 'images/sprites.jpeg';

        // Variáveis de controle de carregamento
        this.carregandoImagens = true;
        this.totalImagens = 3;
        this.imagensProntas = 0;

        // Configura os ouvintes de carregamento
        this.fundo.onload = () => this.verificarCarregamento();
        this.imagemCano.onload = () => this.verificarCarregamento();
        this.imagemPato.onload = () => this.verificarCarregamento();

        // Configura controles (agora funciona a qualquer momento)
        this.configurarControles();
        
        // Inicializa estado
        this.reiniciar();
    }

    verificarCarregamento() {
        this.imagensProntas++;
        if (this.imagensProntas === this.totalImagens) {
            this.carregandoImagens = false;
            // Só começa o loop se tudo estiver pronto
            if (this.rodando) this.loop();
        }
    }

    configurarControles() {
        document.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                // Se as imagens não carregaram, ignora o pulo
                if (this.carregandoImagens) return;

                if (this.rodando) this.pato.pular();
                else this.reiniciar();
            }
        });
    }

    reiniciar() {
        this.pato = new Pato();
        this.pato.setSprite(this.imagemPato); // Passa a imagem carregada para o pato
        this.canos = [];
        this.pontuacao = 0;
        this.rodando = true;
        this.velocidadeCano = 4;
        this.distanciaCanos = 280;

        // Só começa o loop se não estiver carregando
        if (!this.carregandoImagens) this.loop();
    }

    verificarColisao(pato, cano) {
        let hb = 18; // Hitbox (caixa de colisão)
        if (pato.x + hb > cano.x && pato.x - hb < cano.x + cano.largura) {
            if (pato.y - hb < cano.alturaSuperior || pato.y + hb > cano.alturaSuperior + cano.espaco) {
                return true;
            }
        }
        return false;
    }

    mostrarFimDeJogo() {
        contexto.fillStyle = "rgba(0,0,0,0.7)";
        contexto.fillRect(0, 0, tela.width, tela.height);

        contexto.textAlign = "center";
        contexto.fillStyle = "white";
        
        contexto.font = "bold 30px Arial";
        contexto.fillText("GAME OVER", tela.width / 2, tela.height / 2 - 60);

        contexto.font = "bold 60px Arial";
        contexto.fillStyle = "#FFD700"; // Dourado
        contexto.fillText(this.pontuacao, tela.width / 2, tela.height / 2 + 10);
        
        contexto.font = "18px Arial";
        contexto.fillStyle = "white";
        contexto.fillText("PONTOS", tela.width / 2, tela.height / 2 + 40);

        contexto.font = "16px Arial";
        contexto.fillText("Aperte ESPAÇO para reiniciar", tela.width / 2, tela.height / 2 + 100);
    }

    loop() {
        if (!this.rodando || this.carregandoImagens) {
            if (!this.rodando) this.mostrarFimDeJogo();
            return;
        }

        // 1. Limpar/Desenhar Fundo
        if (this.fundo.complete) {
            // Estica o fundo de 640x480 para caber no canvas
            contexto.drawImage(this.fundo, 0, 0, 640, 480, 0, 0, tela.width, tela.height);
        } else {
            // Backup visual
            contexto.fillStyle = "#70c5ce";
            contexto.fillRect(0, 0, tela.width, tela.height);
        }

        // 2. Atualizar e Desenhar Pato
        this.pato.atualizar();
        this.pato.desenhar();

        // 3. Gerenciar Canos
        if (this.canos.length === 0 || this.canos[this.canos.length - 1].x < tela.width - this.distanciaCanos) {
            this.canos.push(new Cano(tela.width, 160, this.imagemCano));
        }

        for (let i = this.canos.length - 1; i >= 0; i--) {
            let c = this.canos[i];
            c.atualizar(this.velocidadeCano);
            c.desenhar();

            // Checar Colisão
            if (this.verificarColisao(this.pato, c)) {
                this.rodando = false;
            }

            // Checar Pontuação
            if (!c.passou && c.x < this.pato.x) {
                this.pontuacao++;
                c.passou = true;
            }

            // Remover canos fora da tela
            if (c.x < -c.largura) this.canos.splice(i, 1);
        }

        // 4. Limites de Teto/Chão
        if (this.pato.y + 25 > tela.height || this.pato.y - 25 < 0) {
            this.rodando = false;
        }

        // 5. Placar em Tempo Real
        contexto.fillStyle = "white";
        contexto.strokeStyle = "black";
        contexto.lineWidth = 4;
        contexto.font = "bold 40px Arial";
        contexto.textAlign = "center";
        contexto.strokeText(this.pontuacao, tela.width / 2, 70);
        contexto.fillText(this.pontuacao, tela.width / 2, 70);

        // Manter o loop a 60 FPS
        setTimeout(() => {
            requestAnimationFrame(() => this.loop());
        }, 1000 / 60);
    }
}

// Iniciar o jogo
const meuJogo = new MotorDoJogo();
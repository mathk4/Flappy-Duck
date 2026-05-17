class Ranking {

    static top10(){

        return Conta
            .carregar()
            .sort((a,b) =>
                b.pontuacao - a.pontuacao
            )
            .slice(0,10);
    }

}
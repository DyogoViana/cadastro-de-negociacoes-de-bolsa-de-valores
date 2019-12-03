// NegociacaoService.js




class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    // Obtêm as negociações da semana.
    obterNegociacoesDaSemana() {
        
       return new Promise((resolve, reject) => {
            this._http
             .get("negociacoes/semana")
             .then(negociacoes => {
                console.log(negociacoes);
                resolve(negociacoes.map(objeto => new Negociacao(
                    new Date(objeto.data), 
                    objeto.quantidade, 
                    objeto.valor
                )));
             })
             .catch(erro => {
                console.log(erro);
                reject("NÃO foi possivel obter as negociações da semana.");
             });
        });
    }

    
    // Obtêm as negociações da 'semana anterior'.
    obterNegociacoesDaSemanaAnterior() {
        
        return new Promise((resolve, reject) => {
            this._http
            .get("negociacoes/anterior")
            .then(negociacoes => {
                console.log(negociacoes);
                resolve(negociacoes.map(objeto => new Negociacao(
                    new Date(objeto.data), 
                    objeto.quantidade, 
                    objeto.valor
                )));
            })
                .catch(erro => {
                    console.log(erro);
                    reject("NÃO foi possivel obeter as negociações da semana anterior.");
                });
            });
        }
        
        // Obtêm as negociações da 'semana Retrasada'.
        obterNegociacoesDaSemanaRetrasada() {
                
            return new Promise((resolve, reject) => {
                this._http
                 .get("negociacoes/retrasada")
                 .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(
                        new Date(objeto.data), 
                        objeto.quantidade, 
                        objeto.valor
                    )));
                 })
                 .catch(erro => {
                    console.log(erro);
                    reject("NÃO foi possivel obter as negociações da semana retrasada.");
                 });
            });
        }


        obterNegociacoes() {
            return new Promise((resolve, reject) => {

                Promise.all([  
                    this.obterNegociacoesDaSemana(),
                    this.obterNegociacoesDaSemanaAnterior(),
                    this.obterNegociacoesDaSemanaRetrasada()
                ]).then(periodos => {
                    let negociacoes = periodos
                        .reduce((dados, periodo) => dados.concat(periodo), [])
                        .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));
                    
                    resolve(negociacoes);
                }).catch(erro => reject(erro));
            });
        }
    }
    
/*
    # Anotações:

    - Endereços do servidor -- 'negociacoes/semana', 'negociacoes/anterior', 'negociacoes/retrasada'

*/
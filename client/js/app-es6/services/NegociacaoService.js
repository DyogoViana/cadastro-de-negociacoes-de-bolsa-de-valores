// NegoviacaoService.js



import { HttpService } from "./HttpService";
import { ConnectionFactory } from "./ConnectionFactory";

import { NegociacaoDAO } from "../DAO/NegociacaoDAO";
import { Negociacao } from "../models/Negociacao";



export class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }



    // Obtêm as negociações da semana.
    obterNegociacoesDaSemana() {
        
            return this._http
             .get("negociacoes/semana")
             .then(negociacoes => {
                console.log(negociacoes);
                return negociacoes.map(objeto => new Negociacao(
                    new Date(objeto.data), 
                    objeto.quantidade, 
                    objeto.valor
                ));
             })
             .catch(erro => {
                console.log(erro);
                throw new Error("NÃO foi possivel obter as negociações da semana.");
             });
    }

    
    // Obtêm as negociações da 'semana anterior'.
    obterNegociacoesDaSemanaAnterior() {
        
            return this._http
             .get("negociacoes/anterior")
             .then(negociacoes => {

                console.log(negociacoes);

                return negociacoes.map(objeto => new Negociacao(
                    new Date(objeto.data), 
                    objeto.quantidade, 
                    objeto.valor
                ));
             })
             .catch(erro => {
                console.log(erro);
                throw new Error("NÃO foi possivel obeter as negociações da semana anterior.");
             });
        }
        
        // Obtêm as negociações da 'semana Retrasada'.
        obterNegociacoesDaSemanaRetrasada() {
                
            return this._http
             .get("negociacoes/retrasada")
             .then(negociacoes => {
                console.log(negociacoes);

                return negociacoes.map(objeto => new Negociacao(
                    new Date(objeto.data), 
                    objeto.quantidade, 
                    objeto.valor
                ));
             })
             .catch(erro => {
                console.log(erro);
                throw new Error("NÃO foi possivel obter as negociações da semana retrasada.");
             });
        }

        // Fleta as negociações de uma forma linear e chamada na 'importaNegociacoes'.
        obterNegociacoes() {

            return Promise.all([  
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()])
             .then(periodos => {
                let negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo), []);
                return negociacoes;
})
             .catch(erro => { 
                throw new Error(erro);
            });
        }

        // cadastra uma nova negociação e adiciona no 'NegociacaoController'.
        cadastra(negociacao) {

            return ConnectionFactory
             .getConnection()
             .then(connection => new NegociacaoDAO(connection))
             .then(DAO => DAO.adiciona(negociacao))
             .then(() => "Negociação adicionada com sucesso.")

             .catch(erro => {
                 console.log(erro);
                 throw new Error("Não foi possível adicionar uma negociação.")
             });
        }

        lista() {

            return ConnectionFactory
             .getConnection()
             .then(connection => new NegociacaoDAO(connection))
             .then(DAO => DAO.listaTodos()) // Lista todos os dados di IndexedDB.

             .catch(erro => {
                 console.log(erro);
                 throw new Error("Não foi possível obter as negociações.")
             });
        }

        // Apaga uma lista de negociação.
        apaga() {
            
            return ConnectionFactory
             .getConnection()
             .then(connection => new NegociacaoDAO  (connection))
             .then(DAO => DAO.apagaTodos())
             .then(() => "Negociações apagadas com sucesso.")

             .catch(erro => {
                 console.log(erro);
                 throw new Error("Não foi possível apagar as negociações.");
             });
        }

        // Importa negociações.
        importa(listaAtual) {

            return this.obterNegociacoes()
             .then(negociacoes => 
                negociacoes.filter(negociacao => 
                    !listaAtual.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente)))
             )
             .catch(erro => {
                 console.log(erro);
                 throw new Error("Não foi possível importar as negociações.");
             });
        }
    }

    
    




    
/*
---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------


    # Anotações:

    - Endereços do servidor -- 'negociacoes/semana', 'negociacoes/anterior', 'negociacoes/retrasada'


---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
*/
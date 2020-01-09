"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// NegoviacaoService.js


var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    // Obtêm as negociações da semana.


    _createClass(NegociacaoService, [{
        key: "obterNegociacoesDaSemana",
        value: function obterNegociacoesDaSemana() {

            return this._http.get("negociacoes/semana").then(function (negociacoes) {
                console.log(negociacoes);
                return negociacoes.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("NÃO foi possivel obter as negociações da semana.");
            });
        }

        // Obtêm as negociações da 'semana anterior'.

    }, {
        key: "obterNegociacoesDaSemanaAnterior",
        value: function obterNegociacoesDaSemanaAnterior() {

            return this._http.get("negociacoes/anterior").then(function (negociacoes) {

                console.log(negociacoes);

                return negociacoes.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("NÃO foi possivel obeter as negociações da semana anterior.");
            });
        }

        // Obtêm as negociações da 'semana Retrasada'.

    }, {
        key: "obterNegociacoesDaSemanaRetrasada",
        value: function obterNegociacoesDaSemanaRetrasada() {

            return this._http.get("negociacoes/retrasada").then(function (negociacoes) {
                console.log(negociacoes);

                return negociacoes.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("NÃO foi possivel obter as negociações da semana retrasada.");
            });
        }

        // Fleta as negociações de uma forma linear e chamada na 'importaNegociacoes'.

    }, {
        key: "obterNegociacoes",
        value: function obterNegociacoes() {

            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {
                var negociacoes = periodos.reduce(function (dados, periodo) {
                    return dados.concat(periodo);
                }, []);
                return negociacoes;
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }

        // cadastra uma nova negociação e adiciona no 'NegociacaoController'.

    }, {
        key: "cadastra",
        value: function cadastra(negociacao) {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDAO(connection);
            }).then(function (DAO) {
                return DAO.adiciona(negociacao);
            }).then(function () {
                return "Negociação adicionada com sucesso.";
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível adicionar uma negociação.");
            });
        }
    }, {
        key: "lista",
        value: function lista() {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDAO(connection);
            }).then(function (DAO) {
                return DAO.listaTodos();
            }) // Lista todos os dados di IndexedDB.

            .catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações.");
            });
        }

        // Apaga uma lista de negociação.

    }, {
        key: "apaga",
        value: function apaga() {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDAO(connection);
            }).then(function (DAO) {
                return DAO.apagaTodos();
            }).then(function () {
                return "Negociações apagadas com sucesso.";
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível apagar as negociações.");
            });
        }

        // Importa negociações.

    }, {
        key: "importa",
        value: function importa(listaAtual) {

            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !listaAtual.some(function (negociacaoExistente) {
                        return negociacao.isEquals(negociacaoExistente);
                    });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível importar as negociações.");
            });
        }
    }]);

    return NegociacaoService;
}();

/*
---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------


    # Anotações:

    - Endereços do servidor -- 'negociacoes/semana', 'negociacoes/anterior', 'negociacoes/retrasada'


---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
*/
//# sourceMappingURL=NegociacaoService.js.map
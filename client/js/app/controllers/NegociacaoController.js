"use strict";

System.register(["../models/ListaNegociacoes", "../models/Mensagem", "../models/Negociacao", "../views/NegociacoesView", "../views/MensagemView", "../services/NegociacaoService", "../helpers/DateHelper", "../helpers/Bind"], function (_export, _context) {
    "use strict";

    var ListaNegociacoes, Mensagem, Negociacao, NegociacoesView, MensagemView, NegociacaoService, DateHelper, Bind, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);

                    this._inputData = $("#data");
                    this._inputQuantidade = $("#quantidade");
                    this._inputValor = $("#valor");

                    // Proxy para criação da trap no 'adiciona' e 'esvazia'.
                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), // modelo
                    new NegociacoesView($("#negociacoesView")), // view.
                    "adiciona", "esvaziaTabela", "ordena", "inverteOrdem"); // Condição para atualizar. Props que vão disparar a 'View'.

                    // Mensagem que aparece ao usuário.
                    this._mensagem = new Bind(new Mensagem(), // modelo.
                    new MensagemView($("#mensagemView")), // view.
                    "texto"); // Condição para atualizar. Props que vão disparar a 'View'.

                    this._service = new NegociacaoService();

                    this._iniciacaoAutomatica();
                }

                _createClass(NegociacaoController, [{
                    key: "_iniciacaoAutomatica",
                    value: function _iniciacaoAutomatica() {
                        var _this = this;

                        // Cria uma conexão e lista as negociações na view.
                        this._service.lista().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this._listaNegociacoes.adiciona(negociacao);
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            _this._mensagem.texto = erro;
                        });

                        setInterval(function () {
                            _this.importaNegociacoes();
                        }, 3000); // Intervalos onde são importadas as impostações das negociações.
                    }
                }, {
                    key: "ordena",
                    value: function ordena(coluna) {
                        if (this._ordemAtual == coluna) {
                            this._listaNegociacoes.inverteOrdem();
                        } else {
                            this._listaNegociacoes.ordena(function (a, b) {
                                return a[coluna] - b[coluna];
                            });
                        }
                        this._ordemAtual = coluna;
                    }
                }, {
                    key: "adiciona",
                    value: function adiciona(event) {
                        var _this2 = this;

                        event.preventDefault();

                        var negociacao = this._criaNegociacao();

                        this._service.cadastra(negociacao).then(function (mensagem) {
                            _this2._listaNegociacoes.adiciona(negociacao);
                            _this2._mensagem.texto = mensagem;
                            console.log("Negociação adicionada com sucesso.");
                            _this2._limpaFormulario();
                        }).catch(function (erro) {
                            return _this2._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: "importaNegociacoes",
                    value: function importaNegociacoes() {
                        var _this3 = this;

                        this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                _this3._listaNegociacoes.adiciona(negociacao);
                                _this3._mensagem.texto = "Negociações do período importadas com sucesso.";
                                console.log("Negociações do perído importadas com sucesso, usando Promise.");
                            });
                        }).catch(function (erro) {
                            return _this3._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: "apaga",
                    value: function apaga() {
                        var _this4 = this;

                        this._service.apaga().then(function (mensagem) {
                            _this4._listaNegociacoes.esvaziaTabela();
                            _this4._mensagem.texto = mensagem;
                            console.log("Negociações apagadas com sucesso.");
                        }).catch(function (erro) {
                            return _this4._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: "_criaNegociacao",
                    value: function _criaNegociacao() {
                        return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: "_limpaFormulario",
                    value: function _limpaFormulario() {
                        this._inputData.value = "";
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;

                        this._inputData.focus();
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
            function currentInstance() {
                return negociacaoController;
            }

            /*
                # Anotações:
            
                - spread operator -- São as reticências antes do _this_. indica que ele desmenbrará o array e posiciona na mesma ordem no construtor.
            
                - item - indice % 2 -- ler item, menos indice, módulo dois.
            
                - explicando a ordem das colunas: 
                    lista.sort((a, b) => a - b);  
                    Se o valor retornado for 0 não há alteração a ser feita, se o valor retornado for positivo, 'b' deve vir antes de 'a', se o valor for negativo, 'a' deve vir antes de 'b'.
            */

            _export("currentInstance", currentInstance);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map
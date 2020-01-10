"use strict";

System.register(["../models/Negociacao"], function (_export, _context) {
    "use strict";

    var Negociacao, _createClass, NegociacaoDAO;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
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

            _export("NegociacaoDAO", NegociacaoDAO = function () {
                function NegociacaoDAO(connection) {
                    _classCallCheck(this, NegociacaoDAO);

                    this._connection = connection;
                    this._store = "negociacoes";
                }

                // Adiciona uma nova transação de negociação no banco de dados.


                _createClass(NegociacaoDAO, [{
                    key: "adiciona",
                    value: function adiciona(negociacao) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this._connection.transaction([_this._store], "readwrite").objectStore(_this._store).add(negociacao);

                            request.onsuccess = function (event) {
                                resolve();
                            };

                            request.onerror = function (event) {
                                console.log(event.target.error);
                                reject("Não foi possível adicionar a negociação.");
                            };
                        });
                    }
                }, {
                    key: "listaTodos",
                    value: function listaTodos() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {

                            var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

                            var negociacoes = [];

                            cursor.onsuccess = function (event) {
                                var atual = event.target.result;

                                if (atual) {
                                    // Se o ponteiro existir, ele pega o dado.
                                    var dado = atual.value;

                                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                                    atual.continue();
                                } else {
                                    resolve(negociacoes);
                                }
                            };

                            cursor.onerror = function (event) {
                                console.log(event.target.error);
                                reject("Não foi posível listar as negociações.");
                            };
                        });
                    }
                }, {
                    key: "apagaTodos",
                    value: function apagaTodos() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this3._connection.transaction([_this3._store], "readwrite").objectStore(_this3._store).clear();

                            request.onsuccess = function (event) {
                                return resolve("Negociaçõs apagadas com sucesso.");
                            };

                            request.onerror = function (event) {
                                console.log(event.target.error);
                                reject("Não foi possível remover as negociações.");
                            };
                        });
                    }
                }]);

                return NegociacaoDAO;
            }());

            _export("NegociacaoDAO", NegociacaoDAO);
        }
    };
});
//# sourceMappingURL=NegociacaoDAO.js.map
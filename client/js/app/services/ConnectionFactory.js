"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, store, dataBaseName, version, connection, close, ConnectionFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            store = ["negociacoes"];
            dataBaseName = "Banco de Dados para Cadastros da Bolsa de Valores";
            version = 9;
            connection = null;
            close = null;

            _export("ConnectionFactory", ConnectionFactory = function () {
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw new Error("Não é possível criar estâncias de 'ConnectionFactory'.");
                }

                // Acessa o banco de dados indexedDB.


                _createClass(ConnectionFactory, null, [{
                    key: "getConnection",
                    value: function getConnection() {
                        return new Promise(function (resolve, reject) {
                            var openRequest = window.indexedDB.open(dataBaseName, version);

                            openRequest.onupgradeneeded = function (event) {
                                ConnectionFactory._createStores(event.target.result);
                            };

                            openRequest.onsuccess = function (event) {
                                // recebe conexão já existente ou uma que acabou de ser criada
                                if (!connection) {
                                    connection = event.target.result;
                                    close = connection.close.bind(connection);
                                    connection.close = function () {
                                        throw new Error("Você não pode fechar diretamente a conexão.");
                                    };
                                }
                                resolve(connection);
                            };

                            openRequest.onerror = function (event) {
                                console.log(event.target.error);
                                reject(event.target.error.name);
                            };
                        });
                    }
                }, {
                    key: "_createStores",
                    value: function _createStores(connection) {
                        store.forEach(function (store) {
                            if (connection.objectStoreNames.contains(store)) {
                                // caso tenha uma store, ela será deletada.
                                connection.deleteObjectStore(store);
                            }

                            connection.createObjectStore(store, { // Caso tudo esteja correto, será criado uma nova store.
                                autoIncrement: true
                            });
                        });
                    }
                }, {
                    key: "closeConnection",
                    value: function closeConnection() {
                        if (connection) {
                            close();
                            connection = null;
                        }
                    }
                }]);

                return ConnectionFactory;
            }());

            _export("ConnectionFactory", ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map
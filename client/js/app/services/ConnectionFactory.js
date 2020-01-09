"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ConnectionFactory.js


var ConnectionFactory = function () {

    var store = ["negociacoes"];
    var dataBaseName = "Banco de Dados para Cadastros da Bolsa de Valores";
    var version = 9;

    var connection = null;
    var close = null;

    return function () {
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

            // Cria Stores no banco de dados.

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

            // Fecha a conexão.

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
    }();
}();

/*
---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------


    # Anotações:

    - Foi usado o padrão de projeto chamado 'Module Pattern', para não deixar acessível globalmente.

    - Foi criado uma função 'autoinvocada'/função anônima, Simultaneamente, ela será carregada e executada. Deixando assim a variável 'Connectionfactory' no escopo global.

    - Para mudar o método 'close', foi usado o 'Monkey Patch', que consiste forçarmos a modificação de uma API. 


---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------*/
//# sourceMappingURL=ConnectionFactory.js.map
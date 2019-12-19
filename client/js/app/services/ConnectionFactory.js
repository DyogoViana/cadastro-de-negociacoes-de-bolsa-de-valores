// ConnectionFactory.js


var ConnectionFactory = (function () {

    const store = ["negociacoes"];
    const dataBaseName = "Banco de Dados para Cadastros da Bolsa de Valores";
    const version = 9;

    var connection = null;
    var close = null;


    return class ConnectionFactory {

        constructor() {
            throw new Error("Não é possível criar estâncias de 'ConnectionFactory'.");
        }

        // Acessa o banco de dados indexedDB.
        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dataBaseName, version);

                openRequest.onupgradeneeded = event => {
                    ConnectionFactory._createStores(event.target.result);
                };
                
                openRequest.onsuccess = event => { // recebe conexão já existente ou uma que acabou de ser criada
                    if (!connection) {
                        connection = event.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function() {
                            throw new Error("Você não pode fechar diretamente a conexão.")
                        };
                    }
                    resolve(connection);
                }
                
                openRequest.onerror = event => {
                    console.log(event.target.error);
                    reject(event.target.error.name);
                };
            });
        }
        
        // Cria Stores no banco de dados.
        static _createStores(connection) {
            store.forEach(store => {
                if (connection.objectStoreNames.contains(store)) { // caso tenha uma store, ela será deletada.
                    connection.deleteObjectStore(store);
                }
        
                connection.createObjectStore(store, { // Caso tudo esteja correto, será criado uma nova store.
                    autoIncrement: true
                });
            });

        }

        // Fecha a conexão.
        static closeConnection() {
            if (connection) {
                close();
                connection = null;
            }
        }
    }
}) ();






/*
---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------


    # Anotações:

    - Foi usado o padrão de projeto chamado 'Module Pattern', para não deixar acessível globalmente.

    - Foi criado uma função 'autoinvocada'/função anônima, Simultaneamente, ela será carregada e executada. Deixando assim a variável 'Connectionfactory' no escopo global.

    - Para mudar o método 'close', foi usado o 'Monkey Patch', que consiste forçarmos a modificação de uma API. 


---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------*/
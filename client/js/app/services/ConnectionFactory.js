// ConnectionFactory.js


var store = ["negociacoes"];
var dataBaseName = "Banco de Dados para Cadastros da Bolsa de Valores";
var version = 8;

class ConnectionFactory {

    constructor() {
        throw new Error("Não é possível criar estâncias de 'ConnectionFactory'.");
    }

    static getConnection() {
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open(dataBaseName, version);

            openRequest.onupgradeneeded = event => {
                ConnectionFactory._createStores(event.target.result);
            };
            
            openRequest.onsuccess = event => {
                resolve(event.target.result);
            };
            
            openRequest.onerror = event => {
                console.log(event.target.error);
                reject(event.target.error.name);
            };
        });
    }
    
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
}
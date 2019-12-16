// ConnectionFactory.js


var store = ["negociacoes"];
var dataBaseName = "Sistema de Cadastros da Bolsa de Valores";
var version = 7;

class ConnectionFactory {

    constructor() {
        throw new Error("Não é possível criar estâncias de 'ConnectionFactory'.");
    }

    static getConnection() {
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open(dataBaseName, version);

            openRequest.onupgradeneeded = event => {};

            openRequest.onsuccess = event => {};

            openRequest.onerror = event => {};
        });
    }
}
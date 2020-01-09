// NegociacaoDAO.js -- DAO 'Data Access Object'.



class NegociacaoDAO {

    constructor(connection) {
        this._connection = connection;
        this._store = "negociacoes";
    }

    // Adiciona uma nova transação de negociação no banco de dados.
    adiciona(negociacao) {
        return new Promise((resolve, reject) => {

            let request = this._connection
             .transaction([this._store], "readwrite")
             .objectStore(this._store)
             .add(negociacao);

            request.onsuccess = (event) => {
                resolve();
             };

            request.onerror = event => {
                console.log(event.target.error);
                reject("Não foi possível adicionar a negociação.");
             };
        });
    }

    // Lista todas as negociações na view.
    listaTodos() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
             .transaction([this._store],'readwrite')
             .objectStore(this._store)
             .openCursor();

            let negociacoes = [];

            cursor.onsuccess = event => {
                 let atual = event.target.result;

                 if(atual) { // Se o ponteiro existir, ele pega o dado.
                     let dado = atual.value;

                     negociacoes.push(new Negociacao((dado._data), dado._quantidade, dado._valor));
                     atual.continue();

                 } else { 
                    resolve(negociacoes);
                 }
            };

            cursor.onerror = event => {
                console.log(event.target.error);
                reject("Não foi posível listar as negociações.");
            };
        });
    }

    // Apaga a lista de negociações da view e do banco.
    apagaTodos() {
        
        return new Promise((resolve, reject) => {

            let request = this._connection
             .transaction([this._store], "readwrite")
             .objectStore(this._store)
             .clear();

             request.onsuccess = event => resolve("Negociaçõs apagadas com sucesso.");

             request.onerror = event => {
                 console.log(event.target.error);
                 reject("Não foi possível remover as negociações.");
             } 
        });
    }
}











/*
-------------------------------------------------------------------------
-------------------------------------------------------------------------


    # Anotações

    - O 'cursor' é o responsável por passear pelos dados da Object Store. Ele tem um ponteiro para o primeiro, segundo e os demais elementos ordenados.

    - 


-------------------------------------------------------------------------
-------------------------------------------------------------------------
*/
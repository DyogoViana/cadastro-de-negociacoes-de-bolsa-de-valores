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
}
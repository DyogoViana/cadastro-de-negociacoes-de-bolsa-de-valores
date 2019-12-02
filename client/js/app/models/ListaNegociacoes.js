// ListaNegociacoes.js




// Cria lista de negociações.
class ListaNegociacoes {

    constructor() {

        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);       
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvaziaTabela() {
        this._negociacoes = [];  
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }
}












/*
    # Anotações:

    - O prefixo _ (underline) para indicar que a lista não deve ser alterada.

*/
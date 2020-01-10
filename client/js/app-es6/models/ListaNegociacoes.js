// ListaNegociacoes.js




// Cria lista de negociações.
export class ListaNegociacoes {

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

    // Ordena a tabela das negociações.
    ordena(criterio) {
        this._negociacoes.sort(criterio);
    }

    inverteOrdem() {
        this._negociacoes.reverse();
    }
}












/*
---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------


    # Anotações:

    - O prefixo _ (underline) para indicar que a lista não deve ser alterada.


---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
*/
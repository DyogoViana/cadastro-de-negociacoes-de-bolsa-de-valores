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
}











//Dicas e anexos:
// O prefixo _ (underline) para indicar que a lista não deve ser alterada.
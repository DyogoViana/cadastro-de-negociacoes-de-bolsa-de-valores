// ListaNegociacoes.js




// Cria lista de negociações.
class ListaNegociacoes {

    constructor(armadilha) {

        this._negociacoes = [];
        this._armadilha = armadilha;
        this._contexto = contexto;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        // this._armadilha(this);
        Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvaziaTabela() {
        this._negociacoes = [];
        // this._armadilha(this);
        Reflect.apply(this._armadilha, this._contexto, [this]);
    }
}











//Dicas e anexos:
// O prefixo _ (underline) para indicar que a lista não deve ser alterada.
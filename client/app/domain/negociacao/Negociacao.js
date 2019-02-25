// client/app/domain/negociacao/Negociacao.js

class Negociacao {

    constructor (data, quantidade, valor) {

        this._data = data; // Data atual.
        this._quantidade = quantidade;
        this._valor = valor;
    }

    //  Métodos acessadores.
    getData () { return this._data; }
    getQuantidade () { return this._quantidade; }
    getValor () { return this._valor; }
    getVolume () { return this._quantidade * this._valor; }
}










// o 'underline' indica ao programador que não pode ser alterada a propriedade.

// 'getData' = método acessadores (página 27).
// client/app/models/Negociacao.js



class Negociacao {

    constructor(data, quantidade, valor) {

        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;

        Object.freeze(this);
    }

    
    // Métodos acessadores.
    get volume() { return this._quantidade * this._valor; }
    get data() { return new Date(this._data.getTime()); }
    get quantidade() { return this._quantidade; }
    get valor() { return this._valor; }
}







/*
---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
    
    
    # Anotações:
    
    - o 'underline' indica ao programador que não pode ser alterada a propriedade.

    - 'getData' = método acessadores.


---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
*/
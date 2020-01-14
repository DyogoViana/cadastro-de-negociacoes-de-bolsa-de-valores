// client/app/models/Negociacao.js



export class Negociacao {

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


    // Pode ser reaproveitado no restante do projeto. Ex: NegociacaoService -- importar lista atual.
    isEquals(outraNegociacao) {
        return JSON.stringify(this) == JSON.stringify(outraNegociacao)
    }
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
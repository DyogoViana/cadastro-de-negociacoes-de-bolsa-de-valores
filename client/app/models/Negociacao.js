// client/app/models/Negociacao.js



class Negociacao {

    constructor() {
        this.data = new Date();
        this.quantidade = 1;
        this.valor = 0.0;
    }
}






// class Negociacao {

//     constructor(_data, _quantidade, _valor) {

//         Object.assign(this, { _quantidade, _valor })
//         this._data = new Date(_data.getTime()),
//         Object.freeze(this); // Objeto imutável, não pode ser editado.
//     }

//     //  Métodos acessadores.
//     get data() { return new Date (this._data.getTime ());}
//     get quantidade() { return this._quantidade;}
//     get valor() { return this._valor;}
//     get volume() { return this._quantidade * this._valor;}
// }










// o 'underline' indica ao programador que não pode ser alterada a propriedade.

// 'getData' = método acessadores (página 27).
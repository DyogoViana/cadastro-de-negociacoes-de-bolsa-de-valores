"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// DateHelper.js


// Classe para criação da data de negociação.
var DateHelper = exports.DateHelper = function () {
    function DateHelper() {
        _classCallCheck(this, DateHelper);

        throw new Error("Esta classe não pode ser instanciada.");
    }

    // escreve a data num formato padrão ao usuário.
    // a data sai errada pq o Date guarda de 0 ~ 11.


    _createClass(DateHelper, null, [{
        key: "dataParaTexto",
        value: function dataParaTexto(data) {
            return data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
        }
    }, {
        key: "textoParaData",
        value: function textoParaData(texto) {
            // Expressão regular para validar a data no formato certo -- fail fast.
            // A linha com o throw new só será executada se o if for falso, por isso, o sinal de !.
            if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
                throw new Error("Deve está no formato aaaa-mm-dd.");
            }

            return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(texto.split("-").map(function (item, indice) {
                return item - indice % 2;
            })))))();
        }
    }]);

    return DateHelper;
}();

/* 
    # Anotações:

    - Agora com o static o 'DateHelper' pode ser chamado como uma class. Assim evita repetição.

*/
//# sourceMappingURL=DateHelper.js.map
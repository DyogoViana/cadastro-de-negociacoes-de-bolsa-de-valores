"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ProxyFactory.js


// Reaproveita o modelo de Proxy.
var ProxyFactory = exports.ProxyFactory = function () {
    function ProxyFactory() {
        _classCallCheck(this, ProxyFactory);
    }

    _createClass(ProxyFactory, null, [{
        key: "novaProxy",
        value: function novaProxy(objeto, propriedades, acao) {
            return new Proxy(objeto, {
                get: function get(target, property, receiver) {

                    if (propriedades.includes(property) && _typeof(target[property]) == (typeof Function === "undefined" ? "undefined" : _typeof(Function))) {
                        return function () {
                            console.log("A propriedade \"" + property + "\" foi interceptada usando Proxy.");
                            var retorno = Reflect.apply(target[property], target, arguments);
                            acao(target);
                            return retorno;
                        };
                    }

                    return Reflect.get(target, property, receiver);
                },
                set: function set(target, property, value, receiver) {
                    if (propriedades.includes(property)) {
                        target[property] = value;
                        acao(target);
                    }

                    return Reflect.set(target, property, value, receiver);
                }
            });
        }
    }]);

    return ProxyFactory;
}();
//# sourceMappingURL=ProxyFactory.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Bind = undefined;

var _ProxyFactory = require("../services/ProxyFactory");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Bind.js


var Bind = exports.Bind = function Bind(model, view) {
    _classCallCheck(this, Bind);

    for (var _len = arguments.length, properties = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        properties[_key - 2] = arguments[_key];
    }

    var proxy = _ProxyFactory.ProxyFactory.novaProxy(model, properties, function (model) {
        view.update(model);
    });

    view.update(model);
    return proxy;
};
//# sourceMappingURL=Bind.js.map
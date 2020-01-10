"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, HttpService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("HttpService", HttpService = function () {
                function HttpService() {
                    _classCallCheck(this, HttpService);
                }

                _createClass(HttpService, [{
                    key: "_handleErros",
                    value: function _handleErros(resposta) {
                        if (!resposta.ok) throw new Error(resposta.statusText); // se der erro.
                        return resposta; // se tiver certo.
                    }
                }, {
                    key: "get",
                    value: function get(url) {
                        var _this = this;

                        return fetch(url).then(function (resposta) {
                            return _this._handleErros(resposta);
                        }).then(function (resposta) {
                            return resposta.json();
                        });
                    }
                }, {
                    key: "post",
                    value: function post(url, dado) {
                        var _this2 = this;

                        return fetch(url, {
                            headers: { "Content-type": "application/json" },
                            method: "post",
                            body: JSON.stringify(dado)
                        }).then(function (resposta) {
                            return _this2._handleErros(resposta);
                        }); // Em caso de erros.
                    }
                }]);

                return HttpService;
            }());

            _export("HttpService", HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map
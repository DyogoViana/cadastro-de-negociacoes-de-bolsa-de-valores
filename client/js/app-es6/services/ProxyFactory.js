// ProxyFactory.js


// Reaproveita o modelo de Proxy.
class ProxyFactory {

    static  novaProxy(objeto, propriedades, acao) {
        return new Proxy(objeto, {
            
            get (target, property, receiver) {
                
                if (propriedades.includes(property) && typeof(target[property]) == typeof(Function)) {
                    return function() {
                        console.log(`A propriedade "${property}" foi interceptada usando Proxy.`);
                        let retorno = Reflect.apply(target[property], target, arguments);
                        acao(target);
                        return retorno;
                    }
                }

                return Reflect.get(target, property, receiver);
            },

            set (target, property, value, receiver) {
                if (propriedades.includes(property)) {
                    target[property] = value;
                    acao(target);
                }

                return Reflect.set(target, property, value, receiver);
            }
        })
    }
}
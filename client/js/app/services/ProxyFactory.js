// ProxyFactory.js


// Reaproveita o modelo de Proxy.
class ProxyFactory {

    static  novaProxy(objeto, propriedades, acao) {
        return new Proxy(objeto, {
            
            get (target, property, receiver) {
                
                if (propriedades.includes(property) && typeof(target[property]) == typeof(Function)) {
                    return function() {
                        console.log(`A propriedade - "${property}" - foi interceptada usando Proxy.`);
                        Reflect.apply(target[property], target, arguments);
                        return acao(target);
                    }
                }

                return Reflect.get(target, property, receiver);
            }
        })
    }
}
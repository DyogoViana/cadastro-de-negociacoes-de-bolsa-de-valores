// Bind.js



class Bind {

    constructor(model, view, ...properties) {
        
        let proxy = ProxyFactory.novaProxy(model, properties, model => {
            view.update(model);
        });

        view.update(model);
        return proxy;
    }
}
// NegociacaoService.js



// Importando negociações via Ajax.

/*
    -- Estados da requisição AJAX: --
    0: Requisição ainda não iniciada
    1: Conexão com o servidor estabelecida
    2: Requisição recebida
    3: Processando requisição
    4: Requisição está concluída e a resposta está pronta
*/

class NegociacaoService {


    // Obtêm as negociações da semana RETRASADA.
    obterNegociacoesDaSemanaRetrasada() {
        
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "negociacoes/retrasada");
            
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText).map(objeto => new Negociacao(
                            new Date(objeto.data), objeto.quantidade, objeto.valor)));
    
                         console.log("Obtendo as negociação do servidor.");
                    } else {
                        reject("NÃO foi possível obter as negociações da semana retrasada.");
                        console.log("NÃO foi possível obter as negociações do servidor, da semana retrasada.");
                        console.log(xhr.responseText);
                    }
                }
            };

            xhr.send();
        });
    }



    // Obtêm as negociações da semana ANTERIOR.
    obterNegociacoesDaSemanaAnterior() {
        
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "negociacoes/anterior");
            
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText).map(objeto => new Negociacao(
                            new Date(objeto.data), objeto.quantidade, objeto.valor)));
    
                         console.log("Obtendo as negociação do servidor.");
                    } else {
                        reject("NÃO foi possível obter as negociações da semana anterior.");
                        console.log("NÃO foi possível obter as negociações do servidor, da semana anterior.");
                        console.log(xhr.responseText);
                    }
                }
            };

            xhr.send();
        });
    }


    // Obtêm as negociações da semana.
    obterNegociacoesDaSemana() {
        
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "negociacoes/semana");
            
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText).map(objeto => new Negociacao(
                            new Date(objeto.data), objeto.quantidade, objeto.valor)));
    
                         console.log("Obtendo as negociação do servidor.");
                    } else {
                        reject("NÃO foi possível obter as negociações da semana.");
                        console.log("NÃO foi possível obter as negociações do servidor.");
                        console.log(xhr.responseText);
                    }
                }
            };

            xhr.send();
        });
    }


    // Obtêm as negociações da semana.
    obterNegociacoesDaSemana() {
        
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "negociacoes/semana");
            
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText).map(objeto => new Negociacao(
                            new Date(objeto.data), objeto.quantidade, objeto.valor)));
    
                         console.log("Obtendo as negociação do servidor.");
                    } else {
                        reject("NÃO foi possível obter as negociações da semana.");
                        console.log("NÃO foi possível obter as negociações do servidor.");
                        console.log(xhr.responseText);
                    }
                }
            };

            xhr.send();
        });
    }
}


/*
    # Anotações:

    - Endereços do servidor -- 'negociacoes/semana', 'negociacoes/anterior', 'negociacoes/retrasada'

*/
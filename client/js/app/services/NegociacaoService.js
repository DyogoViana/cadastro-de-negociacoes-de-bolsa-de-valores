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

    // Obtêm as negociações da semana.
    obterNegociacoesDaSemana(callback) {
        
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "negociacoes/semana");
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {

                if (xhr.status == 200) {
                    callback(null, JSON.parse(xhr.responseText).map(objeto => new Negociacao(
                        new Date(objeto.data), objeto.quantidade, objeto.valor)));

                     console.log("Obtendo as negociação do servidor.");
                } else {
                    callback("NÃO foi possível obter as negociações da semana.", null);
                    console.log("NÃO foi possível obter as negociações do servidor.");
                    console.log(xhr.responseText);
                }
            }
        }

        xhr.send();
    }
}
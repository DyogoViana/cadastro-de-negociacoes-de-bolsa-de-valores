// HttpService.js



// Importando negociações via Ajax.
/*
    -- Estados da requisição AJAX: --
    0: Requisição ainda não iniciada
    1: Conexão com o servidor estabelecida
    2: Requisição recebida
    3: Processando requisição
    4: Requisição está concluída e a resposta está pronta
*/


class HttpService {

    _handleErros(resposta) {
        if (!resposta.ok) throw new Error(resposta.statusText); // se der erro.
        return resposta; // se tiver certo.
    }


    get(url) {

        return fetch(url)
         .then(resposta => this._handleErros(resposta))
         .then(resposta => resposta.json())
    }

    
    post(url, dado) {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open("POST", url, true);
            xhr.setRequestHeader("content-type", "application/json");
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };

            xhr.send(JSON.stringify(dado));
        });
    }
}


/*
---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------


    # Anotações:

    - Usando 'JSON.stringifly' para converter objeto em uma string no formato JSON.


---------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
*/
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

    get(url) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    }else {
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
                    }
                }
            };

            xhr.send();
        });
    }

    post(url, dado) {

        return new Promise((resolve, reject) => {
            let xhr = XMLHttpRequest();

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
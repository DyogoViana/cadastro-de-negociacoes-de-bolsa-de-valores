// NegociacaoController.js


class NegociacaoController {
    
    constructor() {

        let $ = document.querySelector.bind(document);
    
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

    }

    adiciona(event) {

        event.preventDefault();

        //data
        let data = new Date(...
            this._inputData.value
            .split("-")
            .map((item, indice) => item - indice % 2) 
        );
        
        //negociação
        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );

        console.log(negociacao);
    }
}






// Dicas:

// spread operator -- São as reticências antes do _this_. indica que ele desmenbrará o array e posiciona na mesma ordem no construtor.

// item - indice % 2 -- ler item, menos indice, módulo dois.
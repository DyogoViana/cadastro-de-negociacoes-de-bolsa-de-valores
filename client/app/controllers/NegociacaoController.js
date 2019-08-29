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

        //negociação
        let negociacao = new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
        
        console.log(negociacao);
        console.log(DateHelper.dataParaTexto(negociacao.data));
    }
}






// Dicas:

// spread operator -- São as reticências antes do _this_. indica que ele desmenbrará o array e posiciona na mesma ordem no construtor.

// item - indice % 2 -- ler item, menos indice, módulo dois.
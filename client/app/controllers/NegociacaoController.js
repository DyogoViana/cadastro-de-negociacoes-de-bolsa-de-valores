// NegociacaoController.js


class NegociacaoController {
    
    constructor() {

        let $ = document.querySelector.bind(document);
    
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._listaNegociacoes = new ListaNegociacoes();

    }

    adiciona(event) {

        event.preventDefault();
        
        this._listaNegociacoes.adiciona(this._criaNegociacao()); // Lista as negociações.
        this._limpaFormulario();

        console.log(this._listaNegociacoes.negociacoes);
    }

    //cria uma negociação.
    _criaNegociacao() {
        return new Negociacao (
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    // Limpa o formulário e o foco vai para a data.
    _limpaFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}






// Dicas:

// spread operator -- São as reticências antes do _this_. indica que ele desmenbrará o array e posiciona na mesma ordem no construtor.

// item - indice % 2 -- ler item, menos indice, módulo dois.
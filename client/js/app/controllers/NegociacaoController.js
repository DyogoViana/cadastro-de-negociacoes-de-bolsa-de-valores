// NegociacaoController.js


class NegociacaoController {
    
    constructor() {

        let $ = document.querySelector.bind(document);
    
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        // Proxy para criação da trap no 'adiciona' e 'esvazia'.
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), // modelo
            new NegociacoesView($("#negociacoesView")), // view.
            "adiciona", "esvazia"); // Condição para atualizar. Props que vão disparar a 'View'.

        // Mensagem que aparece ao usuário.
        this._mensagem = new Bind(
            new Mensagem(), // modelo.
            new MensagemView($("#mensagemView")), // view.
            "texto"); // Condição para atualizar. Props que vão disparar a 'View'.
    }

    // Adiciona uma nova lista de negociação.
    adiciona(event) {
        event.preventDefault();
        
        this._listaNegociacoes.adiciona(this._criaNegociacao()); // Lista as negociações.
        this._mensagem.texto = "Negociação adicionada com sucesso.";
        this._limpaFormulario();
    }

    // Importando negociações via Ajax, com o padrão de projeto 'Promise'.
    importaNegociacoes() {

        let service = new NegociacaoService();
        service
         .obterNegociacoes()
         .then(negociacoes => negociacoes.forEach(negociacao => {
           this._listaNegociacoes.adiciona(negociacao);
           this._mensagem.texto = "Negociações do período importadas."  
         }))
         .catch(erro => this._mensagem.texto = erro);
    }

    // Apaga a tabela de negociações.
    apaga() {
        this._listaNegociacoes.esvaziaTabela();
        this._mensagem.texto = "Negociações apagadas com sucesso.";
        console.log("Negociações apagadas com sucesso.");  
    }

    //cria uma negociação.
    _criaNegociacao() {
        return new Negociacao (
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    // Limpa o formulário e o foco vai para a data, após adicionar uma negociação.
    _limpaFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}






/*
    # Anotações:

    - spread operator -- São as reticências antes do _this_. indica que ele desmenbrará o array e posiciona na mesma ordem no construtor.

    - item - indice % 2 -- ler item, menos indice, módulo dois.

*/
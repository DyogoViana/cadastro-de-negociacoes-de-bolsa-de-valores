// NegociacaoController.js


class NegociacaoController {
    
    constructor() {
        let $ = document.querySelector.bind(document);
    
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        // Proxy para criação da trap no 'adiciona' e 'esvazia'.
        this._listaNegociacoes = ProxyFactory.novaProxy(
            new ListaNegociacoes(), ["adiciona", "esvazia"], model => this._negociacoesView.update(model));

        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = ProxyFactory.novaProxy(
            new Mensagem(), ["texto"], model => this._mensagemView.update(model));

        this._mensagemView = new MensagemView($("#mensagemView"));
        // this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();
        
        this._listaNegociacoes.adiciona(this._criaNegociacao()); // Lista as negociações.
        this._mensagem.texto = "Negociação adicionada com sucesso.";
        this._limpaFormulario();
    }

    // Apaga a tabela de negociações.
    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso.";
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






// Dicas:

// spread operator -- São as reticências antes do _this_. indica que ele desmenbrará o array e posiciona na mesma ordem no construtor.

// item - indice % 2 -- ler item, menos indice, módulo dois.
// NegociacaoController.js




// Importações dos Models.
import { ListaNegociacoes } from "../models/ListaNegociacoes";
import { Mensagem } from "../models/Mensagem";
import { Negociacao } from "../models/Negociacao";

// Importações das Views.
import { NegociacoesView } from "../views/NegociacoesView";
import { MensagemView } from "../views/MensagemView";

// Importação dos Services.
import { NegociacaoService } from "../services/NegociacaoService";

// Importações dos Helpers.
import { DateHelper } from "../helpers/DateHelper";
import { Bind } from "../helpers/Bind";



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
            "adiciona", "esvaziaTabela", "ordena", "inverteOrdem"); // Condição para atualizar. Props que vão disparar a 'View'.

        // Mensagem que aparece ao usuário.
        this._mensagem = new Bind(
            new Mensagem(), // modelo.
            new MensagemView($("#mensagemView")), // view.
            "texto"); // Condição para atualizar. Props que vão disparar a 'View'.
        
        this._service = new NegociacaoService();
        
        this._iniciacaoAutomatica();        
    }
        

    
    _iniciacaoAutomatica() {
        // Cria uma conexão e lista as negociações na view.
        this._service
         .lista()
         .then(negociacoes =>
             negociacoes.forEach(negociacao =>
                 this._listaNegociacoes.adiciona(negociacao)))
         .catch(erro => {
             console.log(erro);
             this._mensagem.texto = erro;
         })
        
         setInterval(() => {
            this.importaNegociacoes();
        }, 3000); // Intervalos onde são importadas as impostações das negociações.
    }

    // Ordena a tabela. 
    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] -b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    // Adiciona uma nova lista de negociação.
    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
         .cadastra(negociacao)
         .then(mensagem => {
             this._listaNegociacoes.adiciona(negociacao);
             this._mensagem.texto = mensagem;
             console.log("Negociação adicionada com sucesso.");
             this._limpaFormulario();
         })
         .catch(erro => this._mensagem.texto = erro);
    }

    // Importando negociações via Ajax, com o padrão de projeto 'Promise'.
    importaNegociacoes() {

        this._service
         .importa(this._listaNegociacoes.negociacoes)
         .then(negociacoes =>
            negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = "Negociações do período importadas com sucesso.";
                console.log("Negociações do perído importadas com sucesso, usando Promise.");
         }))
         .catch(erro => this._mensagem.texto = erro);
    }

    // Apaga a tabela de negociações na view e no banco.
    apaga() {
        this._service
         .apaga()
         .then(mensagem => {
             this._listaNegociacoes.esvaziaTabela();
             this._mensagem.texto = mensagem;
             console.log("Negociações apagadas com sucesso.");  
         })
         .catch(erro => this._mensagem.texto = erro);
    }

    //cria uma negociação.
    _criaNegociacao() {
        return new Negociacao (
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
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



let negociacaoController = new NegociacaoController();

export function currentInstance() {
    return negociacaoController;
}













/*
    # Anotações:

    - spread operator -- São as reticências antes do _this_. indica que ele desmenbrará o array e posiciona na mesma ordem no construtor.

    - item - indice % 2 -- ler item, menos indice, módulo dois.

    - explicando a ordem das colunas: 
        lista.sort((a, b) => a - b);  
        Se o valor retornado for 0 não há alteração a ser feita, se o valor retornado for positivo, 'b' deve vir antes de 'a', se o valor for negativo, 'a' deve vir antes de 'b'.
*/
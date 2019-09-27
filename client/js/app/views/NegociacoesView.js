// NegociacoesView.js




class NegociacoesView {

    constructor(elemento) {
        this._elemento = elemento; // responsável por receber o template.
    }

    _template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
                ${model.negociacoes.map( n => { // 'n' = negociação.
                    return `
                    <tr>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                        `
                }).join("")}
            </tbody>
        </table>
        `;
    }

    // Pega o elemento do DOM e atualiza a tabela -- _template.
    update(model) {
        this._elemento.innerHTML = this._template(model);
    }
}







// Anotações: 

// O 'innerHTML' será responsável por converter as strings em elementos do DOM. Isto será inserido com filho da <div>.

// 'Join' = Concatena todos os dados do array e vira uma string.

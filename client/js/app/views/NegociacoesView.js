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
                ${model.negociacoes.map( n => // 'n' = negociação.
                    `
                        <tr>
                            <td>${DateHelper.dataParaTexto(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>${n.valor}</td>
                            <td>${n.volume}</td>
                        </tr>

                    `).join("")}
            </tbody>

            <tfoot>
                // totalizar o volume.
                <td colspan="3" style="text-align:right"><b>Total</b></td>
                <td>
                    ${
                        (function() {
                            let total = 0;
                            model.negociacoes.forEach(n => total += n.volume);
                            return total;
                        })()
                    }
                </td>
            </tfoot>
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

// Por ser uma arrow function, pode retirar o 'return' e as chaves. 

// Immediately-invoked function expression - "IIFE" -  ou a função imediata.

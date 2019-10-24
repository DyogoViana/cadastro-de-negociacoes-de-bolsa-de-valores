// NegociacoesView.js




class NegociacoesView extends View {

    constructor(elemento) {
        super (elemento);
    }

    template(model) {
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
                ${model.negociacoes.map( n => // 'n' = negociação - Elementos da lista.
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
                <td colspan="3" style="text-align:right"><b>Total</b></td>
                <td>
                    ${ model.negociacoes.reduce((total, n) => total + n.volume, 0.0) }
                </td>
            </tfoot>
        </table>
        `;
    }
}







// Anotações: 

// O 'innerHTML' será responsável por converter as strings em elementos do DOM. Isto será inserido com filho da <div>.

// 'Join' = Concatena todos os dados do array e vira uma string.

// Por ser uma arrow function, pode retirar o 'return' e as chaves. 

// Immediately-invoked function expression - "IIFE" -  ou a função imediata.

// NegociacoesView extends View === 'NegociacoesView' herda as propriedades do 'View', assim n precisa repetir código. 
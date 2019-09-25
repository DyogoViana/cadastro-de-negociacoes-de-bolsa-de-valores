// NegociacoesView.js




class NegociacoesView {

    constructor(elemento) {
        this._elemento = elemento; // responsável por receber o template.
    }

    _template() {
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
            </tbody>
        </table>
        `;
    }

    // Pega o elemento do DOM e atualiza a tabela -- _template.
    update() {
        this._elemento.innerHTML = this._template();
    }
}







// Anotações: 

// O 'innerHTML' será responsável por converter as strings em elementos do DOM. Isto será inserido com filho da <div>.


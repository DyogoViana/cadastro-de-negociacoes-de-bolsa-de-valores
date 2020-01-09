// DateHelper.js


// Classe para criação da data de negociação.
class DateHelper {

    constructor() {
        throw new Error("Esta classe não pode ser instanciada.");
    }

    // escreve a data num formato padrão ao usuário.
    // a data sai errada pq o Date guarda de 0 ~ 11.
    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        // Expressão regular para validar a data no formato certo -- fail fast.
        // A linha com o throw new só será executada se o if for falso, por isso, o sinal de !.
        if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
            throw new Error("Deve está no formato aaaa-mm-dd.");
        }

        return new Date(...texto.split("-").map((item, indice) => item - indice % 2));
    }
}



/* 
    # Anotações:

    - Agora com o static o 'DateHelper' pode ser chamado como uma class. Assim evita repetição.

*/
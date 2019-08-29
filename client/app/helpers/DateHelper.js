// DateHelper.js


// Classe para criação da data de negociação.
class DateHelper {

    constructor() {
        throw new Error("Esta classe não pode ser instanciada.");
    }

    // escreve a data num formato padrão ao usuário.
    // a data sai errada pq o Date guarda de 0 ~ 11.
    static dataParaTexto(data) {
       return data.getDate()
            + "/" + (data.getMonth() + 1)
            + "/" + data.getFullYear();
    }

    static textoParaData(texto) {
        return new Date(...texto.split("-").map((item, indice) => item - indice % 2));
    }
}


// Anotações:
// Agora com o static o 'DateHelper' pode ser chamado como uma class. Assim evita repetição.
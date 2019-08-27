// DateHelper.js


// Classe para criação da data de negociação.
class DateHelper {

    // escreve a data num formato padrão ao usuário.
    // a data sai errada pq o Date guarda de 0 ~ 11.
    dataParaTexto(data) {
       return data.getDate()
            + "/" + (data.getMonth() + 1)
            + "/" + data.getFullYear();
    }

    textoParaData(texto) {
        return new Date(...texto.split("-").map((item, indice) => item - indice % 2));
    }
}
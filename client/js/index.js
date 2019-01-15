// client/js/index.js
var campos = [
    document.querySelector ("#data"),
    document.querySelector ("#valor"),
    document.querySelector ("#quantidade")
];

console.log (campos); // verificando o conteúdo do array.

// precisamos de tbody,	pois ele receberá a <tr> que vamos construir.
var tbody = document.querySelector ("table tbody");

document.querySelector (".form").addEventListener ("submit", function (event) {

    // Cancelando a submissão do formulário.
    event.preventDefault ();

    var tr = document.createElement ("tr");

    campos.forEach (function (campo) {

        // cria uma <td> sem informações.
        var td = document.createElement ("td");
        td.textContent = campo.value;
        tr.appendChild (td);
    });

    // Nova <td> que aramazenará o volume da negociação.
    var tdVolume = document.createElement ("td");
    // As posições 1 e 2 do array armazenam os campos de quantidade e valor, respectivamente. 
    tdVolume.textContent = campos [1].value * campos [2].value;
    // Adicionando a <td> que faltava à <tr>.
    tr.appendChild (tdVolume);
    // Adicionando a <tr>.
    tbody.appendChild (tr);

    // Limpa o campo da data.
    campos[0].value = "";
    //Limpa o campo de quantidade.
    campos[1].value = 1;
    //Limpa o campo de valor.
    campos[2].value = 0;

    //  Foca no campo de data.
    campos[0].focus();
});
var getNegociacoes = (dataAtual, dataAnterior, dateRetrasada) => [
    { data : dataAtual, quantidade : 1, valor : 150},
    { data : dataAtual, quantidade : 2, valor : 250},
    { data : dataAtual, quantidade : 3, valor : 350},
    { data : dataAnterior, quantidade : 1, valor : 450},
    { data : dataAnterior, quantidade : 2, valor : 550},
    { data : dataAnterior, quantidade : 3, valor : 650},
    { data : dateRetrasada, quantidade : 1, valor : 750},
    { data : dateRetrasada, quantidade : 2, valor : 950},
    { data : dateRetrasada, quantidade : 3, valor : 950}
  ];

module.exports = getNegociacoes
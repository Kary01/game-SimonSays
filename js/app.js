const celeste = document.getElementById('celeste');
const naranja = document.getElementById('naranja');
const amarillo = document.getElementById('amarillo');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');

class Juego {
    constructor(){
        this.inicializar();
    };

    inicializar(){
        btnEmpezar.classList.add('hide');
    };
};

function empezarJuego(){
    var juego = new Juego();
};
// referencias a elementos de html
const celeste = document.getElementById('celeste');
const naranja = document.getElementById('naranja');
const amarillo = document.getElementById('amarillo');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');

// control de los elementos html
class Juego {
    constructor(){ // se crea el constructor y ejecuta sus funciones
        this.inicializar();
        this.generarSecuencia();
    };

    // atributos básicos del juego
    inicializar(){
        btnEmpezar.classList.add('hide'); // oculta el botón de inicio
        this.nivel = 1; // indica el nivel del juego
        this.colores = { // creamos objetos para tenr un mejor control de los elementos
            celeste, 
            naranja, 
            amarillo, 
            verde
        };
    };

    // secuencia con números aleatorios que representarán el color de cada botón
    generarSecuencia(){
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4));
    };
};

// al seleccionar el botón de inicio crea el elemento de clase Juego
function empezarJuego(){
    window.juego = new Juego();
};
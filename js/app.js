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
        this.siguienteNivel();
    };

    // atributos básicos del juego
    inicializar(){
        btnEmpezar.classList.add('hide'); // oculta el botón de inicio
        this.nivel = 4; // indica el nivel del juego
        this.colores = { // creamos objetos para tenr un mejor control de los elementos
            celeste, 
            naranja, 
            amarillo, 
            verde
        };
    };

    // secuencia con números aleatorios que representarán el color de cada botón
    generarSecuencia(){
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random()*4));
    };

    // cada que se pase al siguiente nivel, iluminará una secuencia
    siguienteNivel(){
        this.iluminarSecuencia();
    }; 

    //pasamos los número de la secuencia a colores
    NumeroColor(numero){
        switch (numero) {
            case 0:
                return 'celeste';
            case 1:
                return 'naranja';
            case 2:
                return 'amarillo';
            case 3:
                return 'verde';
        };
    };

    // la función recorrerá y transformará los números aleatorios a colores 
    iluminarSecuencia(){
        for (let i = 0; i < this.nivel; i++) {
            const COLOR = this.NumeroColor(this.secuencia[i]);
           setTimeout(() => this.iluminarColor(COLOR), 1000 * i);
        };
    };

    // cambia el color del botón añadiendo la clase "light"
    iluminarColor(COLOR){
        this.colores[COLOR].classList.add('light');
        setTimeout(() => this.apagarColor(COLOR), 350);
    };

    // vuelve a su color original después de cierto tiempo
    apagarColor(COLOR){
        this.colores[COLOR].classList.remove('light')
    }
};

// al seleccionar el botón de inicio crea el elemento de clase Juego
function empezarJuego(){
    window.juego = new Juego();
};
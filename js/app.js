// referencias a elementos de html
const celeste = document.getElementById('celeste');
const naranja = document.getElementById('naranja');
const amarillo = document.getElementById('amarillo');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 5;

// control de los elementos html
class Juego {
    constructor(){ // se crea el constructor y ejecuta sus funciones
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia();
        setTimeout(this.siguienteNivel, 500);
    };

    // atributos básicos del juego
    inicializar(){
        this.elegirColor = this.elegirColor.bind(this); //podemos identificar cual botón ha sido presionado
        this.siguienteNivel = this.siguienteNivel.bind(this); //bind ayuda a que this pase a ser el juego y no window
        this.toggleBtnEmpezar();
        this.nivel = 1; // indica el nivel del juego
        this.colores = { // creamos objetos para tenr un mejor control de los elementos
            celeste, 
            naranja, 
            amarillo, 
            verde
        };
    };

    //mostrar u ocultar el botón de inicio
    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide')) { //condición si contiene la clase
            btnEmpezar.classList.remove('hide'); // mostrar el botón de inicio
        } else {
            btnEmpezar.classList.add('hide'); // oculta el botón de inici
        };
    };

    // secuencia con números aleatorios que representarán el color de cada botón
    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4));
    };

    // cada que se pase al siguiente nivel, iluminará una secuencia
    siguienteNivel(){
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventoClick();
    }; 

    // pasamos los número de la secuencia a colores
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

    // pasamos los colores de la secuancia a números 
    ColorNumero(color){
        switch (color) {
            case 'celeste':
                return 0;
            case 'naranja':
                return 1;
            case 'amarillo':
                return 2;
            case 'verde':
                return 3;
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
        this.colores[COLOR].classList.remove('light');
    }

    // selección de color al hacer click
    agregarEventoClick(){
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
        this.colores.amarillo.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
    };

    //verificando el color elegido
    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
        this.colores.amarillo.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
    };

    //condición para pasar de nivel
    elegirColor(ev){
        const NOMBRE_COLOR = ev.target.dataset.color;
        const NUMERO_COLOR = this.ColorNumero(NOMBRE_COLOR);
        this.iluminarColor(NOMBRE_COLOR);
        if (NUMERO_COLOR === this.secuencia[this.subnivel]) {
            this.subnivel++;
            if (this.subnivel === this.nivel) {
                this.nivel++;  
                this.eliminarEventosClick();
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    this.ganoElJuego();
                } else {
                    setTimeout(this.siguienteNivel, 1500); //no se incova la función, solo se llama
                };
            };
        }else {
            this.perdioElJuego();
        };
    };

    ganoElJuego(){
        swal("Good job!", "Felicidades! Ganaste el juego 👾", "success")
        .then(this.inicializar);
    };

    perdioElJuego(){
        swal("Upsi! 🤭", "Suerte para la próxima", "error")
        .then(() => {
            this.eliminarEventosClick();
            this.inicializar;
        });
    };

};

// al seleccionar el botón de inicio crea el elemento de clase Juego
function empezarJuego(){
    window.juego = new Juego();
};

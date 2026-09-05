// Detecta de forma moderna si el usuario recargó la página y lo regresa al corazón
const transicionTipo = window.performance.getEntriesByType('navigation')[0]?.type;
if (transicionTipo === 'reload') {
    window.location.href = "index.html";
}

let intervaloPetalos = null;
let intervaloMariposas = null;
let cachedHeight = window.innerHeight;

window.addEventListener('resize', () => {
    cachedHeight = window.innerHeight;
});

function iniciarSecuenciaCampo() {
    setTimeout(() => {
        crearLluviaDePetalos();
    }, 11000);

    setTimeout(() => {
        iniciarBucleMariposas();
    }, 13000);
}

function crearLluviaDePetalos() {
    const contenedor = document.getElementById('contenedor-petalos');
    if (!contenedor) return; 

    const tonosRosa = ['#ff4b72', '#ff6b8b', '#ff8fa3', '#ffb3c1'];

    intervaloPetalos = setInterval(() => {
        const petalo = document.createElement('div');
        petalo.classList.add('petalo');

        const tamano = Math.random() * 13 + 12;
        petalo.style.width = `${tamano}px`;
        petalo.style.height = `${tamano}px`;
        
        // Inicia incluso fuera de los bordes (-10% a 110%) para que el viento los meta a la pantalla
        const posicionInicialX = Math.random() * 120 - 10;
        petalo.style.left = `${posicionInicialX}%`;

        const duracion = Math.random() * 5 + 5;
        petalo.style.animationDuration = `${duracion}s`;

        // Genera una oscilación lateral única para que el viento los mueva hacia los lados de forma aleatoria
        const fuerzaVientoX = Math.random() * 80 + 40; 
        petalo.style.setProperty('--viento-x', `${fuerzaVientoX}px`);

        const colorAleatorio = tonosRosa[Math.floor(Math.random() * tonosRosa.length)];
        petalo.style.background = `linear-gradient(135deg, ${colorAleatorio}, #fff0f3)`;

        petalo.addEventListener('animationend', () => {
            petalo.remove();
        }, { once: true });

        contenedor.appendChild(petalo);
    }, 600); // Ritmo intermedio perfecto y constante
}

function iniciarBucleMariposas() {
    const contenedor = document.getElementById('contenedor-mariposas');
    if (!contenedor) return;

    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            crearUnaMariposa();
        }, i * 1500);
    }

    intervaloMariposas = setInterval(() => {
        crearUnaMariposa();
    }, 3500);
}

function crearUnaMariposa() {
    const contenedor = document.getElementById('contenedor-mariposas');
    if (!contenedor) return;

    const mariposa = document.createElement('div');
    mariposa.classList.add('mariposa');

    const alaIzq = document.createElement('div');
    alaIzq.classList.add('ala-izq');
    
    const alaDer = document.createElement('div');
    alaDer.classList.add('ala-der');
    
    const cuerpo = document.createElement('div');
    cuerpo.classList.add('cuerpo-m');

    mariposa.appendChild(alaIzq);
    mariposa.appendChild(alaDer);
    mariposa.appendChild(cuerpo);

    const alturaTulipanes = cachedHeight - (Math.random() * 180 + 150);
    mariposa.style.top = `${alturaTulipanes}px`;

    if (Math.random() > 0.5) {
        mariposa.style.animationName = 'vueloIzquierdaADerecha';
    } else {
        mariposa.style.animationName = 'vueloDerechaAIzquierda';
    }

    const escala = Math.random() * 0.3 + 0.65;
    mariposa.style.transform = `scale(${escala})`;

    const duracion = Math.random() * 2 + 8; 
    mariposa.style.animationDuration = `${duracion}s`;

    contenedor.appendChild(mariposa);

    mariposa.addEventListener('animationend', () => {
        mariposa.remove();
    }, { once: true });
}

function activarClicTulipanEspecial() {
    const tulipan = document.getElementById('tulipan-turquesa');
    if (!tulipan) return;

    const eventos = ['touchstart', 'click'];
    
    eventos.forEach(evento => {
        tulipan.addEventListener(evento, (e) => {
            e.preventDefault(); 
            
            clearInterval(intervaloPetalos);
            clearInterval(intervaloMariposas);

            const contenedorEscena = document.querySelector('.pantalla-amanecer-completa');
            if (contenedorEscena) {
                contenedorEscena.style.transition = "opacity 1.5s ease-in-out";
                contenedorEscena.style.opacity = "0";

                contenedorEscena.addEventListener('transitionend', () => {
                    contenedorEscena.style.display = "none";
                }, { once: true });
                setTimeout(() => {
        window.location.href = "escena4.html";
    }, 2000);
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    iniciarSecuenciaCampo();
    activarClicTulipanEspecial();
});


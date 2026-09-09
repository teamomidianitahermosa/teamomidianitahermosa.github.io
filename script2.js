// Detecta de forma moderna si el usuario recargó la página y lo regresa al corazón
const transicionTipo = window.performance.getEntriesByType('navigation')[0]?.type;
if (transicionTipo === 'reload') {
    window.location.href = "index.html";
}

const canvas = document.getElementById("lienzoMatrix");
const ctx = canvas.getContext("2d");

let ancho = (canvas.width = window.innerWidth);
let alto = (canvas.height = window.innerHeight);

const tamanoFuente = 14;
const columnas = Math.floor(ancho / tamanoFuente);
const caidaY = Array(columnas).fill(1);

// Fusionamos el nombre y los números en un solo bloque continuo místico
const palabraMatrix = ["D", "I", "A", "N", "I", "T", "A", "2", "5", "5"];

// Decidimos qué columnas llevan el mensaje especial y cuáles el código base
const tipoColumna = Array(columnas).fill(0).map(() => {
    return Math.random() > 0.75 ? "especial" : "binario"; 
});

function dibujarMatrix() {
    // Rastro ultra sutil para que se vea el efecto de velocidad supersónica
    ctx.fillStyle = "rgba(11, 15, 25, 0.06)";
    ctx.fillRect(0, 0, ancho, alto);

    for (let i = 0; i < caidaY.length; i++) {
        let texto = "";
        const yActual = caidaY[i];
        
        if (tipoColumna[i] === "especial") {
            // Lee la cadena DIANITA255 en orden vertical perfecto y repetitivo
            texto = palabraMatrix[yActual % palabraMatrix.length];
            ctx.fillStyle = "rgba(255, 60, 90, 0.65)"; // Resaltado brillante para el nombre
            ctx.font = `600 ${tamanoFuente}px -apple-system, BlinkMacSystemFont, sans-serif`;
        } else {
            // Código binario tradicional de fondo
            texto = Math.random() > 0.5 ? "0" : "1";
            ctx.fillStyle = "rgba(255, 42, 75, 0.22)"; 
            ctx.font = `300 ${tamanoFuente}px -apple-system, BlinkMacSystemFont, sans-serif`;
        }

        const x = i * tamanoFuente;
        const y = yActual * tamanoFuente;

        ctx.fillText(texto, x, y);

        if (y > alto && Math.random() > 0.975) {
            caidaY[i] = 0;
            tipoColumna[i] = Math.random() > 0.75 ? "especial" : "binario";
        }
        caidaY[i]++;
    }
}

// Bucle a máxima velocidad nativa sin frenos (120Hz puros)
function bucleMatrix() {
    dibujarMatrix();
    requestAnimationFrame(bucleMatrix);
}

window.addEventListener("resize", () => {
    ancho = canvas.width = window.innerWidth;
    alto = canvas.height = window.innerHeight;
});

requestAnimationFrame(bucleMatrix);


const textoEscena2 = document.getElementById("texto-escena2");
const corazon3 = document.getElementById("corazon3");
const frase2 = "Y si este corazon sigue latiendo en mas vidas despues de esta";
const fraseFinal = "en mundos tan llenos de sorpresas";

function escribirTextoAltaFluidez(elemento, texto, tiempoPorLetra, callback) {
    let indice = 0;
    elemento.innerHTML = "";
    let ultimoTiempo = 0;

    function render(tiempoActual) {
        if (!ultimoTiempo) ultimoTiempo = tiempoActual;
        const delta = tiempoActual - ultimoTiempo;

        if (delta >= tiempoPorLetra) {
            if (indice < texto.length) {
                elemento.innerHTML += texto.charAt(indice);
                
                if (indice === 2) mostrarCorazon(1);
                if (indice === 6) mostrarCorazon(2);
                if (indice === 10) mostrarCorazon(3);
                if (indice === 14) mostrarCorazon(4);
                if (indice === 18) mostrarCorazon(5);

                indice++;
                ultimoTiempo = tiempoActual;
            } else {
                if (callback) setTimeout(callback, 800);
                return;
            }
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function mostrarCorazon(numero) {
    const corazon = document.getElementById(`corazon${numero}`);
    if (corazon) {
        corazon.classList.add("visible");
    }
}

function transformarTurquesa() {
    const destello = document.querySelector(".linea-destello");
    if (destello) {
        destello.classList.add("animar");
    }
    setTimeout(() => {
        if (corazon3) {
            corazon3.classList.add("turquesa");
            corazon3.addEventListener("click", iniciarFusionPaso5);
            corazon3.addEventListener("touchstart", iniciarFusionPaso5);
        }
    }, 1200);
}

function iniciarFusionPaso5(e) {
    e.preventDefault();
    
    if (canvas) canvas.style.opacity = "0";
    
    // Forzamos que se mantenga el fondo del espacio oscuro de forma permanente
    document.body.classList.add("fondo-espacio");

    document.getElementById("corazon1").style.transform = "translateX(100px) rotate(-45deg) scale(0)";
    document.getElementById("corazon2").style.transform = "translateX(50px) rotate(-45deg) scale(0)";
    document.getElementById("corazon4").style.transform = "translateX(-50px) rotate(-45deg) scale(0)";
    document.getElementById("corazon5").style.transform = "translateX(-100px) rotate(-45deg) scale(0)";
    
    document.getElementById("corazon1").style.opacity = "0";
    document.getElementById("corazon2").style.opacity = "0";
    document.getElementById("corazon4").style.opacity = "0";
    document.getElementById("corazon5").style.opacity = "0";

    setTimeout(() => {
        if (corazon3) corazon3.style.transform = "rotate(-45deg) scale(0)";
        
        const mundo = document.getElementById("mundo");
        if (mundo) {
            mundo.className = "mundo-visible";
        }
        
        // Escribimos el texto largo y AL TERMINAR activamos el botón del planeta mundo
        escribirTextoAltaFluidez(textoEscena2, fraseFinal, 60, () => {
            if (mundo) {
                mundo.addEventListener("click", pasarAPaisajeFinal);
                mundo.addEventListener("touchstart", pasarAPaisajeFinal);
            }
        });
    }, 600);
}


function pasarAPaisajeFinal(e) {
    e.preventDefault();

    // 1. Buscamos el elemento del mundo
    const mundo = document.getElementById("mundo");
    if (!mundo) return;

    // Bloqueamos los toques repetidos para resguardar la animación
    mundo.style.pointerEvents = "none";

    // 2. Creamos el Cohete Ultra-Detallado usando SVG
    const cohete = document.createElement('div');
    cohete.className = 'vector-space-object rocket-silhouette';
    cohete.innerHTML = `
        <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
                <linearGradient id="fuegoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ffcc00" />
                    <stop offset="50%" stop-color="#ff4500" />
                    <stop offset="100%" stop-color="#ff0000" stop-opacity="0" />
                </linearGradient>
            </defs>
            <path d="M16 26 C12 32, 20 32, 16 26" fill="url(#fuegoGrad)" />
            <path d="M16 26 C14 30, 18 30, 16 26" fill="#ffcc00" opacity="0.8" />
            
            <path d="M8 22 L3 25 C2 21, 5 17, 7 16 Z" fill="#007799" />
            <path d="M8 22 L5 24 C5 20, 7 18, 8 17 Z" fill="#00a8cc" />
            
            <path d="M24 22 L29 25 C30 21, 27 17, 25 16 Z" fill="#007799" />
            <path d="M24 22 L27 24 C27 20, 25 18, 24 17 Z" fill="#00a8cc" />
            
            <rect x="13" y="21" width="6" height="2" rx="0.5" fill="#ffffff" />
            
            <path d="M16 3 C21 9, 24 15, 24 22 L8 22 C8 15, 11 9, 16 3 Z" fill="#00f0ff" />
            
            <path d="M9 16 Q16 18 23 16" stroke="#00a8cc" stroke-width="0.5" fill="none" />
            <path d="M11 11 Q16 13 21 11" stroke="#00a8cc" stroke-width="0.5" fill="none" />
            <circle cx="16" cy="18" r="0.5" fill="#ffffff" />
            <circle cx="11" cy="18" r="0.5" fill="#ffffff" />
            <circle cx="21" cy="18" r="0.5" fill="#ffffff" />
            
            <circle cx="16" cy="11" r="3.5" fill="#007799" />
            <circle cx="16" cy="11" r="2.5" fill="#ffffff" />
            
            <path d="M16 3 C18 6, 19.5 8, 19.5 10 L12.5 10 C12.5 8, 14 6, 16 3 Z" fill="#ffffff" />
        </svg>
    `;

    // 3. Creamos el Meteorito con LLAMA FLUIDA Y ORGÁNICA
    const meteorito = document.createElement('div');
    meteorito.className = 'vector-space-object meteor-silhouette';
    meteorito.innerHTML = `
        <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
                <linearGradient id="fuegoMeteorito" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.9" />
                    <stop offset="30%" stop-color="#00a8cc" stop-opacity="0.6" />
                    <stop offset="100%" stop-color="#005f73" stop-opacity="0" />
                </linearGradient>
            </defs>
            <g>
                <path d="M7 16 C 9 12, 18 6, 29 3 C 25 11, 20 20, 16 25 C 15 22, 11 19, 7 16 Z" fill="url(#fuegoMeteorito)" />
                <path d="M9 16 C 11 14, 15 10, 22 7 C 19 12, 16 16, 14 20 C 13 19, 11 17, 9 16 Z" fill="#ffffff" opacity="0.4" />
                <path d="M6 13 Q 14 5 22 2" stroke="#00f0ff" stroke-width="0.8" fill="none" opacity="0.5" stroke-dasharray="4 2" />
                <path d="M13 23 Q 22 15 26 8" stroke="#00f0ff" stroke-width="0.8" fill="none" opacity="0.5" stroke-dasharray="3 3" />
            </g>
            <g class="roca-giratoria">
                <path d="M12 14 C16 13, 19 16, 18 20 C17 24, 14 26, 11 25 C8 24, 6 21, 7 18 C8 15, 9 14, 12 14 Z" fill="#00a8cc" />
                <circle cx="11" cy="18" r="1.5" fill="#005f73" />
                <circle cx="14" cy="21" r="1.8" fill="#005f73" />
                <circle cx="10" cy="22" r="0.8" fill="#005f73" />
                <circle cx="15" cy="17" r="1" fill="#005f73" />
            </g>
        </svg>
    `;

    // Creamos la pantalla de destello
    const flash = document.createElement('div');
    flash.className = 'explosion-flash';

    // Inyectamos los elementos al documento
    document.body.appendChild(cohete);
    document.body.appendChild(meteorito);
    document.body.appendChild(flash);

    // 4. Activamos la trayectoria hacia el centro del mundo
    setTimeout(() => {
        const rectMundo = mundo.getBoundingClientRect();
        const centroX = rectMundo.left + (rectMundo.width / 2);
        const centroY = rectMundo.top + (rectMundo.height / 2);

        // Envío del cohete al centro exacto
        cohete.style.left = `${centroX - 30}px`;
        cohete.style.top = `${centroY - 30}px`;
        cohete.style.transform = `rotate(45deg) scale(0.65)`;

        // Envío del meteorito al centro exacto
        meteorito.style.left = `${centroX - 35}px`; 
        meteorito.style.top = `${centroY - 35}px`;
        meteorito.style.transform = `scale(0.65)`;
    }, 50);

    // 5. Impacto y detonación del flash (Sincronizado a los 2.3 segundos de viaje + 50ms de delay inicial)
    setTimeout(() => {
        flash.classList.add('flash-active');

        cohete.remove();
        meteorito.remove();

        // Transición oculta detrás de la cortina blanca
        setTimeout(() => {
            const principal = document.querySelector(".contenedor-principal2");
            if (principal) {
                principal.style.transition = "opacity 0.4s ease-out";
                principal.style.opacity = "0";
            }
            
            document.body.style.transition = "background-color 0.4s ease-out";
            document.body.style.background = "#ffffff";

            // Saltamos a la siguiente página (escena3.html)
            setTimeout(() => {
                window.location.href = "escena3.html";
            }, 500);

        }, 250);

    }, 2350); 
}







window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        escribirTextoAltaFluidez(textoEscena2, frase2, 90, transformarTurquesa);
    }, 1000);
});


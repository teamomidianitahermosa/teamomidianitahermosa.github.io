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
const frase2 = "Y si este corazon late en mas vidas despues de esta";
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
    
    const principal = document.querySelector(".contenedor-principal2");
    if (principal) {
        principal.style.transition = "opacity 2s ease-in-out";
        principal.style.opacity = "0";
    }
    
    document.body.style.transition = "background-color 2s ease-in-out";
    document.body.style.background = "#ffffff";

    setTimeout(() => {
        window.location.href = "escena3.html";
    }, 2000);
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        escribirTextoAltaFluidez(textoEscena2, frase2, 90, transformarTurquesa);
    }, 1000);
});


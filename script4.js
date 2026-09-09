// Se ejecuta automáticamente apenas carga la escena en el celular
window.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("musica-fondo");
    
    if (audio) {
        // 1. Recuperamos el segundo exacto donde se quedó en la página anterior
        const tiempoGuardado = localStorage.getItem("tiempoMusica");
        
        if (tiempoGuardado) {
            audio.currentTime = parseFloat(tiempoGuardado);
        }

        // 2. Intentamos reproducir el audio de inmediato
        audio.play().catch(error => {
            console.log("Esperando toque para sincronizar audio");
            
            // Si el móvil bloquea el autoplay, sonará al primer toque en la pantalla
            document.body.addEventListener('touchstart', () => {
                audio.play();
            }, { once: true });
        });

        // 3. EVENTO CLAVE: Cada vez que ella toque la pantalla para avanzar en esta escena,
        // guardamos el tiempo actual antes de que la página cambie
        // (Asegúrate de que tus funciones de cambio de página se ejecuten después de esto)
        window.addEventListener("beforeunload", () => {
            localStorage.setItem("tiempoMusica", audio.currentTime);
        });
    }
});


// Detecta de forma moderna si el usuario recargó la página y lo regresa al corazón
const transicionTipo = window.performance.getEntriesByType('navigation')[0]?.type;
if (transicionTipo === 'reload') {
    window.location.href = "index.html";
}

const luna = document.querySelector(".luna");
const contenedorPrincipal = document.querySelector(".contenedor-principal");
const textoEscena1 = document.getElementById("texto-escena1");
const frase1 = "Si existen otros universos";

function escribirTextoAltaFluidez(elemento, texto, tiempoPorLetra) {
    let indice = 0;
    elemento.innerHTML = "";
    let ultimoTiempo = 0;

    function render(tiempoActual) {
        if (!ultimoTiempo) ultimoTiempo = tiempoActual;
        const delta = tiempoActual - ultimoTiempo;

        if (delta >= tiempoPorLetra) {
            if (indice < texto.length) {
                elemento.innerHTML += texto.charAt(indice);
                indice++;
                ultimoTiempo = tiempoActual;
            } else {
                luna.style.cursor = "pointer";
                luna.addEventListener("click", cambiarDePagina);
                luna.addEventListener("touchstart", cambiarDePagina);
                return;
            }
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function cambiarDePagina(e) {
    e.preventDefault();
    contenedorPrincipal.style.transition = "opacity 1.5s ease-in-out";
    contenedorPrincipal.style.opacity = "0";
    setTimeout(() => {
        window.location.href = "escena2.html";
    }, 1500);
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        escribirTextoAltaFluidez(textoEscena1, frase1, 90);
    }, 3000);
});
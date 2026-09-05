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
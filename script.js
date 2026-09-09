// Buscamos todas las líneas nativas del HTML y el detector especial
const lienzoSVG = document.getElementById('lienzo-dibujo');
const detectorCorazon = document.getElementById('detector-corazon');
const pathsNativos = lienzoSVG.querySelectorAll('path:not(#detector-corazon)');
const gusanos = [];

// DETECCIÓN INTELIGENTE DE DISPOSITIVO (Celular vs Computadora)
const esCelular = window.innerWidth < 768;

// CONFIGURACIÓN DE FÍSICAS Y TAMAÑOS ADAPTATIVOS
const LARGO_MAXIMO = 8;          
const VELOCIDAD_ORBITA = 0.015;    

// 🌟 Si es celular, el corazón mide 13.0; si es computadora, mide 21.0
const ESCALA_CORAZON = esCelular ? 8.0 : 18.0;      

const centroX = window.innerWidth / 2;
const centroY = window.innerHeight / 2;

// 🌟 Dimensiones de las letras adaptadas al ancho de la pantalla
const ALTO_LETRA = esCelular ? 280 : 380;  
const ANCHO_LETRA = esCelular ? 150 : 280; 

let tiempoGlobal = 0;
let dedicatoriaActivada = false;

pathsNativos.forEach((path) => {
    gusanos.push({
        elemento: path,
        historialX: [],
        historialY: [],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15,
    });
});

function obtenerPuntoLetra(letra, miIndice, totalGusanos) {
    const inicioX = centroX - ANCHO_LETRA / 2;
    const inicioY = centroY - ALTO_LETRA / 2;

    switch(letra) {
        case 'D': {
            const mitad = totalGusanos / 2;
            if (miIndice < mitad) {
                const p = miIndice / (mitad - 1);
                return { x: inicioX, y: inicioY + p * ALTO_LETRA };
            } else {
                const contIndice = miIndice - mitad;
                const angulo = (-Math.PI / 2) + (contIndice / (mitad - 1)) * Math.PI;
                return { x: inicioX + Math.cos(angulo) * ANCHO_LETRA, y: centroY + Math.sin(angulo) * (ALTO_LETRA / 2) };
            }
        }
        case 'I': {
            const unTercio = Math.floor(totalGusanos / 3);
            if (miIndice < unTercio) { 
                const p = miIndice / (unTercio - 1);
                return { x: inicioX + p * ANCHO_LETRA, y: inicioY };
            } else if (miIndice < unTercio * 2) { 
                const p = (miIndice - unTercio) / (unTercio - 1);
                return { x: inicioX + p * ANCHO_LETRA, y: inicioY + ALTO_LETRA };
            } else { 
                const p = (miIndice - unTercio * 2) / (totalGusanos - unTercio * 2 - 1);
                return { x: centroX, y: inicioY + p * ALTO_LETRA };
            }
        }
        case 'A': {
            const unTercio = Math.floor(totalGusanos / 3);
            if (miIndice < unTercio) { 
                const p = miIndice / (unTercio - 1);
                return { x: inicioX + p * (ANCHO_LETRA / 2), y: (inicioY + ALTO_LETRA) - p * ALTO_LETRA };
            } else if (miIndice < unTercio * 2) { 
                const p = (miIndice - unTercio) / (unTercio - 1);
                return { x: centroX + p * (ANCHO_LETRA / 2), y: inicioY + p * ALTO_LETRA };
            } else { 
                const p = (miIndice - unTercio * 2) / (totalGusanos - unTercio * 2 - 1);
                const izquierdaA = inicioX + 0.25 * ANCHO_LETRA;
                const derechaA = inicioX + 0.75 * ANCHO_LETRA;
                return { x: izquierdaA + p * (derechaA - izquierdaA), y: centroY + ALTO_LETRA * 0.1 };
            }
        }
        case 'N': {
            const unTercio = Math.floor(totalGusanos / 3);
            if (miIndice < unTercio) { 
                const p = miIndice / (unTercio - 1);
                return { x: inicioX, y: inicioY + p * ALTO_LETRA };
            } else if (miIndice < unTercio * 2) { 
                const p = (miIndice - unTercio) / (unTercio - 1);
                return { x: inicioX + p * ANCHO_LETRA, y: inicioY + p * ALTO_LETRA };
            } else { 
                const p = (miIndice - unTercio * 2) / (totalGusanos - unTercio * 2 - 1);
                return { x: inicioX + ANCHO_LETRA, y: inicioY + p * ALTO_LETRA };
            }
        }
        default:
            return { x: centroX, y: centroY };
    }
}

function obtenerPuntoCorazon(angulo) {
    const x = 16 * Math.pow(Math.sin(angulo), 3);
    const y = 13 * Math.cos(angulo) - 5 * Math.cos(2 * angulo) - 2 * Math.cos(3 * angulo) - Math.cos(4 * angulo);
    
    // Ajuste leve hacia arriba en el celular para que no tape el texto inferior
    const desvY = esCelular ? 60 : 40; 
    return {
        x: centroX + x * ESCALA_CORAZON,
        y: (centroY - desvY) - y * ESCALA_CORAZON 
    };
}

// MOTOR GRÁFICO CON CONTROLADOR DE SECUENCIA
function actualizar() {
    tiempoGlobal += VELOCIDAD_ORBITA
    
    const tLetra = 3.0;
    const tCaos = 1.2;
    const tPaso = tLetra + tCaos; 
    const tiempoEnSegundos = tiempoGlobal / (60 * VELOCIDAD_ORBITA);

    let modoDestino = "CAOS";
    let letraActual = "";
    let fuerzaAtraccion = 0.05;
    let rozamiento = 0.86;

    if (tiempoEnSegundos < tPaso * 5) {
        const indiceLetra = Math.floor(tiempoEnSegundos / tPaso);
        const tiempoLetraInterno = tiempoEnSegundos % tPaso;
        const letras = ["D", "I", "A", "N", "A"];
        letraActual = letras[indiceLetra];

        detectorCorazon.style.pointerEvents = "none";
        detectorCorazon.style.cursor = "default";

        if (tiempoLetraInterno < tLetra) {
            modoDestino = "LETRA";
            fuerzaAtraccion = 0.05;
            rozamiento = 0.84;
        } else {
            modoDestino = "CAOS";
            fuerzaAtraccion = 0.001;
            rozamiento = 0.95;
        }
    } else {
        modoDestino = "CORAZON";
        fuerzaAtraccion = 0.06;
        rozamiento = 0.86;

        detectorCorazon.style.pointerEvents = "auto";
        detectorCorazon.style.cursor = "pointer";

        if (!dedicatoriaActivada) {
            dedicatoriaActivada = true;
        
            setTimeout(() => {
                document.getElementById('dedicatoria').classList.add('mostrar')   
            }, 2000);
        };
    }

    gusanos.forEach((g, miIndice) => {
        const sentido = (miIndice % 2 === 0) ? 1 : -1;
        let puntoObjetivo;

        if (modoDestino === "LETRA") {
            const pBase = obtenerPuntoLetra(letraActual, miIndice, gusanos.length);
            const ondaVibrar = Math.sin(tiempoGlobal * 3.5 + miIndice) * 2;
            puntoObjetivo = { x: pBase.x + ondaVibrar, y: pBase.y + ondaVibrar };
        } else {
            const anguloBase = (tiempoGlobal + (miIndice * (Math.PI * 2 / gusanos.length))) * sentido;
            const anguloModulado = anguloBase + Math.sin(tiempoGlobal * 2.5 + miIndice) * 0.14;
            puntoObjetivo = obtenerPuntoCorazon(anguloModulado);
        }

        const dx = puntoObjetivo.x - g.x;
        const dy = puntoObjetivo.y - g.y;

        g.vx += dx * fuerzaAtraccion;
        g.vy += dy * fuerzaAtraccion;

        if (modoDestino === "CAOS") {
            g.vx += (Math.random() - 0.5) * 0.9;
            g.vy += (Math.random() - 0.5) * 0.9;
        }

               // ====== OPTIMIZACIÓN DE VELOCIDAD MÁXIMA ======
        g.vx *= rozamiento;
        g.vy *= rozamiento;

        // Ponemos un tope de velocidad (máximo 25px por fotograma)
        // Esto evita que el procesador se sature en los cambios bruscos de escena
        const vMax = 25;
        const velocidadActual = Math.sqrt(g.vx * g.vx + g.vy * g.vy);
        if (velocidadActual > vMax) {
            g.vx = (g.vx / velocidadActual) * vMax;
            g.vy = (g.vy / velocidadActual) * vMax;
        }

        // Actualizamos las posiciones de forma segura
        g.x += g.vx;
        g.y += g.vy;

        g.historialX.push(g.x);
        g.historialY.push(g.y);
        // =============================================


        if (g.historialX.length > LARGO_MAXIMO) {
            g.historialX.shift();
            g.historialY.shift();
        }

                // Conserva tus 32 gusanitos intactos, pero los procesa de forma ligera
        if (g.historialX.length > 0) {
            let puntos = [];
            for (let i = g.historialX.length - 1; i >= 0; i--) {
                // Math.round elimina los decimales infinitos al instante
                let xSegura = Math.round(g.historialX[i]);
                let ySegura = Math.round(g.historialY[i]);
                puntos.push(`${xSegura},${ySegura}`);
            }
            
            let nuevoDData = "M " + puntos.join(" L ");
            g.elemento.setAttribute('d', nuevoDData);
        }

    });  


    let pathDatosCorazon = "";
    for (let j = 0; j < 60; j++) {
        const miAngulo = (j / 59) * Math.PI * 2;
        const pt = obtenerPuntoCorazon(miAngulo);
        pathDatosCorazon += (j === 0 ? "M " : " L ") + pt.x.toFixed(1) + "," + pt.y.toFixed(1);
    }
    pathDatosCorazon += " Z"; 
    detectorCorazon.setAttribute('d', pathDatosCorazon);

    requestAnimationFrame(actualizar);
}

// Función única que controla el cambio de pantalla
function dispararTransicion() {
    const contenedorAcuario = document.getElementById('acuario');
    contenedorAcuario.classList.add('desvanecer-escena');
    
    setTimeout(() => {
        contenedorAcuario.style.display = 'none';
        iniciarSegundoEscenario();
    }, 1500);
}

// Escuchador para Computadora (Mouse)
detectorCorazon.addEventListener('click', () => {
        const audio = document.getElementById("musica-fondo");
    if (audio) {
           localStorage.setItem("tiempoMusica", audio.currentTime);

        audio.play().catch(error => {
            console.log("El navegador bloqueó el audio temporalmente:", error);
        });
    }
    dispararTransicion();

  
});


// Soporta toques en pantallas táctiles de celulares
detectorCorazon.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Evita comportamientos extraños del navegador móvil
    detectorCorazon.click(); // Al hacer clic aquí, se ejecuta TODO el bloque de arriba (incluida la música)
});

// Captura el segundo exacto de la música justo en el milisegundo antes de cambiar de página
window.addEventListener("beforeunload", () => {
    const audio = document.getElementById("musica-fondo");
    if (audio) {
        localStorage.setItem("tiempoMusica", audio.currentTime);
    }
});



// Función única que controla el cambio de pantalla
function dispararTransicion() {
    const contenedorAcuario = document.getElementById('acuario');
    contenedorAcuario.classList.add('desvanecer-escena');
    
    setTimeout(() => {
        contenedorAcuario.style.display = 'none';
        iniciarSegundaEscena();
    }, 1500);
}

// Escuchador para Computadora (Mouse)
detectorCorazon.addEventListener('click', () => {
    dispararTransicion();
});

// Escuchador para Teléfono (Pantalla Táctil)
detectorCorazon.addEventListener('touchend', (e) => {
    if (detectorCorazon.style.pointerEvents === "auto") {
        e.preventDefault();
        dispararTransicion();
    }
});

// Soporta toques en pantallas táctiles de celulares
detectorCorazon.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dispararTransicion();
});

// ESTA FUNCIÓN HACE EL CAMBIO REAL A TU SEGUNDO ARCHIVO HTML
function iniciarSegundaEscena() {
    console.log("Transición confirmada!");
    // Redirige instantáneamente a tu segunda escena limpia y sin lag
    window.location.href = "escena5.html"; 
}

// INICIAR EL MOTOR GRÁFICO (Deja solo este llamado al final)
requestAnimationFrame(actualizar);










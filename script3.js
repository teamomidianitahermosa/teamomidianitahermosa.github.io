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

let lastTime = performance.now();
let accumulator = 0;

function createFallingHeart() {
    const heartContainer = document.createElement('div');
    heartContainer.classList.add('lluvia-corazon');
    
    const heartShape = document.createElement('div');
    heartShape.classList.add('figura-corazon');
    
    const colores = ['#ff4d6d', '#ff758f', '#ff8da1', '#ffb5a7', '#ff3366', '#c9184a'];
    const colorElegido = colores[Math.floor(Math.random() * colores.length)];
    heartShape.style.backgroundColor = colorElegido;
    
    const escalaAleatoria = Math.random() * 0.7 + 0.6; 
    heartShape.style.transform = `scale(${escalaAleatoria}) rotate(-45deg)`;
    
    heartContainer.appendChild(heartShape);
    heartContainer.style.left = Math.random() * 100 + 'vw';
    
    const duration = Math.random() * 2.5 + 2.5; 
    heartContainer.style.animationDuration = duration + 's';
    
    document.body.appendChild(heartContainer);

    setTimeout(() => { heartContainer.remove(); }, duration * 1000);
}

// --- LÓGICA DE BRISA NATURAL PARA LOS TULIPANES ---
const tulipanesData = [];
const coloresTulipanes = ['#ff1744', '#ff4081', '#ea80fc', '#f50057', '#ff5252', '#ff758f'];

function initTulipanes(canvas) {
    // Reducido a 280 para optimizar y limpiar el espacio visual
    const total = 280; 
    for (let i = 0; i < total; i++) {
        tulipanesData.push({
            x: Math.random() * canvas.width,
            y: Math.random() * 165, 
            colorFlor: coloresTulipanes[Math.floor(Math.random() * coloresTulipanes.length)],
            talloH: Math.random() * 9 + 11,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.003 + 0.002,
            // Variación individual para que el viento pegue de forma irregular y realista
            flexibilidad: Math.random() * 0.04 + 0.04,
            resistencia: Math.random() * 0.3 + 0.8
        });
    }
    tulipanesData.sort((a, b) => b.y - a.y);
}

function drawTulipanes(ctx, canvas, time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < tulipanesData.length; i++) {
        const t = tulipanesData[i];
        
        // Simulación de ráfagas suaves combinando dos ondas senoidales desfasadas
        const vientoBase = Math.sin(time * t.speed + t.phase);
        const rafagaSuave = Math.cos(time * (t.speed * t.resistencia) + t.phase) * 0.3;
        const angle = (vientoBase + rafagaSuave) * t.flexibilidad; 

        const posX = t.x;
        const posY = canvas.height - t.y;

        ctx.save();
        ctx.translate(posX, posY);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.strokeStyle = '#4caf50';
        ctx.lineWidth = 1.5;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -t.talloH);
        ctx.stroke();

        ctx.translate(0, -t.talloH);
        ctx.fillStyle = t.colorFlor;

        ctx.beginPath();
        ctx.arc(0, -4, 4, 0, Math.PI, true);
        ctx.lineTo(-4, 0);
        ctx.lineTo(4, 0);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ff5252'; 
        ctx.beginPath();
        ctx.arc(-2, -4, 3.5, 0, Math.PI, true);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(2, -4, 3.5, 0, Math.PI, true);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);
    
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    accumulator += deltaTime;

    if (accumulator >= 140) { 
        createFallingHeart();
        accumulator = 0;
    }

    const canvas = document.getElementById('canvas-tulipanes');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        drawTulipanes(ctx, canvas, currentTime);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas-tulipanes');
    if (canvas) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        initTulipanes(canvas);
    }

    const contenedorColgante = document.getElementById('contenedor-colgante-js');
    if (contenedorColgante) {
        const totalHilos = 18; 
        for (let i = 0; i < totalHilos; i++) {
            const hilo = document.createElement('div');
            hilo.classList.add('hilo-dinamico');
            hilo.style.left = (i * (100 / totalHilos)) + (Math.random() * 2.5) + 'vw';
            
            const alturaAleatoria = Math.floor(Math.random() * 50) + 45; 
            hilo.style.height = alturaAleatoria + '%';
            hilo.style.animationDelay = (Math.random() * -4) + 's';

            const tamaños = ['hilo-chico', 'hilo-mediano', 'hilo-grande'];
            hilo.classList.add(tamaños[Math.floor(Math.random() * tamaños.length)]);

            const corazonCSS = document.createElement('div');
            corazonCSS.classList.add('figura-corazon');
            hilo.appendChild(corazonCSS);
            contenedorColgante.appendChild(hilo);
        }
    }

    requestAnimationFrame(gameLoop);
});

window.addEventListener('resize', () => {
    const canvas = document.getElementById('canvas-tulipanes');
    if (canvas) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
});

// --- 6. APARICIÓN DIFERIDA DEL TEXTO SORPRESA ---
window.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('romantic-text');
    if (textElement) {
        setTimeout(() => {
            textElement.style.opacity = '1';
        }, 3500); 
    }
});

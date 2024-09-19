// Seleccionamos el canvas y el contexto
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ajustamos el tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables de la lancha
let lanchaX = 0;
let lanchaY = canvas.height / 2;
const lanchaWidth = 100;
const lanchaHeight = 50;
const lanchaSpeed = 2;

// Variables de las olas
const olas = [];
const maxOlas = 100;
const olaSpeed = 1;

// Función para dibujar la lancha
function dibujarLancha() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(lanchaX, lanchaY, lanchaWidth, lanchaHeight);
}

// Función para dibujar las olas
function dibujarOlas() {
    ctx.strokeStyle = 'lightblue';
    ctx.lineWidth = 3;

    olas.forEach((ola, index) => {
        // Si las olas salen del canvas, las eliminamos
        if (ola.x > canvas.width) {
            olas.splice(index, 1);
        } else {
            ctx.beginPath();
            ctx.moveTo(ola.x, ola.y);
            ctx.lineTo(ola.x + ola.width, ola.y);
            ctx.stroke();
            ola.x += olaSpeed;
        }
    });
}

// Función para añadir una nueva ola
function crearOla() {
    if (olas.length < maxOlas) {
        olas.push({ x: lanchaX + lanchaWidth, y: lanchaY + lanchaHeight / 2, width: 50 });
    }
}

// Función para actualizar la posición de la lancha y las olas
function actualizar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar lancha y olas
    dibujarLancha();
    dibujarOlas();

    // Crear una nueva ola en cada frame
    crearOla();

    // Mover lancha
    lanchaX += lanchaSpeed;

    // Si la lancha se sale de la pantalla, vuelve al principio
    if (lanchaX > canvas.width) {
        lanchaX = -lanchaWidth;
    }

    // Volver a llamar la función de actualización
    requestAnimationFrame(actualizar);
}

// Iniciar la animación
actualizar();

let livesDraw = document.getElementById("lives-draw");
let letters = document.getElementById("letters");
let wordLetters = document.getElementById("word-letters");
let resetGame = document.getElementById("reset-button");

const imagenesVidas = [
    "images/ahorcado6.jpg",
    "images/ahorcado5.jpg",
    "images/ahorcado4.jpg",
    "images/ahorcado3.jpg",
    "images/ahorcado2.jpg",
    "images/ahorcado1.jpg",
    "images/ahorcado0.jpg"
];

livesDraw.innerHTML = `<img src="${imagenesVidas[0]}" alt="vidas restantes" />`;

function elegirPalabra (lista){
    let palabra = Math.floor(Math.random()*(lista.length))
    return lista[palabra]
};

function ocultarPalabra (palabra){
    let palabraEncriptada = [];
    for (let i=0;i<(palabra.length);i++){
        palabraEncriptada.push("_")
    }
    return palabraEncriptada
};

function valorarLetra (palabraElegida, palabraOculta, letraElegida){
    let acierto = 1
    for (let i=0;palabraElegida.length>i;i++)
        if (letraElegida==palabraElegida[i]){
            palabraOculta[i]=letraElegida;
            acierto=0
        }
    return [palabraOculta, acierto]
}

function desactivarBotones() {
    document.querySelectorAll(".single-letter").forEach(button => {
        button.disabled = true;
    });
}

function actualizarJuego (letraElegida){
    console.log(palabraElegida)
    resetGame.addEventListener("click", resetJuego);
    if(vidas===1){
        livesDraw.innerHTML = `<img src="images/ahorcado0.jpg" alt="vidas restantes" />`;
        alert("Perdiste");
        desactivarBotones();
        return
    } 

    let [nuevaPalabraOculta, acierto]=valorarLetra(palabraElegida, palabraOculta, letraElegida)
    palabraOculta = nuevaPalabraOculta
    wordLetters.textContent = palabraOculta.join(" ")
    if (acierto===1){vidas--;livesDraw.innerHTML = `<img src="${imagenesVidas[6 - vidas]}" alt="vidas restantes" />`;}

    if (palabraElegida==palabraOculta.join('')){
        alert(`Ganaste, te quedaron ${vidas} vidas`);
        desactivarBotones();
        return
    }
}

function resetJuego() {
    vidas = 6;
    palabraElegida = elegirPalabra(listaPalabras);
    palabraOculta = ocultarPalabra(palabraElegida);
    wordLetters.textContent = palabraOculta.join(" ");
    livesDraw.innerHTML = `<img src="${imagenesVidas[0]}" alt="vidas restantes" />`;
    document.querySelectorAll(".single-letter").forEach(button => {
        button.disabled = false;
    });
}


const listaPalabras = [
    "cielo", "mar", "montaña", "arbol", "sol", "luna", "estrella", "viento", "fuego",
    "tierra", "agua", "nube", "lluvia", "rio", "bosque", "arena", "roca", "flor",
    "hoja", "camino", "ciudad", "puente", "laguna", "jungla", "valle", "volcan",
    "desierto", "cascada", "nieve", "trueno", "relampago", "lago", "playa", "bahia",
    "acantilado", "caverna", "pradera", "sendero", "brisa", "hierba", "cumbre", "marea",
    "islote", "cueva", "pantano", "paramo", "selva", "espejismo", "murmullo", "oceano", "brillo"
];

let vidas = 6;
let palabraElegida = elegirPalabra(listaPalabras);
let palabraOculta = ocultarPalabra(palabraElegida);
wordLetters.textContent = palabraOculta.join(" ")

alert("Bienvenido/a al juego del ahorcado")
alert(`Inicias con ${vidas} vidas`)

document.querySelectorAll(".single-letter").forEach(button => {
    button.addEventListener("click", () => {
        actualizarJuego(button.id);
        button.disabled = true;
    });
});
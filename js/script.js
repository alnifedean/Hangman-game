//En esta seccion, estamoss conectando las etiquetas de html con nuestro docuemnto javascript por ID
let livesDraw = document.getElementById("lives-draw");
let letters = document.getElementById("letters");
let wordLetters = document.getElementById("word-letters");
let resetGame = document.getElementById("reset-button");
let container = document.getElementById("main-container")

//Utilice una lista para los titulos de las imagenes para que fuera mas sencillo recorrerlas conforme pierdes vidas
const imagenesVidas = [
    "images/ahorcado6.jpg",
    "images/ahorcado5.jpg",
    "images/ahorcado4.jpg",
    "images/ahorcado3.jpg",
    "images/ahorcado2.jpg",
    "images/ahorcado1.jpg",
    "images/ahorcado0.jpg"
];

//Aqui esta una funcion para elegir una palabra random de una lista que se le da.
function elegirPalabra (lista){
    let palabra = Math.floor(Math.random()*(lista.length))
    return lista[palabra]
};

//Esta funcion recibe una palabra y la encripta cambiando cada letra por un guion bajo, deja la palabra separada en una lista.
function ocultarPalabra (palabra){
    let palabraEncriptada = [];
    for (let i=0;i<(palabra.length);i++){
        palabraEncriptada.push("_")
    }
    return palabraEncriptada
};

// Esta funcion recibe 3 parametros, una palabra elegida, la palabra ya encriptada con guines bajos y la letra que se eligio, usando un ciclo busca si la letra esta en la palabra elegida, si esta, cambia el guin bajo por la letra elegida en la posicion en el que esta de la palabra encriptada, retorna la palabra encriptada ya modificada y la variable acierto en valor 0 si acerto o 1 si no acerto.
function valorarLetra (palabraElegida, palabraOculta, letraElegida){
    let acierto = 1
    for (let i=0;palabraElegida.length>i;i++)
        if (letraElegida==palabraElegida[i]){
            palabraOculta[i]=letraElegida;
            acierto=0
        }
    return [palabraOculta, acierto]
}

//Esta funcion nos deja recorrer cada boton e irlos desactivando.
function desactivarBotones() {
    document.querySelectorAll(".single-letter").forEach(button => {
        button.disabled = true;
    });
}

// Esta funcion reinicia el juego, elegiendo una palabra nueva, modifica el estilo, ejecuta la funcion para encriptar la palabra, muestra la palabra encriptada en el DOM, muestra de nuevo la imagen incial del juego y reactiva todos los botones para poder jugar de nuevo.
function resetJuego() {
    vidas = 6;
    container.style.boxShadow="0 0 15px 0 #000";
    palabraElegida = elegirPalabra(listaPalabras);
    palabraOculta = ocultarPalabra(palabraElegida);
    wordLetters.textContent = palabraOculta.join(" ");
    livesDraw.innerHTML = `<img src="${imagenesVidas[0]}" alt="vidas restantes" />`;
    document.querySelectorAll(".single-letter").forEach(button => {
        button.disabled = false;
    });
}

//Esta es la funcion principal, actualiza el juego y se le dan 3 parametros
function actualizarJuego (palabraElegida, palabraOculta, letraElegida){
    //Muestra la palabra elegida en la consola para una ayudadita a nosotros y checa si se presiono el boton de reiniciar el juego para ejecutar la funcion.
    console.log(palabraElegida)
    resetGame.addEventListener("click", resetJuego);

    // Aqui declaramos dos variables, una en la que retorna la palabra encriptada pero ya con la letra que se eligio si existe dentro de la palabra elegida y el valor del acierto, esto ejecutando la funcion valorarLetra. Luego cambias el contenido de la palabra encriptada por lo que retorno, muestras en el DOM la nueva palabra encriptada con la letra agregada si le atino y entra a un condicional, si el valor de aciero es 1 que quiere decir que no le atino, le resta una vida, muestra la siguiente imagen en la lista y cambia el estilo.
    let [nuevaPalabraOculta, acierto]=valorarLetra(palabraElegida, palabraOculta, letraElegida)
    palabraOculta = nuevaPalabraOculta
    wordLetters.textContent = palabraOculta.join(" ")
    if (acierto===1){vidas--;livesDraw.innerHTML = `<img src="${imagenesVidas[6 - vidas]}" alt="vidas restantes" />`;container.style.boxShadow="0 0 15px 0 #f00"}
    
    //Aqui hay dos condicionales, la primera por si acierta para cambiar la sombra a verde y la segunda para cambia la sombra a azul si gana
    if (acierto===0){container.style.boxShadow="0 0 15px 0 #0f0"};
    if (palabraElegida==palabraOculta.join('')){container.style.boxShadow="0 0 15px 0 #00f"};

    //En este condicional se valora si la persona ya adivino la palabra, si es asi, le mestra un mensaje de que gano y cuantas vidas le quedaron, luego desactiva los botones para que no siga eligiendo letras
    if (palabraElegida==palabraOculta.join('')){
        if(vidas===1){alert(`Ganaste, te quedo ${vidas} vida`);} else {
        alert(`Ganaste, te quedaron ${vidas} vidas`);
        desactivarBotones();}
        return
    }

    //En este condicional se valora si el usaurio ya no tiene vidas, si es asi, muestra una alerta de que perdio, se completa el monito con la ultima imagen y se desactivan los botones.
    if(vidas===0){
        livesDraw.innerHTML = `<img src="images/ahorcado0.jpg" alt="vidas restantes" />`;
        alert("Perdiste");
        desactivarBotones();
        return
    } 
}



//Esta es la lista en la que estan las palabras a adivinar
const listaPalabras = [
    "cielo", "mar", "montaña", "arbol", "sol", "luna", "estrella", "viento", "fuego",
    "tierra", "agua", "nube", "lluvia", "rio", "bosque", "arena", "roca", "flor",
    "hoja", "camino", "ciudad", "puente", "laguna", "jungla", "valle", "volcan",
    "desierto", "cascada", "nieve", "trueno", "relampago", "lago", "playa", "bahia",
    "acantilado", "caverna", "pradera", "sendero", "brisa", "hierba", "cumbre", "marea",
    "islote", "cueva", "pantano", "paramo", "selva", "espejismo", "murmullo", "oceano", "brillo"
];

//En estas lineas, primero mostramos la imagen base para iniciar el juego, definimos las vidas que en este caso son 6 por las imagenes que hay, luego se ejecuta la funcion para elegir la palabra, luego encriptarla y finalmente mostrarla en el DOM
livesDraw.innerHTML = `<img src="${imagenesVidas[0]}" alt="vidas restantes" />`;
let vidas = 6;
let palabraElegida = elegirPalabra(listaPalabras);
let palabraOculta = ocultarPalabra(palabraElegida);
wordLetters.textContent = palabraOculta.join(" ");

alert("Bienvenido/a al juego del ahorcado");
alert(`Inicias con ${vidas} vidas`);

//En esta seccion, verificamos cada boton si fue clickeado y luego ejecutamos la funcion principal (actualizarJuego) dandole los tres parametros y luego desabilita el boton presionado.
document.querySelectorAll(".single-letter").forEach(button => {
    button.addEventListener("click", () => {
        actualizarJuego(palabraElegida, palabraOculta, button.id);
        button.disabled = true;
    });
});
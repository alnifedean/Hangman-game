function elegirPalabra (lista){
    let largoLista = lista.length
    let palabra = Math.floor(Math.random()*largoLista)
    return lista[palabra]
};

function ocultarPalabra (palabra){
    let largoLista = palabra.length
    let palabraEncriptada = [];
    for (let i=0;i<largoLista;i++){
        palabraEncriptada.push("_")
    }
    return palabraEncriptada
};

function valorarLetra (palabraElegida, palabraOculta, ){
    let largoLista = palabraElegida.length
    let letraElegida = prompt("Ingresa la letra elegida: ")
    let acierto = 1
    for (let i=0;largoLista>i;i++)
        if (letraElegida==palabraElegida[i]){
            palabraOculta[i]=letraElegida;
            acierto=0
        } else {continue}
    return palabraOculta, acierto
}

const listaPalabras = [
    "cielo", "mar", "montaña", "arbol", "sol", "luna", "estrella", "viento", "fuego",
    "tierra", "agua", "nube", "lluvia", "rio", "bosque", "arena", "roca", "flor",
    "hoja", "camino", "ciudad", "puente", "laguna", "jungla", "valle", "volcan",
    "desierto", "cascada", "nieve", "trueno", "relampago", "lago", "playa", "bahia",
    "acantilado", "caverna", "pradera", "sendero", "brisa", "hierba", "cumbre", "marea",
    "islote", "cueva", "pantano", "paramo", "selva", "espejismo", "murmullo", "oceano", "brillo"
];
let vidas = 5;

let palabraElegida = elegirPalabra(listaPalabras)
let palabraOculta = ocultarPalabra(palabraElegida)

alert("Bienvenido/a al juego del ahorcado")
alert(`Inicias con ${vidas} vidas`)

while(true){
    let palabraOcultaAntes=palabraOculta
    if(vidas===0){
        alert("Perdiste");
        document.write(`Perdiste, la palabra era ${palabraElegida}`)
        break
    } else if (palabraElegida==palabraOculta.join('')){
        alert("Ganaste");
        document.write(`Ganaste, te quedaron ${vidas} vidas`)
        break
    }
    alert(`Tu palabra es la siguiente: `+ palabraOculta)
    palabraOculta, acierto=valorarLetra(palabraElegida,palabraOculta)
    vidas=vidas-acierto
    if (acierto==1 && vidas>0){alert(`Perdiste una vida, te quedan ${vidas}`)}
}

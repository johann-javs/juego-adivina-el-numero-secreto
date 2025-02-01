// forma larga
/*let titulo = document.querySelector('h1'); // document.queryselector me conecta con el elemento h1 del html
titulo.innerHTML = 'Juego del número secreto'; //innerHTML define el titulo del elemento
let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número del 1 al 10';*/

// Forma corta
let numeroSecreto = 0;
let intentos = 0;
let listaNumeroSorteados = [];
let numeroMaximo = 10;
let numeroMaximoIntentos = 3;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    //console.log(numeroSecreto);
}

function verificarIntento() {
    console.log('La función fue llamada');
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); // captura el valor del input del elemento a traves de un id
    /*console.log(numeroSecreto + ' ' + typeof(numeroSecreto));
    console.log(numeroDeUsuario + ' ' + typeof(numeroDeUsuario));
    console.log(numeroDeUsuario === numeroSecreto); */ //arroja un valor booleano, true si se cumple, false si no
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${intentos===1 ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled'); //removeAttribute remueve el atributo disabled del elemento 'reiniciar'
    } else {
        //cuando no se acierta el número
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número es menor');
        } else {
            asignarTextoElemento('p', 'El número es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    if (intentos > numeroMaximoIntentos) {
        asignarTextoElemento('p', 'Superaste el número máximo de 3 intentos');
        document.getElementById("intentar").disabled = true;
        console.log(listaNumeroSorteados);
    }
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    console.log(numeroGenerado);
    console.log(listaNumeroSorteados);
    //si ya sorteamos todos los numeros
    if (listaNumeroSorteados.length == numeroMaximo) {
        console.log('ya se sortearon todos los números posibles');
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {
        //.includes realiza un barrido dentro del vector y determina si algún valor ya fue agregado,
        //en dicho caso arroja un true
        // si el número generado está incluido en la lista
        if (listaNumeroSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto(); //función de recursividad = cuando se llama una la misma función dentro de si misma
        } else {
            listaNumeroSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function limpiarCaja() {
    //Dos formas para capturar el valor del elemento
    //document.getElementById('valorUsuario').value = '';
    document.querySelector('#valorUsuario').value = ''; //el # indica que es una selección por id
}

function reiniciarJuego() {
    console.log('reinició el juego');
    limpiarCaja();
    condicionesIniciales();
    document.getElementById('reiniciar').setAttribute('disabled', true); //setAttribute asigna un valor al atributo
}

condicionesIniciales();
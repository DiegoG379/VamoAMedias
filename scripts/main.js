//Ingreso para tres personas - Inicio
let nombreTres = "";
let verificarTres = false;

function agregarTercerPersona(){
    const cantidadPersonas = document.getElementById("cantidadPersonas");
    nombreTres = document.getElementById("nombreTres").value
    const valorSeleccionado = cantidadPersonas.value;

    if (valorSeleccionado === "valor3"){
        tercerPersona.style.display = 'block';
        verificarTres = true;
    } else {
        tercerPersona.style.display = 'none';
        verificarTres = false;
    };
};

//Ingreso para tres personas - Final

document.addEventListener("DOMContentLoaded", function() {

    // Ingreso y gestión de personas y nombres - Inicio
    
    let cantPersonas;
    let nombreUno;
    let nombreDos;
    
    function guardarNombres(){
        const cantidadPersonas = document.getElementById("cantidadPersonas");
        cantPersonas = cantidadPersonas.value;
        nombreUno = document.getElementById("nombreUno").value;
        nombreDos = document.getElementById("nombreDos").value;
    
        nombres = [];

        nombres.push(nombreUno);
        nombres.push(nombreDos);
    
        if (verificarTres === true){
            nombreTres = document.getElementById("nombreTres").value
            nombres.push(nombreTres);
        } else {
            const eliminarTercerNombre = nombres.indexOf(nombreTres);
            if (eliminarTercerNombre !== -1) {
            nombres.splice(eliminarTercerNombre, 1);
            }
        }
        
    
        alert(nombres)
    };
// Ingreso y gestión de personas y nombres - Final

// Ingreso y gestión de articulos, precios y personas que hicieron la compra - Inicio
    gastos = [];

    function agregarGasto() {
        const item = document.getElementById("item").value;
        const precio = document.getElementById("precio").value;

        if (item.trim() === "" || isNaN(precio) || precio <= 0){
            alert("complete los campos");
        }

        const listaGastos = {
            item: item,
            precio: precio,
        };

        gastos.push(listaGastos);
        mostrarGasto();
    }

    function mostrarGasto() {
        const lista = document.getElementById("listaDeGastos");
        lista.innerHTML = "";

        gastos.forEach((gasto, indice) => {
            const elementoLista = document.createElement("li");
            const textoElemento = document.createTextNode(
                ` compró ${gasto.item} a $${gasto.precio}`
            );

            elementoLista.appendChild(textoElemento);
            lista.appendChild(elementoLista);
        });
    }
// Ingreso y gestión de articulos, precios y personas que hicieron la compra - Final

    document.getElementById("ingresar").addEventListener("click", guardarNombres);
    document.getElementById("agregar").addEventListener("click", agregarGasto);
});

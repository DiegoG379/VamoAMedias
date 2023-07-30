// Ingreso y gestión de personas y nombres - Inicio
document.addEventListener("DOMContentLoaded", function() {    
    function guardarNombres(){
        const cantidadPersonas = document.getElementById("cantidadPersonas");
        const cantPersonas = cantidadPersonas.value;
        const nombreUno = document.getElementById("nombreUno").value;
        const nombreDos = document.getElementById("nombreDos").value;
    };
    document.getElementById("ingresar").addEventListener("click", guardarNombres);
});














// Ingreso y gestión de personas y nombres - Final

// Ingreso y gestión de articulos, precios y personas que hicieron la compra - Inicio
const gastos = [];

document.addEventListener("DOMContentLoaded", function () {
    function agregarGasto() {
        const item = document.getElementById("item").value;
        const precio = document.getElementById("precio").value;
        const nombre = document.getElementById("nombre").value;

        if (item.trim() === "" || isNaN(precio) || precio <= 0){
            alert("complete los campos");
        }

        const listaGastos = {
            item: item,
            precio: precio,
            nombre: nombre,
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
                `${gasto.nombre} compró ${gasto.item} a $${gasto.precio}`
            );

            elementoLista.appendChild(textoElemento);
            lista.appendChild(elementoLista);
        });
    }

    document.getElementById("agregar").addEventListener("click", agregarGasto);
});
// Ingreso y gestión de articulos, precios y personas que hicieron la compra - Final
const gastos = [];

document.addEventListener("DOMContentLoaded", function () {
    function agregarGasto() {
        const item = document.getElementById("item").value;
        const precio = document.getElementById("precio").value;
        const nombre = document.getElementById("nombre").value;

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
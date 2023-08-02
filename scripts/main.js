document.addEventListener("DOMContentLoaded", function () {

    // Ingreso para tres personas - Inicio
    let nombreTres = "";
    let verificarTres = false;

    function agregarTercerPersona() {
        const cantidadPersonas = document.getElementById("cantidadPersonas");
        nombreTres = document.getElementById("nombreTres").value;
        const valorSeleccionado = cantidadPersonas.value;

        if (valorSeleccionado === "valor3") {
            tercerPersona.style.display = 'block';
            verificarTres = true;
        } else {
            tercerPersona.style.display = 'none';
            verificarTres = false;
            nombreTres = "";
        }
    }
    // Ingreso para tres personas - Final

    // Ingreso y gestión de personas y nombres - Inicio

    function guardarNombres() {
        const cantidadPersonas = document.getElementById("cantidadPersonas");
        const cantPersonas = cantidadPersonas.value;
        const nombreUno = document.getElementById("nombreUno").value;
        const nombreDos = document.getElementById("nombreDos").value;

        let nombres = [];
        let nombreSeleccionado = "";

        nombres.push(nombreUno);
        nombres.push(nombreDos);

        if (verificarTres === true) {
            nombreTres = document.getElementById("nombreTres").value;
            nombres.push(nombreTres);
        } else {
            const eliminarTercerNombre = nombres.indexOf(nombreTres);
            if (eliminarTercerNombre !== -1) {
                nombres.splice(eliminarTercerNombre, 1);
            }
        }

        // Verificacion y completado de datos - Inicio
        if (cantPersonas === "" || nombreUno === "" || nombreDos === "" || (cantPersonas === "valor3" && nombreTres === "")) {
            alert("Complete los datos para continuar");
            return;
        }
        // Verificacion y completado de datos - Final

        const selectPersonas = document.getElementById("Personas");
        selectPersonas.innerHTML = "";

        nombres.forEach((nombre) => {
            const option = document.createElement("option");
            option.value = nombre;
            option.text = nombre;
            selectPersonas.appendChild(option);
        });

        selectPersonas.selectedIndex = 0;

        selectPersonas.addEventListener("change", () => {
            const nombreSeleccionado = selectPersonas.value;
        });
    }
    // Ingreso y gestión de personas y nombres - Final

    // Ingreso y gestión de articulos, precios y personas que hicieron la compra - Inicio
    let gastos = [];

    function agregarGasto() {
        const item = document.getElementById("item").value;
        const precio = document.getElementById("precio").value;
        const nombreSeleccionado = document.getElementById("Personas").value;

        const listaGastos = {
            nombre: nombreSeleccionado,
            item: item,
            precio: precio,
        };

        // Verificacion y completado de datos - Inicio
        if (item.trim() === "" || isNaN(precio) || precio <= 0 || nombreSeleccionado === "") {
            alert("Complete los campos");
            return;
        } else {
            gastos.push(listaGastos);
            mostrarGasto();
        }
        // Verificacion y completado de datos - Final
    }

    function eliminarGasto(indice){
        gastos.splice(indice, 1);
        mostrarGasto();
    }

    function mostrarGasto() {
        const lista = document.getElementById("listaDeGastos");
        lista.innerHTML = "";

        gastos.forEach((gasto, indice) => {
            const elementoLista = document.createElement("li");
            const textoElemento = document.createTextNode(
                `${gasto.nombre} ${gasto.item} a $${gasto.precio}`
            );
            const botonEliminarGasto = document.createElement("button");
            botonEliminarGasto.textContent = "Eliminar";
            botonEliminarGasto.addEventListener("click", () => {
                eliminarGasto(indice);
            });

            elementoLista.appendChild(textoElemento);
            elementoLista.appendChild(botonEliminarGasto);
            lista.appendChild(elementoLista);
        });
    }
    // Ingreso y gestión de articulos, precios y personas que hicieron la compra - Final

    document.getElementById("cantidadPersonas").addEventListener("change", agregarTercerPersona);
    document.getElementById("ingresar").addEventListener("click", guardarNombres);
    document.getElementById("agregar").addEventListener("click", agregarGasto);
});

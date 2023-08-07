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
    let nombres = [];

    function guardarNombres() {
        const cantidadPersonas = document.getElementById("cantidadPersonas");
        const cantPersonas = cantidadPersonas.value;
        const nombreUno = document.getElementById("nombreUno").value;
        const nombreDos = document.getElementById("nombreDos").value;

        nombres = [];
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
            Swal.fire({
                title: 'COMPLETE LOS DATOS',
                text: 'Por favor, ingrese la cantidad de personas y sus respectivos nombres para continuar.',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'my-custom-button',
                    popup: 'my-custom-popup'
                },
                confirmButtonText: '¡ACEPTAR!'
            });
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
            Swal.fire({
                title: 'COMPLETE LOS CAMPOS',
                text: 'Por favor complete los campos para continuar, asegúrese de que se hayan ingresados los nombres.',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'my-custom-button',
                    popup: 'my-custom-popup'
                },
                confirmButtonText: '¡ACEPTAR!'
            });
            return;
        } else {
            gastos.push(listaGastos);
            mostrarGasto();
        }
        // Verificacion y completado de datos - Final

        function limpiarCampos() {
            document.getElementById("item").value = "";
            document.getElementById("precio").value = "";
        }

        limpiarCampos()
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
                `${gasto.nombre} compró ${gasto.item} a $${gasto.precio}`
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
        function guardarListaPagos() {
            localStorage.setItem("lista", JSON.stringify(gastos));
        }
    
        // Función para restaurar el array de gastos desde el almacenamiento local
        function restaurarActividades() {
            const recuperarListaPagos = localStorage.getItem("lista");
            if (recuperarListaPagos) {
                gastos = JSON.parse(recuperarListaPagos);
                mostrarGasto();
            }
        }
    
        // Llamar a restaurarActividades para llenar la lista desde el almacenamiento local al cargar la página
        restaurarActividades();

    // Ingreso y gestión de articulos, precios y personas que hicieron la compra - Final
    
    // Se calculan gastos y muestra resultados - Inicio
    let listaDeGastos = {};
    let gastoUno = 0;
    let gastoDos = 0;
    let gastoTres = 0;

    function calcularGasto(){

        for (const gasto of gastos) {
            const nombre = gasto.nombre;
            const precio = parseInt(gasto.precio);
            if (nombre in listaDeGastos){
                listaDeGastos[nombre] += precio;
            } else{
                listaDeGastos[nombre] = precio;
            }
        }

        const nombresGastos = Object.keys(listaDeGastos);

        let nombreUno = nombresGastos[0];
        let nombreDos = nombresGastos[1];
        let nombreTres = nombresGastos[2];

        console.log(nombres, nombres[0], nombres[1])

        if (nombreDos === undefined) {
            nombreDos = nombres[0];
        } else if (nombreTres === undefined) {
            nombreTres = nombres[1];
        }

        let verificador = 0;

        for (const nombre in listaDeGastos){
            const gastoPorPersona = listaDeGastos[nombre];
            if (verificador === 0){
                gastoUno = gastoPorPersona;
            } else if (verificador === 1) {
                gastoDos = gastoPorPersona;
            } else if (verificador === 2) {
                gastoTres = gastoPorPersona;
            }
            verificador++;
        }

        if (Object.keys(listaDeGastos).length !== 0) {
            if (verificarTres === false) {
                let mensaje = "";
                let gastoTotal = gastoUno + gastoDos;

                let gastoMedioUno = gastoUno / 2; 
                let gastoMedioDos = gastoDos / 2;
                
                let totalUno = gastoMedioUno - gastoMedioDos;
                let totalDos = gastoMedioDos - gastoMedioUno;

                if (totalUno < 0) {
                    mensaje = `${nombreUno} le debe a ${nombreDos}, $${totalDos}`;
                } else if (totalDos < 0 ) {
                    mensaje = `${nombreDos} le debe a ${nombreUno}, $${totalUno}`;
                } else if (totalUno === totalDos) {
                    mensaje = `${nombreUno} y ${nombreDos}, están a mano`;
                }

                const resultados = document.getElementById("resultados");
                resultados.innerHTML = "";

                const parrafo = document.createElement("p");
                const textroUno = document.createTextNode(`El total gastado es de $${gastoTotal}.`);
                const lineaBr = document.createElement("br");
                const lineaBrDos = document.createElement("br");
                const lineaBrTres = document.createElement("br");
                const textroDos = document.createTextNode(`${nombreUno} aportó $${gastoUno} y ${nombreDos} aportó $${gastoDos}.`);
                const textroTres = document.createTextNode(mensaje);

                parrafo.appendChild(textroUno);
                parrafo.appendChild(lineaBr);
                parrafo.appendChild(textroDos);
                parrafo.appendChild(lineaBrDos);
                parrafo.appendChild(lineaBrTres);
                parrafo.appendChild(textroTres);

                resultados.appendChild(parrafo);
            } else if (verificarTres === true) {
                let mensaje = "";
                let mensajeDos = "";
                let gastoTotal = gastoUno + gastoDos + gastoTres;

                let totalUno = (gastoTotal/3 - gastoUno); 
                let totalDos = (gastoTotal/3 - gastoDos);
                let totalTres = (gastoTotal/3 - gastoTres);

                if (gastoUno === gastoDos && gastoUno === gastoTres) {
                    mensaje = `${nombreUno}, ${nombreDos} y ${nombreTres} están a mano`;
                } else if (totalUno >= 0 && totalDos >= 0) {
                    mensaje = `${nombreUno} le debe a ${nombreTres}, $${totalUno}`;
                    mensajeDos = `${nombreDos} le debe a ${nombreTres}, $${totalDos}`;
                } else if (totalDos >= 0 && totalTres >= 0) {
                    mensaje = `${nombreDos} le debe a ${nombreUno}, $${totalDos}`;
                    mensajeDos = `${nombreTres} le debe a ${nombreUno}, $${totalTres}`;
                } else if (totalUno >= 0 && totalTres >= 0) {
                    mensaje = `${nombreUno} le debe a ${nombreDos}, $${totalUno}`;
                    mensajeDos = `${nombreTres} le debe a ${nombreDos}, $${totalTres}`;
                } else if (totalUno <= 0 && totalDos <= 0) {
                    mensaje = `${nombreTres} le debe a ${nombreUno}, $${-totalUno}`;
                    mensajeDos = `${nombreTres} le debe a ${nombreDos}, $${-totalDos}`;
                } else if (totalDos <= 0 && totalTres <= 0) {
                    mensaje = `${nombreUno} le debe a ${nombreDos}, $${-totalDos}`;
                    mensajeDos = `${nombreUno} le debe a ${nombreTres}, $${-totalTres}`;
                } else if (totalUno <= 0 && totalTres <= 0) {
                    mensaje = `${nombreDos} le debe a ${nombreUno}, $${-totalUno}`;
                    mensajeDos = `${nombreDos} le debe a ${nombreTres}, $${-totalTres}`;
                }

                const resultados = document.getElementById("resultados");
                resultados.innerHTML = "";

                const parrafo = document.createElement("p");
                const textroUno = document.createTextNode(`El total gastado es de $${gastoTotal}.`);
                const lineaBr = document.createElement("br");
                const lineaBrDos = document.createElement("br");
                const lineaBrTres = document.createElement("br");
                const lineaBrCuatro = document.createElement("br");
                const textroDos = document.createTextNode(`${nombreUno} aportó $${gastoUno}, ${nombreDos} aportó $${gastoDos} y ${nombreTres} aportó $${gastoTres}.`);
                const textroTres = document.createTextNode(mensaje);
                const textroCuatro = document.createTextNode(mensajeDos);

                parrafo.appendChild(textroUno);
                parrafo.appendChild(lineaBr);
                parrafo.appendChild(textroDos);
                parrafo.appendChild(lineaBrDos);
                parrafo.appendChild(lineaBrTres);
                parrafo.appendChild(textroTres);
                parrafo.appendChild(lineaBrCuatro);
                parrafo.appendChild(textroCuatro);

                resultados.appendChild(parrafo);
            }
        } else {
            Swal.fire({
                title: 'NO SE HAN INGRESADO DATOS',
                text: 'Por favor, complete el formulario para poder realizar los cálculos pertinentes.',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'my-custom-button',
                    popup: 'my-custom-popup'
                },
                confirmButtonText: '¡ACEPTAR!'
            });
        }

        for (const nombre in listaDeGastos) {
            listaDeGastos[nombre] = 0;
        }
    }
    // Se calculan gastos y muestra resultados - Final

    document.getElementById("cantidadPersonas").addEventListener("change", agregarTercerPersona);
    document.getElementById("ingresar").addEventListener("click", guardarNombres);
    document.getElementById("agregar").addEventListener("click", agregarGasto);
    document.getElementById("agregar").addEventListener("click", guardarListaPagos);
    document.getElementById("calcular").addEventListener("click", calcularGasto);
});

// Se guardan y recuperan los datos en los campos ingresados - Inicio
const formulario = document.querySelector('#formulario');
const botonGuardar = document.querySelector('#guardar');

botonGuardar.addEventListener('click', function(){
    const guardarCampos = formulario.querySelectorAll('input, select');
    const guardarValores = {};

    guardarCampos.forEach(function (campo) {
        guardarValores[campo.name] = campo.value;
    });

    const cantidadPersonasSelect = document.querySelector('#cantidadPersonas');
    guardarValores[cantidadPersonasSelect.name] = cantidadPersonasSelect.options[cantidadPersonasSelect.selectedIndex].value;

    const PersonasSelect = document.querySelector('#Personas');
    guardarValores[PersonasSelect.name] = PersonasSelect.options[PersonasSelect.selectedIndex].value;

    localStorage.setItem('valoresGuardados', JSON.stringify(guardarValores));

    mostrarvaloresGuardados();
})

function mostrarvaloresGuardados(){
    const valoresGuardados = localStorage.getItem('valoresGuardados');

    if (valoresGuardados) {
        const RecuperarvaloresGuardados = JSON.parse(valoresGuardados);

        Object.keys(RecuperarvaloresGuardados).forEach(function(nombreCampo) {
            const valor = formulario.querySelector(`[name="${nombreCampo}"]`);
            if (valor) {
                valor.value = RecuperarvaloresGuardados[nombreCampo];
            }
        })
    }
}
mostrarvaloresGuardados();
// Se guardan y recuperan los datos en los campos ingresados - Final

// Se borran todos los datos guardados en el local storage - Inicio
const borrar = document.getElementById('borrar');
borrar.addEventListener('click', function () {
    localStorage.clear();

    const campos = formulario.querySelectorAll('input, select');
    campos.forEach(function (campo) {
        campo.value = '';
    });
    location.reload();
});
// Se borran todos los datos guardados en el local storage - Final
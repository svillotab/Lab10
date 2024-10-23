class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.estado = 'Pendiente';
    }
}

const tareas = [];

function agregarTarea() {
    const taskInput = document.getElementById('nuevaTarea');
    const taskName = taskInput.value.trim();

    if (taskName) {
        const nuevaTarea = new Tarea(taskName);
        tareas.push(nuevaTarea);
        taskInput.value = '';
        actualizarInterfaz();
    }
}

function actualizarInterfaz() {
    const listaPendientes = document.getElementById('listaPendientes');
    const listaHaciendo = document.getElementById('listaHaciendo');
    const listaCompletada = document.getElementById('listaCompletada');

    listaPendientes.innerHTML = '';
    listaHaciendo.innerHTML = '';
    listaCompletada.innerHTML = '';

    tareas.forEach((tarea, index) => {
        const lista = document.createElement('div');
        lista.textContent = tarea.nombre;
        lista.classList.add('tarea');

        // Crear un contenedor para los botones
        const botonContainer = document.createElement('div');
        botonContainer.classList.add('boton-container');

        if (tarea.estado === 'Pendiente') {
            listaPendientes.appendChild(lista);
            const botonMover = document.createElement('button');
            botonMover.textContent = '>';
            botonMover.onclick = (event) => {
                event.stopPropagation(); // Evitar que se ejecute el onclick de lista
                moverTarea(index, 'Haciendo'); // Cambia a 'Haciendo'
            };
            botonContainer.appendChild(botonMover);
        } else if (tarea.estado === 'Haciendo') {
            listaHaciendo.appendChild(lista);
            const botonMoverPendiente = document.createElement('button');
            botonMoverPendiente.textContent = '<';
            botonMoverPendiente.onclick = (event) => {
                event.stopPropagation();
                moverTarea(index, 'Pendiente'); // Cambia a 'Pendiente'
            };

            const botonMoverCompletada = document.createElement('button');
            botonMoverCompletada.textContent = '>';
            botonMoverCompletada.onclick = (event) => {
                event.stopPropagation();
                moverTarea(index, 'Completada'); // Cambia a 'Completada'
            };

            botonContainer.appendChild(botonMoverPendiente);
            botonContainer.appendChild(botonMoverCompletada);
        } else if (tarea.estado === 'Completada') {
            listaCompletada.appendChild(lista);
        }

        lista.appendChild(botonContainer); // Agregar el contenedor de botones a la tarea
    });
}

function moverTarea(index, nuevoEstado) {
    const tarea = tareas[index];
    tarea.estado = nuevoEstado; // Cambiar el estado a lo que se pasa como argumento
    actualizarInterfaz(); // Actualizar la interfaz después de mover la tarea
}
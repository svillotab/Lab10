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
        lista.onclick = function() {
            moverTarea(index);
        };

        if (tarea.estado === 'Pendiente') {
            listaPendientes.appendChild(lista);
        } else if (tarea.estado === 'Haciendo') {
            listaHaciendo.appendChild(lista);
        } else if (tarea.estado === 'Completada') {
            listaCompletada.appendChild(lista);
        }
    });
}

function moverTarea(index) {
    const tarea = tareas[index];
    if (tarea.estado === 'Pendiente') {
        tarea.estado = 'Haciendo';
    } else if (tarea.estado === 'Haciendo') {
        tarea.estado = 'Completada';
    }
    actualizarInterfaz();
}
// Variables globales
let currentDeleteIndex = -1;

// Función para inicializar el almacenamiento si no existe
function initStorage() {
    if (!localStorage.getItem('visitas')) {
        localStorage.setItem('visitas', JSON.stringify([]));
    }
}

// Función para cargar las visitas
function loadVisitas() {
    initStorage();
    const visitas = JSON.parse(localStorage.getItem('visitas'));
    return visitas;
}

// Función para guardar las visitas
function saveVisitas(visitas) {
    localStorage.setItem('visitas', JSON.stringify(visitas));
}

// Función para mostrar las visitas en la tabla
function displayVisitas(visitasToShow = null) {
    const visitasList = document.getElementById('visitasList');
    const emptyState = document.getElementById('emptyState');
    visitasList.innerHTML = '';
    
    const visitas = visitasToShow || loadVisitas();
    
    if (visitas.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    visitas.forEach((visita, index) => {
        const row = document.createElement('tr');
        
        // Calcular clase para visita reciente (últimos 7 días)
        const visitDate = new Date(visita.fecha);
        const today = new Date();
        const isRecent = (today - visitDate) / (1000 * 60 * 60 * 24) <= 7;
        
        row.innerHTML = `
            <td>${visita.nombre} ${isRecent ? '<span class="badge badge-success">Nuevo</span>' : ''}</td>
            <td>${visita.apellido}</td>
            <td>${visita.referido}</td>
            <td>${formatDate(visita.fecha)}</td>
            <td class="actions">
                <button class="btn-action btn-edit" onclick="editVisita(${index})" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action btn-delete" onclick="showDeleteConfirmation(${index})" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        visitasList.appendChild(row);
    });
    
    updateStats();
}

// Formatear fecha para mostrar
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
}

// Función para guardar o actualizar una visita
function saveVisita() {
    const visitaId = document.getElementById('visitaId').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const referido = document.getElementById('referido').value;
    const fecha = document.getElementById('fecha').value;
    
    if (!nombre || !apellido || !referido || !fecha) {
        showNotification('Por favor, complete todos los campos.', false);
        return;
    }
    
    const visita = {
        nombre,
        apellido,
        referido,
        fecha
    };
    
    const visitas = loadVisitas();
    
    if (visitaId === '') {
        // Crear nueva visita
        visitas.push(visita);
        showNotification('Visita registrada con éxito.');
    } else {
        // Actualizar visita existente
        visitas[parseInt(visitaId)] = visita;
        showNotification('Visita actualizada con éxito.');
    }
    
    saveVisitas(visitas);
    displayVisitas();
    resetForm();
}

// Función para editar una visita
function editVisita(index) {
    const visitas = loadVisitas();
    const visita = visitas[index];
    
    document.getElementById('visitaId').value = index;
    document.getElementById('nombre').value = visita.nombre;
    document.getElementById('apellido').value = visita.apellido;
    document.getElementById('referido').value = visita.referido;
    document.getElementById('fecha').value = visita.fecha;
    
    // Desplazarse al formulario
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
}

// Función para mostrar la confirmación de eliminación
function showDeleteConfirmation(index) {
    currentDeleteIndex = index;
    document.getElementById('deleteConfirmation').classList.add('active');
}

// Función para cerrar la confirmación de eliminación
function closeDeletePopup() {
    document.getElementById('deleteConfirmation').classList.remove('active');
}

// Función para confirmar la eliminación
function confirmDelete() {
    if (currentDeleteIndex !== -1) {
        const visitas = loadVisitas();
        visitas.splice(currentDeleteIndex, 1);
        saveVisitas(visitas);
        displayVisitas();
        showNotification('Registro eliminado con éxito.');
    }
    closeDeletePopup();
}

// Función para cancelar la edición
function cancelEdit() {
    resetForm();
    showNotification('Edición cancelada.');
}

// Función para reiniciar el formulario
function resetForm() {
    document.getElementById('visitaForm').reset();
    document.getElementById('visitaId').value = '';
}

// Función para buscar visitas
function searchVisitas() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (!searchTerm) {
        displayVisitas();
        return;
    }
    
    const visitas = loadVisitas();
    const filteredVisitas = visitas.filter(visita => 
        visita.nombre.toLowerCase().includes(searchTerm) || 
        visita.apellido.toLowerCase().includes(searchTerm) ||
        visita.referido.toLowerCase().includes(searchTerm)
    );
    
    displayVisitas(filteredVisitas);
    
    if (filteredVisitas.length === 0) {
        showNotification('No se encontraron resultados para su búsqueda.', false);
    } else {
        showNotification(`Se encontraron ${filteredVisitas.length} resultados.`);
    }
}

// Función para limpiar la búsqueda
function clearSearch() {
    document.getElementById('searchInput').value = '';
    displayVisitas();
}

// Función para mostrar notificaciones
function showNotification(message, isSuccess = true) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    
    notification.style.backgroundColor = isSuccess ? 'var(--success)' : 'var(--danger)';
    notification.querySelector('i').className = isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    notificationMessage.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Función para actualizar las estadísticas
function updateStats() {
    const visitas = loadVisitas();
    const totalVisitas = visitas.length;
    
    // Contar visitas de este mes
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const visitasEsteMes = visitas.filter(visita => new Date(visita.fecha) >= startOfMonth).length;
    
    // Encontrar el referido más común
    const referidoCounts = {};
    visitas.forEach(visita => {
        const referido = visita.referido.toLowerCase();
        referidoCounts[referido] = (referidoCounts[referido] || 0) + 1;
    });
    
    let maxCount = 0;
    let commonReferido = '-';
    
    for (const [referido, count] of Object.entries(referidoCounts)) {
        if (count > maxCount) {
            maxCount = count;
            commonReferido = referido;
        }
    }
    
    // Capitalizar el nombre del referido más común
    if (commonReferido !== '-') {
        commonReferido = commonReferido.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    // Actualizar los elementos HTML
    document.getElementById('totalVisitas').textContent = totalVisitas;
    document.getElementById('visitasEsteMes').textContent = visitasEsteMes;
    document.getElementById('referidosMasComunes').textContent = commonReferido;
}

// Cargar las visitas al iniciar
window.onload = function() {
    displayVisitas();
};
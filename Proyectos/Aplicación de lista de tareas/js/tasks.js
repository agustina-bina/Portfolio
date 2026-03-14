/**
 * tasks.js
 * Gestión de tareas - creación, edición, eliminación y renderizado
 */

const Tasks = {
  /**
   * Genera un ID único para cada tarea
   * @returns {string} ID único
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  /**
   * Crea una nueva tarea
   * @param {string} text - Texto de la tarea
   * @returns {Object} Objeto de tarea
   */
  createTask(text) {
    return {
      id: this.generateId(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
  },

  /**
   * Renderiza una tarea individual en el DOM
   * @param {Object} task - Objeto de tarea
   * @returns {HTMLElement} Elemento li de la tarea
   */
  renderTask(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'task-item--completed' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
      <label class="task-item__checkbox">
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-item__checkbox-custom"></span>
      </label>
      <span class="task-item__text">${this.escapeHtml(task.text)}</span>
      <div class="task-item__actions">
        <button class="task-item__btn task-item__btn--edit" title="Editar">
          ✏️
        </button>
        <button class="task-item__btn task-item__btn--delete" title="Eliminar">
          🗑️
        </button>
      </div>
    `;

    return li;
  },

  /**
   * Renderiza el modo de edición de una tarea
   * @param {HTMLElement} taskElement - Elemento de la tarea
   * @param {string} currentText - Texto actual de la tarea
   */
  renderEditMode(taskElement, currentText) {
    const textSpan = taskElement.querySelector('.task-item__text');
    const actionsDiv = taskElement.querySelector('.task-item__actions');

    // Reemplazar texto con input
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-item__edit-input';
    input.value = currentText;
    textSpan.replaceWith(input);
    input.focus();
    input.select();

    // Reemplazar botones con guardar/cancelar
    actionsDiv.innerHTML = `
      <button class="task-item__btn task-item__btn--save" title="Guardar">
        Guardar
      </button>
      <button class="task-item__btn task-item__btn--cancel" title="Cancelar">
        Cancelar
      </button>
    `;

    // Manejar Enter para guardar
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.saveEdit(taskElement, input.value);
      } else if (e.key === 'Escape') {
        this.cancelEdit(taskElement, currentText);
      }
    });
  },

  /**
   * Guarda los cambios de edición
   * @param {HTMLElement} taskElement - Elemento de la tarea
   * @param {string} newText - Nuevo texto
   */
  saveEdit(taskElement, newText) {
    const trimmedText = newText.trim();
    if (!trimmedText) {
      alert('La tarea no puede estar vacía');
      return;
    }

    const taskId = taskElement.dataset.id;
    Storage.updateTask(taskId, { text: trimmedText });
    
    // Restaurar vista normal
    this.restoreTaskView(taskElement, trimmedText);
  },

  /**
   * Cancela la edición
   * @param {HTMLElement} taskElement - Elemento de la tarea
   * @param {string} originalText - Texto original
   */
  cancelEdit(taskElement, originalText) {
    this.restoreTaskView(taskElement, originalText);
  },

  /**
   * Restaura la vista normal de la tarea
   * @param {HTMLElement} taskElement - Elemento de la tarea
   * @param {string} text - Texto a mostrar
   */
  restoreTaskView(taskElement, text) {
    const input = taskElement.querySelector('.task-item__edit-input');
    const actionsDiv = taskElement.querySelector('.task-item__actions');

    // Restaurar texto
    const textSpan = document.createElement('span');
    textSpan.className = 'task-item__text';
    textSpan.textContent = text;
    input.replaceWith(textSpan);

    // Restaurar botones
    actionsDiv.innerHTML = `
      <button class="task-item__btn task-item__btn--edit" title="Editar">
        ✏️
      </button>
      <button class="task-item__btn task-item__btn--delete" title="Eliminar">
        🗑️
      </button>
    `;
  },

  /**
   * Alterna el estado de completado de una tarea
   * @param {string} taskId - ID de la tarea
   * @param {boolean} completed - Nuevo estado
   */
  toggleComplete(taskId, completed) {
    Storage.updateTask(taskId, { completed });
  },

  /**
   * Elimina una tarea
   * @param {string} taskId - ID de la tarea
   */
  deleteTask(taskId) {
    Storage.deleteTask(taskId);
  },

  /**
   * Escapa caracteres HTML para prevenir XSS
   * @param {string} text - Texto a escapar
   * @returns {string} Texto escapado
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  /**
   * Actualiza el contador de tareas
   * @param {number} count - Número de tareas
   */
  updateTaskCount(count) {
    const countElement = document.getElementById('taskCount');
    if (countElement) {
      countElement.textContent = count === 1 ? '1 tarea' : `${count} tareas`;
    }
  },

  /**
   * Muestra u oculta el estado vacío
   * @param {boolean} isEmpty - Si la lista está vacía
   */
  toggleEmptyState(isEmpty) {
    const emptyState = document.getElementById('emptyState');
    const tasksList = document.getElementById('tasksList');
    
    if (isEmpty) {
      emptyState.classList.add('empty-state--visible');
      tasksList.style.display = 'none';
    } else {
      emptyState.classList.remove('empty-state--visible');
      tasksList.style.display = 'flex';
    }
  }
};

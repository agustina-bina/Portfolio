/**
 * main.js
 * Lógica principal de la aplicación TaskFlow
 */

const App = {
  // Referencias a elementos del DOM
  elements: {
    taskInput: null,
    addTaskBtn: null,
    tasksList: null
  },

  /**
   * Inicializa la aplicación
   */
  init() {
    this.cacheElements();
    this.bindEvents();
    this.loadTasks();
  },

  /**
   * Cachea las referencias a los elementos del DOM
   */
  cacheElements() {
    this.elements.taskInput = document.getElementById('taskInput');
    this.elements.addTaskBtn = document.getElementById('addTaskBtn');
    this.elements.tasksList = document.getElementById('tasksList');
  },

  /**
   * Vincula los eventos a los elementos
   */
  bindEvents() {
    // Evento para agregar tarea con botón
    this.elements.addTaskBtn.addEventListener('click', () => {
      this.handleAddTask();
    });

    // Evento para agregar tarea con Enter
    this.elements.taskInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.handleAddTask();
      }
    });

    // Evento delegado para acciones en tareas
    this.elements.tasksList.addEventListener('click', (e) => {
      this.handleTaskAction(e);
    });

    // Evento delegado para cambios en checkboxes
    this.elements.tasksList.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        this.handleToggleComplete(e);
      }
    });
  },

  /**
   * Carga las tareas desde Local Storage y las renderiza
   */
  loadTasks() {
    const tasks = Storage.getTasks();
    this.renderAllTasks(tasks);
  },

  /**
   * Renderiza todas las tareas en la lista
   * @param {Array} tasks - Array de tareas
   */
  renderAllTasks(tasks) {
    this.elements.tasksList.innerHTML = '';
    
    tasks.forEach(task => {
      const taskElement = Tasks.renderTask(task);
      this.elements.tasksList.appendChild(taskElement);
    });

    Tasks.updateTaskCount(tasks.length);
    Tasks.toggleEmptyState(tasks.length === 0);
  },

  /**
   * Maneja la adición de una nueva tarea
   */
  handleAddTask() {
    const text = this.elements.taskInput.value.trim();
    
    if (!text) {
      this.elements.taskInput.focus();
      return;
    }

    // Crear y guardar tarea
    const task = Tasks.createTask(text);
    Storage.addTask(task);

    // Renderizar tarea
    const taskElement = Tasks.renderTask(task);
    this.elements.tasksList.prepend(taskElement);

    // Limpiar input
    this.elements.taskInput.value = '';
    this.elements.taskInput.focus();

    // Actualizar UI
    const tasks = Storage.getTasks();
    Tasks.updateTaskCount(tasks.length);
    Tasks.toggleEmptyState(false);
  },

  /**
   * Maneja las acciones en las tareas (editar, eliminar, guardar, cancelar)
   * @param {Event} e - Evento click
   */
  handleTaskAction(e) {
    const btn = e.target.closest('button');
    if (!btn) return;

    const taskItem = btn.closest('.task-item');
    const taskId = taskItem.dataset.id;

    if (btn.classList.contains('task-item__btn--edit')) {
      // Editar tarea
      const textSpan = taskItem.querySelector('.task-item__text');
      if (textSpan) {
        Tasks.renderEditMode(taskItem, textSpan.textContent);
      }
    } else if (btn.classList.contains('task-item__btn--delete')) {
      // Eliminar tarea
      this.handleDeleteTask(taskItem, taskId);
    } else if (btn.classList.contains('task-item__btn--save')) {
      // Guardar edición
      const input = taskItem.querySelector('.task-item__edit-input');
      if (input) {
        Tasks.saveEdit(taskItem, input.value);
      }
    } else if (btn.classList.contains('task-item__btn--cancel')) {
      // Cancelar edición
      const tasks = Storage.getTasks();
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        Tasks.cancelEdit(taskItem, task.text);
      }
    }
  },

  /**
   * Maneja la eliminación de una tarea
   * @param {HTMLElement} taskElement - Elemento de la tarea
   * @param {string} taskId - ID de la tarea
   */
  handleDeleteTask(taskElement, taskId) {
    // Animar salida
    taskElement.style.opacity = '0';
    taskElement.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
      Tasks.deleteTask(taskId);
      taskElement.remove();
      
      // Actualizar UI
      const tasks = Storage.getTasks();
      Tasks.updateTaskCount(tasks.length);
      Tasks.toggleEmptyState(tasks.length === 0);
    }, 200);
  },

  /**
   * Maneja el cambio de estado completado de una tarea
   * @param {Event} e - Evento change
   */
  handleToggleComplete(e) {
    const checkbox = e.target;
    const taskItem = checkbox.closest('.task-item');
    const taskId = taskItem.dataset.id;
    const isCompleted = checkbox.checked;

    // Actualizar en Storage
    Tasks.toggleComplete(taskId, isCompleted);

    // Actualizar estilos
    if (isCompleted) {
      taskItem.classList.add('task-item--completed');
    } else {
      taskItem.classList.remove('task-item--completed');
    }
  }
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

/**
 * storage.js
 * Manejo de Local Storage para persistencia de tareas
 */

const Storage = {
  STORAGE_KEY: 'taskflow_tasks',

  /**
   * Obtiene todas las tareas guardadas en Local Storage
   * @returns {Array} Array de tareas
   */
  getTasks() {
    try {
      const tasks = localStorage.getItem(this.STORAGE_KEY);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error al obtener tareas de Local Storage:', error);
      return [];
    }
  },

  /**
   * Guarda todas las tareas en Local Storage
   * @param {Array} tasks - Array de tareas a guardar
   */
  saveTasks(tasks) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error al guardar tareas en Local Storage:', error);
    }
  },

  /**
   * Agrega una nueva tarea
   * @param {Object} task - Tarea a agregar
   */
  addTask(task) {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  },

  /**
   * Actualiza una tarea existente
   * @param {string} id - ID de la tarea
   * @param {Object} updates - Campos a actualizar
   */
  updateTask(id, updates) {
    const tasks = this.getTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates };
      this.saveTasks(tasks);
    }
  },

  /**
   * Elimina una tarea
   * @param {string} id - ID de la tarea a eliminar
   */
  deleteTask(id) {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    this.saveTasks(filteredTasks);
  },

  /**
   * Limpia todas las tareas
   */
  clearAllTasks() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
};

import { Task } from "./task.js";
import { createTaskCard } from "./task-card.js"; // NUEVO
import { STATUS_OPTIONS } from "./Task/form-rules.js";

const STORAGE_KEY = "taskPlanner";

export class TaskManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
    this.loadTasks();
  }

  save() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tasks: this.tasks, nextId: this.nextId }),
    );
  }

  loadTasks() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved) return;
      this.tasks = saved.tasks.map((t) => new Task(t));
      this.nextId =
        saved.nextId ?? Math.max(0, ...this.tasks.map((t) => t.id)) + 1;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  getAllTasks() {
    return [...this.tasks];
  }

  getTaskById(taskId) {
    let foundTask;

    for (const task of this.tasks) {
      if (task.id === taskId) {
        foundTask = task;
      }
    }

    return foundTask;
  }

  getTasksWithStatus(status) {
    return this.tasks.filter((task) => task.status === Number(status));
  }

  addTask(taskData) {
    const task = new Task({ ...taskData, id: this.nextId++ });
    this.tasks.push(task);
    this.save();
    return task;
  }

  deleteTask(taskId) {
    const before = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.save();
    return this.tasks.length < before;
  }

  updateTask(taskId, changes) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index === -1) throw new Error(`Task with id "${taskId}" not found`);

    const updated = new Task({ ...this.tasks[index], ...changes, id: taskId });
    this.tasks[index] = updated;
    this.save();
    return updated;
  }

  updateTaskStatus(taskId, status) {
    return this.updateTask(taskId, { status });
  }

  assignTask(taskId, assignee) {
    return this.updateTask(taskId, { assignee });
  }

  render() {
    const container = document.getElementById("tasksContainer");
    container.innerHTML = "";

    for (const status of STATUS_OPTIONS) {
      const tasks = this.getTasksWithStatus(status.id);

      const column = document.createElement("section");
      column.className = "board-column";
      column.dataset.status = status.id; // ← a qué estado pertenece
      column.innerHTML = `
       <div class="board-column-header text-bg-${status.color}">
          <h2 class="fs-6 m-0">${status.label}</h2>
          <span class="badge text-bg-light">${tasks.length}</span>
          
        </div>

        <div class="board-column-body"></div>

        <button type="button" class="btn btn-sm btn-light w-100 mt-2 add-task-button">
          <i class="bi bi-plus-lg"></i> Add card
        </button>`;

      const body = column.querySelector(".board-column-body");
      for (const task of tasks) body.append(createTaskCard(task));

      container.append(column);
    }
  }
}

export const taskManager = new TaskManager();

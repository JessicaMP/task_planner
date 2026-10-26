import { Task } from "./task.js"

const STORAGE_KEY = "taskPlanner"

export class TaskManager {
  constructor() {
    this.tasks = []
    this.nextId = 1
    this.loadTasks()
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
      this.nextId = saved.nextId ?? Math.max(0, ...this.tasks.map((t) => t.id)) + 1;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  getAllTasks() {
    return [...this.tasks];
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
}

export const taskManager = new TaskManager();
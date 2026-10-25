export class TaskManager {
  constructor(task) {
    const tasks = [];
    const {
      id,
      title,
      description,
      initDate,
      status,
      assignee,
      priority,
      color,
    } = task;
    this.id = id;
    this.title = title;
    this.description = description;
    this.initDate = initDate;
    this.endDate = endDate;
    this.status = Number(status);
    this.assignee = assignee;
    this.priority = Number(priority);
    this.color = color;
  }

  getAllTask() {
    return this.tasks;
  }

  getTasksWithStatus(status) {
    return this.tasks.filter((task) => task.status === status);
  }

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  updateTask(taskId, status) {
    const getIndex = this.tasks.findIndex((task) => task.id === taskId);
    this.tasks[getIndex].status = status;
  }

  assignTask(taskId, assignee) {
    const getIndex = this.tasks.findIndex((task) => task.id === taskId);
    this.tasks[getIndex].assignee = assignee;
  }
}

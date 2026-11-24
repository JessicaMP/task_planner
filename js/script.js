import { taskManager } from "../components/task-manager.js";

let draggedId = null;
const DONE = 3;
const tasksContainer = document.querySelector("#tasksContainer");

tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("done-button")) {
    const taskElement = event.target.parentElement.parentElement;
    console.log(taskElement);

    const id = Number(taskElement.dataset.taskId);
    const task = taskManager.getTaskById(id);
    if (!task) return;

    taskManager.updateTaskStatus(id, DONE);
    taskManager.render();
  }

  // Botón "+ Add card" de cada columna
  const addButton = event.target.closest(".add-task-button");
  if (addButton) {
    const column = addButton.closest("[data-status]");
    const form = document.getElementById("taskForm");

    form.elements.status.value = column.dataset.status; // preselecciona el estado

    bootstrap.Modal.getOrCreateInstance(
      document.getElementById("createTask"),
    ).show();
  }
});

tasksContainer.addEventListener("dragstart", (event) => {
  const card = event.target.closest("[data-task-id]");
  if (!card) return;
  draggedId = Number(card.dataset.taskId);
  card.classList.add("dragging");
});

tasksContainer.addEventListener("dragover", (event) => {
  const column = event.target.closest("[data-status]");
  if (!column) return;
  event.preventDefault(); // ← sin esto, el drop no ocurre
  column.classList.add("drop-target");
});

tasksContainer.addEventListener("dragleave", (event) => {
  event.target.closest("[data-status]")?.classList.remove("drop-target");
});

tasksContainer.addEventListener("drop", (event) => {
  const column = event.target.closest("[data-status]");
  if (!column || draggedId === null) return;
  event.preventDefault();

  const newStatus = Number(column.dataset.status);
  const task = taskManager.getTaskById(draggedId);
  if (task && task.status !== newStatus) {
    taskManager.updateTaskStatus(draggedId, newStatus);
  }
  draggedId = null;
  taskManager.render();
});

tasksContainer.addEventListener("dragend", () => {
  draggedId = null;
  taskManager.render();
});
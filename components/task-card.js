import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "./addTask/form-rules.js"
import { taskManager } from "./task-manager.js";

const createRow = (label, value) => {
  const p = document.createElement("p");
  p.className = "card-text mb-1";

  const strong = document.createElement("strong");
  strong.textContent = `${label}: `;

  p.append(strong, value);
  return p;
};

export const createTaskCard = (task) => {
  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-4";

  const card = document.createElement("div");
  card.className = "card h-100";
  card.dataset.taskId = task.id;
  card.style.borderTop = `6px solid ${task.color}`;

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = `#${task.id} · ${task.title}`;

  const description = document.createElement("p");
  description.className = "card-text text-body-secondary";
  description.textContent = task.description;

  body.append(
    title,
    description,
    createRow("Assignee", task.assignee),
    createRow("Start date", task.initDate),
    createRow("Due date", task.endDate),
    createRow("Status", STATUS_OPTIONS[task.status - 1]),
    createRow("Priority", PRIORITY_OPTIONS[task.priority - 1]),
  );

  // --- Botones ---
  const footer = document.createElement("div");
  footer.className = "card-footer d-flex gap-2 justify-content-end";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "btn btn-outline-primary btn-sm";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    document.dispatchEvent(
      new CustomEvent("task:edit", { detail: { id: task.id } }),
    );
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn btn-outline-danger btn-sm";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    if (taskManager.deleteTask(task.id)) col.remove();
  });

  footer.append(editBtn, deleteBtn);
  card.append(body, footer);
  col.append(card);
  return col;
};
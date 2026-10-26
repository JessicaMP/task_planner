import { STATUS_OPTIONS, PRIORITY_OPTIONS, findOption } from "./Task/form-rules.js";
import { taskManager } from "./task-manager.js";

const createBadge = (text, color) => {
  const badge = document.createElement("span");
  badge.className = `badge text-bg-${color}`;
  badge.textContent = text;
  return badge;
};

// Label and icon in body section
const createLabelAndIcon = (icon, label, value, colClass = "col-12 col-sm-6") => {
  const col = document.createElement("div");
  col.className = colClass;

  const labelEl = document.createElement("div");
  labelEl.className = "small text-body-secondary";
  labelEl.textContent = label;

  const valueEl = document.createElement("div");
  valueEl.className = "d-flex align-items-center gap-2";

  const iconEl = document.createElement("i");
  iconEl.className = `bi ${icon}`;

  const text = document.createElement("span");
  text.textContent = value;

  valueEl.append(iconEl, text);
  col.append(labelEl, valueEl);
  return col;
};

export const createTaskCard = (task) => {
  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-4";

  const card = document.createElement("div");
  card.className = "card h-100";
  card.dataset.taskId = task.id;
  card.style.borderTop = `6px solid ${task.color}`;

  // --- Header ---
  const header = document.createElement("div");
  header.className = "card-header bg-transparent";

  const status = findOption(STATUS_OPTIONS, task.status);
  const priority = findOption(PRIORITY_OPTIONS, task.priority);

  const badges = document.createElement("div");
  badges.className = "d-flex flex-wrap gap-2 justify-content-end mb-2";
  badges.append(
    createBadge(status?.label ?? "No status", status?.color ?? "secondary"),
    createBadge(priority?.label ?? "No priority", priority?.color ?? "secondary"),
  );

  const title = document.createElement("h5");
  title.className = "card-title mb-0";
  title.textContent = `#${task.id} · ${task.title}`;

  header.append(badges, title);

  // --- Body ---
  const body = document.createElement("div");
  body.className = "card-body";

  const description = document.createElement("p");
  description.className = "card-text text-body-secondary";
  description.textContent = task.description;

  const info = document.createElement("div");
  info.className = "row g-2";
  info.append(
    createLabelAndIcon("bi-calendar-event", "Start date", task.initDate),
    createLabelAndIcon("bi-calendar-check", "Due date", task.endDate),
    createLabelAndIcon("bi-person", "Assignee", task.assignee, "col-12"),
  );

  body.append(description, info);

  // --- Footer---
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
  card.append(header, body, footer);
  col.append(card);
  return col;
};
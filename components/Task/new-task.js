import { validateTaskForm, applyCustomRules } from "./validate-new-task.js";
import { rules_form, STATUS_OPTIONS, PRIORITY_OPTIONS } from "./form-rules.js";
import { taskManager } from "../task-manager.js";
import { createTaskCard } from "../task-card.js";

const getListOptions = (list, placeholder = "Select an option") => `
  <option value="" selected disabled>${placeholder}</option>
  ${list
    .map(({ id, label }) => `<option value="${id}">${label}</option>`)
    .join("")}
`;

const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;

  if (!validateTaskForm(form)) return;

  const data = Object.fromEntries(new FormData(form));

  const values = {
    title: data.title.trim(),
    description: data.description.trim(),
    initDate: data.initDate || new Date().toLocaleDateString("en-CA"),
    endDate: data.endDate,
    status: data.status,
    assignee: data.assignee.trim(),
    priority: data.priority ?? 1,
    color: data.color,
  };

  const editingId = Number(form.dataset.editingId);

  if (editingId) {
    const updated = taskManager.updateTask(editingId, values);
    document
      .querySelector(`[data-task-id="${editingId}"]`)
      ?.parentElement.replaceWith(createTaskCard(updated));
  } else {
    const task = taskManager.addTask(values);
    document.getElementById("tasksContainer").append(createTaskCard(task));
  }

  bootstrap.Modal.getOrCreateInstance(document.getElementById("createTask")).hide();
};

class NewTask extends HTMLElement {
  connectedCallback() {
    const {
      title,
      initDate,
      endDate,
      status,
      assignee,
      priority,
      color,
      description,
    } = rules_form;

    const titleTaskComponent = `
      <div class="col-md-12">
        <label for="title" class="form-label">${title.name}</label>
        <input type="text" class="form-control" id="title" name="title" placeholder="${title.placeholder}" required minlength="${title.minlength}" />
        <div class="invalid-feedback">${title.rule}</div>
      </div>`;

    const endDateComponent = `
      <div class="col-md-6">
        <label for="endDate" class="form-label">${endDate.name}</label>
        <input type="date" class="form-control" id="endDate" name="endDate" required />
        <div class="invalid-feedback">${endDate.rule}</div>
      </div>`;

    const statusComponent = `
      <div class="col-md-6">
        <label for="status" class="form-label">${status.name}</label>
        <select class="form-select" id="status" name="status" required>
          ${getListOptions(STATUS_OPTIONS)}
        </select>
        <div class="invalid-feedback">${status.rule}</div>
      </div>`;

    const assigneeComponent = `
      <div class="col-md-6">
        <label for="assignee" class="form-label">${assignee.name}</label>
        <input type="text" class="form-control" id="assignee" name="assignee" placeholder="${assignee.placeholder}" required minlength="${assignee.minlength}" />
        <div class="invalid-feedback">${assignee.rule}</div>
      </div>`;

    const colorComponent = `
      <div class="col-md-6">
        <label for="colorInput" class="form-label">${color.name}</label>
        <input type="color" class="form-control form-control-color" id="colorInput" name="color" value="#563d7c" title="${color.placeholder}" />
      </div>`;

    const descriptionComponent = `
      <div class="col-12">
        <label for="description" class="form-label">${description.name}</label>
        <textarea class="form-control" id="description" name="description" rows="3" required minlength="${description.minlength}" placeholder="${description.placeholder}"></textarea>
        <div class="invalid-feedback">${description.rule}</div>
      </div>`;

    this.innerHTML = `
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createTask">
        + New Task
      </button>

      <div class="modal fade" id="createTask" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="newTask" aria-hidden="true">
        <div class="modal-dialog">
          <form id="taskForm" class="modal-content needs-validation" novalidate>
            <div class="modal-header">
              <h2 class="modal-title fs-5" id="newTask">New Task</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <div class="row g-3">
                ${titleTaskComponent}

                <div class="col-md-6">
                  <label for="initDate" class="form-label">${initDate.name}</label>
                  <input type="date" class="form-control" id="initDate" name="initDate" />
                </div>

                ${endDateComponent}

                ${statusComponent}

                ${assigneeComponent}

                <div class="col-md-6">
                  <label for="priority" class="form-label">${priority.name}</label>
                  <select class="form-select" id="priority" name="priority">
                    ${getListOptions(PRIORITY_OPTIONS)}
                  </select>
                </div>

                ${colorComponent}

                ${descriptionComponent}
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const form = this.querySelector("#taskForm");
    const modalEl = this.querySelector("#createTask");

    form.addEventListener("submit", handleSubmit);
    form.addEventListener("input", () => applyCustomRules(form));

    // Clean el form
    modalEl.addEventListener("hidden.bs.modal", () => {
      form.reset();
      form.classList.remove("was-validated");
      delete form.dataset.editingId;
      modalEl.querySelector("#newTask").textContent = "New Task";
      modalEl.querySelector("button[type=submit]").textContent = "Create";
    });

    // Edit card
    document.addEventListener("task:edit", (e) => {
      const task = taskManager.getAllTasks().find((t) => t.id === e.detail.id);
      if (!task) return;

      form.dataset.editingId = task.id;
      form.elements.title.value = task.title;
      form.elements.description.value = task.description;
      form.elements.initDate.value = task.initDate;
      form.elements.endDate.value = task.endDate;
      form.elements.status.value = task.status;
      form.elements.assignee.value = task.assignee;
      form.elements.priority.value = task.priority;
      form.elements.color.value = task.color;

      modalEl.querySelector("#newTask").textContent = "Edit Task";
      modalEl.querySelector("button[type=submit]").textContent = "Save";
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    });

    // Show task in localstorage
    const container = document.getElementById("tasksContainer");
    taskManager.getAllTasks().forEach((task) => container.append(createTaskCard(task)));
  }

}

customElements.define("new-task", NewTask);

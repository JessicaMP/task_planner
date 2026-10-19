import { validateTaskForm } from "./validate-new-task.js";

const getListOptions = (list, placeholder = "Selecciona una opción") => `
  <option value="" selected disabled>${placeholder}</option>
  ${list
    .map((item, index) => `<option value="${index + 1}">${item}</option>`)
    .join("")}
`;
class NewTask extends HTMLElement {
  connectedCallback() {
    const status = ["Todo 🔘", "In progress 🟡", "Done ✅"];
    const priority = ["Lower 🔘", "Medium 🟡", "High 🔴"];

    this.innerHTML = `
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createTask">
        Add Task
      </button>

      <div class="modal fade" id="createTask" data-bs-backdrop="static" data-bs-keyboard="false"
           tabindex="-1" aria-labelledby="newTask" aria-hidden="true">
        <div class="modal-dialog">
          <form id="taskForm" class="modal-content needs-validation" novalidate>
            <div class="modal-header">
              <h2 class="modal-title fs-5" id="newTask">New Task</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <div class="row g-3">
                <div class="col-md-12">
                  <label for="title" class="form-label">Title</label>
                  <input type="text" class="form-control" id="title" name="title"
                         placeholder="Title task" required minlength="8" />
                  <div class="invalid-feedback">El título debe tener más de 8 caracteres.</div>
                </div>

                <div class="col-md-6">
                  <label for="initDate" class="form-label">Start date</label>
                  <input type="date" class="form-control" id="initDate" name="initDate" />
                </div>

                <div class="col-md-6">
                  <label for="endDate" class="form-label">End date</label>
                  <input type="date" class="form-control" id="endDate" name="endDate" required />
                  <div class="invalid-feedback">La fecha de entrega es obligatoria.</div>
                </div>

                <div class="col-md-6">
                  <label for="status" class="form-label">Status</label>
                  <select class="form-select" id="status" name="status" required>
                    ${getListOptions(status)}
                  </select>
                  <div class="invalid-feedback">Selecciona un estado.</div>
                </div>

                <div class="col-md-6">
                  <label for="assignee" class="form-label">Assignee</label>
                  <input type="text" class="form-control" id="assignee" name="assignee"
                         placeholder="Leo Messi" required minlength="8" />
                  <div class="invalid-feedback">El asignado debe tener más de 8 caracteres.</div>
                </div>

                <div class="col-md-6">
                  <label for="priority" class="form-label">Priority</label>
                  <select class="form-select" id="priority" name="priority">
                    ${getListOptions(priority)}
                  </select>
                </div>

                <div class="col-md-6">
                  <label for="colorInput" class="form-label">Color card</label>
                  <input type="color" class="form-control form-control-color" id="colorInput"
                         name="color" value="#563d7c" title="Choose your color" />
                </div>

                <div class="col-12">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control" id="description" name="description" rows="3"
                            required minlength="15"></textarea>
                  <div class="invalid-feedback">La descripción debe tener más de 15 caracteres.</div>
                </div>
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

    this.querySelector("#taskForm").addEventListener(
      "submit",
      validateTaskForm,
    );
  }
}

customElements.define("new-task", NewTask);

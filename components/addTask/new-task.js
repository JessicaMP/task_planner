import { validateTaskForm } from "./validate-new-task.js";
import { rules_form } from "./form-rules.js";


const getListOptions = (list, placeholder = "Select an option") => `
  <option value="" selected disabled>${placeholder}</option>
  ${list
    .map((item, index) => `<option value="${index + 1}">${item}</option>`)
    .join("")}
`;
class NewTask extends HTMLElement {
  connectedCallback() {
    const statusOptions = ["Todo 🔘", "In progress 🟡", "Done ✅"];
    const priorityOptions = ["Lower 🔘", "Medium 🟡", "High 🔴"];

    const { title, initDate, endDate, status, assignee, priority, color, description } = rules_form

    const titleTaskComponent = `
      <div class="col-md-12">
        <label for="title" class="form-label">${title.name}</label>
        <input type="text" class="form-control" id="title" name="title" placeholder="${title.placeholder}" required minlength="${title.minlength}" />
        <div class="invalid-feedback">${title.rule}</div>
      </div>`

    const endDateComponent = `
      <div class="col-md-6">
        <label for="endDate" class="form-label">${endDate.name}</label>
        <input type="date" class="form-control" id="endDate" name="endDate" required />
        <div class="invalid-feedback">${endDate.rule}</div>
      </div>`

    const statusComponent = `
      <div class="col-md-6">
        <label for="status" class="form-label">${status.name}</label>
        <select class="form-select" id="status" name="status" required>
          ${getListOptions(statusOptions)}
        </select>
        <div class="invalid-feedback">${status.rule}</div>
      </div>`

    const assigneeComponent = `
      <div class="col-md-6">
        <label for="assignee" class="form-label">${assignee.name}</label>
        <input type="text" class="form-control" id="assignee" name="assignee" placeholder="Leo Messi" required minlength="${assignee.rule}" />
        <div class="invalid-feedback">${assignee.rule}</div>
      </div>`


    const colorComponent = `
      <div class="col-md-6">
        <label for="colorInput" class="form-label">${color.name}</label>
        <input type="color" class="form-control form-control-color" id="colorInput" name="color" value="#563d7c" title="${color.placeholder}" />
      </div>`

    const descriptionComponent = `
      <div class="col-12">
        <label for="description" class="form-label">${description.name}</label>
        <textarea class="form-control" id="description" name="description" rows="3" required minlength="${description.minlength}" placeholder="${description.placeholder}"></textarea>
        <div class="invalid-feedback">${description.rule}</div>
      </div>`

    this.innerHTML = `
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createTask">
        Add Task
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
                    ${getListOptions(priorityOptions)}
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

    this.querySelector("#taskForm").addEventListener(
      "submit",
      validateTaskForm,
    );
  }
}

customElements.define("new-task", NewTask);

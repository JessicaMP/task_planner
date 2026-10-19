const rules = {
  title: 8,
  assignee: 8,
  description: 15,
};

export const validateTaskForm = (e) => {
  e.preventDefault();
  const form = e.target

  Object.entries(rules).forEach(([name, minLength]) => {
    const input = form.elements[name];
    const value = input.value.trim();

    if (value.length <= minLength) {
      input.setCustomValidity(`Debe tener más de ${minLength} caracteres`);
    } else {
      input.setCustomValidity(""); 
    }
  });


  form.classList.add("was-validated");

  if (!form.checkValidity()) {
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  console.log("Tarea válida:", data);

  form.reset();
  form.classList.remove("was-validated");
  bootstrap.Modal.getInstance(document.getElementById("createTask")).hide();
};

import { rules_inputs } from "./form-rules.js";

// Aplica las reglas personalizadas (sin mostrar errores todavía)
export const applyCustomRules = (form) => {
  Object.entries(rules_inputs).forEach(([name, minLength]) => {
    const input = form.elements[name];
    const value = input.value.trim();

    input.setCustomValidity(
      value.length <= minLength ? `Must be longer than ${minLength} characters` : "",
    );
  });
};

// Valida el formulario y devuelve true/false
export const validateTaskForm = (form) => {
  applyCustomRules(form);
  form.classList.add("was-validated");
  return form.checkValidity();
};
import { rules_inputs } from "./form-rules.js";

export const applyCustomRules = (form) => {
  Object.entries(rules_inputs).forEach(([name, minLength]) => {
    const input = form.elements[name];
    const value = input.value.trim();

    input.setCustomValidity(
      value.length <= minLength ? `Must be longer than ${minLength} characters` : "",
    );
  });
};

export const validateTaskForm = (form) => {
  applyCustomRules(form);
  form.classList.add("was-validated");
  return form.checkValidity();
};
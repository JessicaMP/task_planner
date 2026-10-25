export const rules_inputs = {
  title: 8,
  assignee: 8,
  description: 15,
};

const getRule = (label, num) => `${label} must be longer than ${num} characters`;

export const rules_form = {
  title: {
    name: "Title",
    placeholder: "Title task",
    rule: getRule("The title", rules_inputs.title),
    minlength: rules_inputs.title,
  },
  initDate: {
    name: "Start date",
    rule: null,
  },
  endDate: {
    name: "End date",
    rule: "The due date is required",
  },
  status: {
    name: "Status",
    rule: "Select a status",
  },
  assignee: {
    name: "Assignee",
    placeholder: "Leo Messi",
    rule: getRule("The assignee", rules_inputs.assignee),
    minlength: rules_inputs.assignee,
  },
  priority: {
    name: "Priority",
    rule: null,
  },
  color: {
    name: "Color card",
    placeholder: "Choose your color",
    rule: null,
  },
  description: {
    name: "Description",
    placeholder: "Describe the task",
    rule: getRule("The description", rules_inputs.description),
    minlength: rules_inputs.description,
  },
};
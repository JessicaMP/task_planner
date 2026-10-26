export class Task {
  constructor({
    id,
    title,
    description,
    initDate,
    endDate,
    status,
    assignee,
    priority,
    color,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.initDate = initDate;
    this.endDate = endDate;
    this.status = Number(status);
    this.assignee = assignee;
    this.priority = Number(priority);
    this.color = color;
  }
}
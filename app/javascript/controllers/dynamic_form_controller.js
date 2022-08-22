import { Controller } from "@hotwired/stimulus";

function generateGuid() {
  var result = "",
    n = 0;
  while (n < 32) {
    result +=
      (~[8, 12, 16, 20].indexOf(n++) ? "-" : "") + Math.floor(Math.random() * 16).toString(16);
  }
  return result;
}

// Connects to data-controller="dynamic-form"
export default class extends Controller {
  static targets = ["row", "template", "front", "back", "add_button", "delete_button"];

  connect() {}
  // TODO: Walidacja add new row

  createNewRow(id) {
    const newRow = document.createElement("div");
    newRow.setAttribute("data-id", id);
    newRow.classList.add("flex", "items-center", "justify-between", "relative", "mb-6");

    const span = document.createElement("span");
    span.innerText = `#${id + 1}`;
    span.classList.add("absolute", "-left-6");

    const idInput = document.createElement("input");
    idInput.setAttribute("type", "hidden");
    idInput.setAttribute("name", `deck[cards][${id}][id]`);
    idInput.setAttribute("value", generateGuid());

    newRow.appendChild(span);
    newRow.appendChild(idInput);

    const frontDiv = this.frontTarget.cloneNode(true);
    const frontLabel = frontDiv.getElementsByTagName("label")[0];
    const frontId = `deck_cards_${id}_front`;
    frontLabel.setAttribute("for", frontId);

    const frontInput = frontDiv.getElementsByTagName("input")[0];
    frontInput.setAttribute("name", `deck[cards][${id}][front]`);
    frontInput.setAttribute("id", frontId);
    frontInput.value = "";

    newRow.appendChild(frontDiv);

    const backDiv = this.backTarget.cloneNode(true);

    const backLabel = backDiv.getElementsByTagName("label")[0];
    const backId = `deck_cards_${id}_back`;
    backLabel.setAttribute("for", backId);

    const backInput = backDiv.getElementsByTagName("input")[0];
    backInput.setAttribute("name", `deck[cards][${id}][back]`);
    backInput.setAttribute("id", backId);
    backInput.value = "";

    newRow.appendChild(backDiv);

    const deleteButton = this.delete_buttonTarget.cloneNode(true);
    newRow.appendChild(deleteButton);

    return newRow;
  }

  get_last_row_id() {
    const rows = Array.from(this.templateTarget.children).filter(
      el => el.getAttribute("data-id") !== null
    );
    const lastRowId = rows.length > 0 ? rows[rows.length - 1].getAttribute("data-id") : 0;
    return +lastRowId;
  }

  add_field(e) {
    e.preventDefault();

    const lastRowId = this.get_last_row_id();

    const newRow = this.createNewRow(lastRowId + 1);

    this.templateTarget.insertAdjacentElement("beforeend", newRow);
    const inputToFocus = newRow.getElementsByTagName("input")[0];

    const addButton = this.add_buttonTarget;
    this.templateTarget.insertAdjacentElement("beforeend", addButton);

    inputToFocus.focus();
  }

  delete_field(e) {
    e.preventDefault();
    const parentId = e.target.parentElement.getAttribute("data-id");
    const row = document.querySelector(`[data-id="${parentId}"]`);

    row.remove();
  }
}

import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dynamic-form"
export default class extends Controller {
  static targets = ['row', 'template', 'front', 'back', 'add_button', 'delete_button'];

  connect() { }
  // TODO: Walidacja add new row

  createNewRow(id) {
    const newRow = document.createElement('div');
    newRow.setAttribute('data-id', id);
    newRow.classList.add('flex', 'items-center', 'justify-between', 'relative', 'mb-6');

    const span = document.createElement('span');
    span.innerText = `#${id+1}`;
    span.classList.add('absolute', '-left-6');
    newRow.appendChild(span);

    const frontDiv = this.frontTarget.cloneNode(true);
    const frontLabel = frontDiv.getElementsByTagName('label')[0];
    const frontId = `deck_cards_${id}_front`
    frontLabel.setAttribute('for', frontId);

    const frontInput = frontDiv.getElementsByTagName('input')[0];
    frontInput.setAttribute('name', `deck[cards][${id}][front]`);
    frontInput.setAttribute('id', frontId);
    frontInput.value = '';

    newRow.appendChild(frontDiv);

    const backDiv = this.backTarget.cloneNode(true);

    const backLabel = backDiv.getElementsByTagName('label')[0];
    const backId = `deck_cards_${id}_back`
    backLabel.setAttribute('for', backId);

    const backInput = backDiv.getElementsByTagName('input')[0];
    backInput.setAttribute('name', `deck[cards][${id}][back]`);
    backInput.setAttribute('id', backId);
    backInput.value = '';

    newRow.appendChild(backDiv);

    const deleteButton = this.delete_buttonTarget.cloneNode(true);
    newRow.appendChild(deleteButton);

    return newRow;
  }

  get_last_row_id() {
    const rows = Array.from(this.templateTarget.children).filter(el => el.getAttribute('data-id') !== null);
    const lastRowId = rows.length > 0 ? rows.at(-1).getAttribute('data-id') : 0;
    return +lastRowId;
  }

  add_field(e) {
    e.preventDefault();

    const lastRowId = this.get_last_row_id();

    const newRow = this.createNewRow(lastRowId + 1);

    this.templateTarget.insertAdjacentElement('beforeend', newRow);
    const inputToFocus = newRow.getElementsByTagName('input')[0];

    const addButton = this.add_buttonTarget
    this.templateTarget.insertAdjacentElement('beforeend', addButton);

    inputToFocus.focus();
  }

  delete_field(e) {
    e.preventDefault();
    const parentId = e.target.parentElement.getAttribute('data-id');
    const row = document.querySelector(`[data-id="${parentId}"]`);

    row.remove();
  }
}

import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dynamic-form"
export default class extends Controller {
  static targets = ['row', 'template', 'front', 'back', 'add_button', 'delete_button'];

  connect() {
    console.log("🚀connect ~ this", this);
  }

  createNewRow(id) {
    const newRow = document.createElement('div');
    newRow.setAttribute('data-id', id);
    newRow.classList.add('flex', 'items-center', 'justify-between');

    const span = document.createElement('span');
    span.innerText = `#${id+1}`;
    newRow.appendChild(span);

    const frontDiv = this.frontTarget.cloneNode(true);

    const frontLabel = frontDiv.getElementsByTagName('label')[0];
    frontLabel.setAttribute('for', `deck_cards_${id}_front`);

    const frontInput = frontDiv.getElementsByTagName('input')[0];
    frontInput.setAttribute('name', `deck[cards][${id}][front]`);
    frontInput.setAttribute('id', `deck_cards_${id}_front`);
    frontInput.value = '';

    newRow.appendChild(frontDiv);

    const backDiv = this.backTarget.cloneNode(true);

    const backLabel = backDiv.getElementsByTagName('label')[0];
    backLabel.setAttribute('for', `deck_cards_${id}_back`);

    const backInput = backDiv.getElementsByTagName('input')[0];
    backInput.setAttribute('name', `deck[cards][${id}][back]`);
    backInput.setAttribute('id', `deck_cards_${id}_back`);
    backInput.value = '';

    newRow.appendChild(backDiv);

    const addButton = this.add_buttonTarget
    newRow.appendChild(addButton);

    const deleteButton = this.delete_buttonTarget.cloneNode(true);
    newRow.appendChild(deleteButton);

    return newRow;

  }

  add_field(e) {
    e.preventDefault();
    const template = this.templateTarget;
    const lastRow = template.lastElementChild;
    const lastRowId = lastRow.getAttribute('data-id');

    const newRow = this.createNewRow(+lastRowId + 1);

    this.templateTarget.insertAdjacentElement('beforeend', newRow);
  }

  delete_field(e) {
    e.preventDefault();
    const parentId = e.target.parentElement.getAttribute('data-id');
    const row = document.querySelector(`[data-id="${parentId}"]`);

    row.remove();
  }
}

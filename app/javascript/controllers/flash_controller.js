import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['message'];

    initialize() {
        setTimeout(() => {
            this.close();
        }, 5000);
    }

    close() {
        const message = this.messageTarget;

        if (!message) return;

        this.messageTarget.classList.add('hidden');
    }

    disconnect() {
        this.close();
    }
}

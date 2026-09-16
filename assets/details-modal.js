// customElements.define('details-modal', DetailsModal);
if (!customElements.get('details-modal')) {
  customElements.define('details-modal', class DetailsModal extends HTMLElement {
    constructor() {
      super();
      this.detailsContainer = this.querySelector('details');
      this.summaryToggle = this.querySelector('summary');
      this.closeButton = this.querySelector('.search-modal__close-button');
      
      // Close modal when clicking outside
      this.detailsContainer.addEventListener('keyup', (event) => event.code === 'Escape' && this.close());
      
      // Close modal when clicking on overlay
      const overlay = this.querySelector('.modal-overlay');
      if (overlay) {
        overlay.addEventListener('click', this.close.bind(this));
      }
      
      // Close button click handler
      if (this.closeButton) {
        this.closeButton.addEventListener('click', this.close.bind(this));
      }
      
      this.summaryToggle.addEventListener('click', this.onSummaryClick.bind(this));
      this.detailsContainer.addEventListener('click', this.onDetailsClick.bind(this));
    }

    isOpen() {
      return this.detailsContainer.hasAttribute('open');
    }

    onSummaryClick(event) {
      event.preventDefault();
      if (this.isOpen()) {
        this.close();
      } else {
        this.open(event);
      }
    }

    onDetailsClick(event) {
      const summaryElement = this.querySelector('summary');
      const targetElement = event.target.closest('summary');
      
      if (targetElement === summaryElement) {
        return; // Let the summary handle the click
      }
      
      // Close if clicking outside the modal content
      const modalContent = this.querySelector('.search-modal__content');
      if (modalContent && !modalContent.contains(event.target)) {
        this.close();
      }
    }

    open(event) {
      this.detailsContainer.setAttribute('open', true);
      const input = this.querySelector('input[type="search"]');
      if (input) {
        input.focus();
        input.select();
      }
    }

    close() {
      this.detailsContainer.removeAttribute('open');
      this.dispatchEvent(new CustomEvent('modalClosed'));
    }
  });
}
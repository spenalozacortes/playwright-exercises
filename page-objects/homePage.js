class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.popupClose = this.page.locator('[id^=popup-widget][id$=close-icon]');
    this.joinUsLink = this.page.getByRole('navigation').getByRole('link', { name: 'JOIN US' });
    this.firstNameInput = this.page.getByLabel(/First Name/i);
    this.lastNameInput = this.page.getByLabel(/Last Name/i);
    this.emailInput = this.page.getByLabel(/Email/i);
    this.phoneInput = this.page.getByLabel(/Phone/i);
    this.messageInput = this.page.getByLabel(/Message/i);
    this.submitButton = this.page.getByRole('button', { name: /submit/i });
    this.successMessage = this.page.locator('[data-aid="CONTACT_FORM_SUBMIT_SUCCESS_MESSAGE"]');
    this.contactFormSection = this.page.locator('[data-aid="CONTACT_FORM_TITLE_REND"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async closePopupIfVisible() {
    if (await this.popupClose.isVisible()) {
      await this.popupClose.click();
    }
  }

  async openLoginForm() {
    await this.joinUsLink.click();
  }

  async scrollToContactForm() {
    await this.contactFormSection.scrollIntoViewIfNeeded();
  }

  async fillContactForm({ firstName, lastName, email, phone, message }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.messageInput.fill(message);
  }

  async submitContactForm() {
    await this.submitButton.click();
  }

  async getSuccessMessage() {
    await this.successMessage.waitFor({ state: 'visible' });
    return await this.successMessage.textContent();
  }
}

export default { HomePage }; 

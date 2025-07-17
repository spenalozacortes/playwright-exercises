class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.popupClose = this.page.locator('[id^=popup-widget][id$=close-icon]');
    this.joinUsLink = this.page.getByRole('navigation').getByRole('link', { name: 'JOIN US' });
  }

  async goto() {
    await this.page.goto('https://candymapper.com/');
  }

  async closePopupIfVisible() {
    if (await this.popupClose.isVisible()) {
      await this.popupClose.click();
    }
  }

  async openLoginForm() {
    await this.joinUsLink.click();
  }
}

export default { HomePage }; 
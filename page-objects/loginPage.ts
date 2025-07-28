import { Page, Locator } from '@playwright/test';

class LoginPage {
  page: Page;
  emailInput: Locator;
  passwordInput: Locator;
  signInButton: Locator;
  loginMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    this.signInButton = this.page.getByRole('button', { name: 'Sign in' });
    this.loginMessage = this.page.getByRole('heading', { name: 'Account Login' });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async getLoginMessage() {
    return await this.loginMessage.textContent();
  }
}

export { LoginPage }; 

import { Selector } from 'testcafe';
// eslint-disable-next-line no-unused-vars
import { navBar } from './navbar.component';

class SignupPage {
  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
    this.levelSelector = Selector('#user-level');
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, name, username, password, image, level, grasshopperCourses, senseiCourses, description) {
    await testController.typeText('#user-name', name);
    await testController.typeText('#user-email', username);
    await testController.typeText('#user-password', password);
    await testController.typeText('#user-image', image);
    await testController
      .click(this.levelSelector)
      .click(this.levelSelector.find('option').withText(level));
    await testController.typeText('#user-description', description);
    await testController.click('#new-user-submit input.btn.btn-primary');
  }

  async signupUserNoName(testController, username, password, image, level, grasshopperCourses, senseiCourses, description) {
    await testController.typeText('#user-email', username);
    await testController.typeText('#user-password', password);
    await testController.typeText('#user-image', image);
    await testController
      .click(this.levelSelector)
      .click(this.levelSelector.find('option').withText(level));
    await testController.typeText('#user-description', description);
    await testController.click('#new-user-submit input.btn.btn-primary');
  }

  async isAlertDisplayed(testController) {
    const signupAlert = Selector('#signup-alert').withText('Registration was not successful');

    await testController.expect(signupAlert).ok();
  }

  async isErrorDisplayed(testController) {
    const signupError = Selector('#signup-error');

    await testController.expect(signupError).ok();
  }
}

export const signupPage = new SignupPage();

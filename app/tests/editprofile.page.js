import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#edit-user-home';
    this.pageSelector = Selector(this.pageId);
    this.levelSelector = Selector('#user-level');
    this.nameSelector = Selector('#user-name');
    this.cardSelector = Selector('#edit-profile');
    this.submitUpdateSelector = Selector('#submit-update input.btn.btn-primary');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async isUpdated(testController, updatedLevel) {
    const alertButton = Selector('.swal-button--confirm').withText('OK');

    await testController
      .click(this.levelSelector)
      .click(this.levelSelector.find('option').withText(updatedLevel))
      .click(this.submitUpdateSelector)
      .click(alertButton());

    const currentLevel = this.levelSelector.value;
    await testController.expect(currentLevel).eql(updatedLevel);
  }

  async hasMaliciousInput(testController, updatedName) {
    const alertButton = Selector('.swal-button--confirm').withText('OK');

    await testController
      .click(this.nameSelector)
      .pressKey('ctrl+a backspace')
      .typeText(this.nameSelector, updatedName)
      .click(this.submitUpdateSelector)
      .click(alertButton());

    const profile = Selector(this.nameSelector).value;
    await testController.expect(profile).eql(updatedName);
  }

  async isErrorDisplayed(testController) {
    const signupError = Selector('#edit-error');

    await testController.click(this.nameSelector);
    await testController.pressKey('ctrl+a backspace');
    await testController.click(this.submitUpdateSelector);
    await testController.expect(signupError.exists).ok();
  }
}

export const editProfilePage = new EditProfilePage();

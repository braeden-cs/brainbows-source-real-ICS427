import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#edit-user-home';
    this.pageSelector = Selector(this.pageId);
    this.levelSelector = Selector('#user-level');
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
}

export const editProfilePage = new EditProfilePage();

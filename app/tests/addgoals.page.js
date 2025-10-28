import { Selector } from 'testcafe';

class AddGoalsPage {
  constructor() {
    this.pageId = '#add-goals';
    this.pageSelector = Selector(this.pageId);
    this.shortGoalSelector = Selector('#shortGoal');
    this.longGoalSelector = Selector('#longGoal');
    this.submitGoalSelector = Selector('#submitGoal input.btn.btn-primary');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async createGoal(testController, shortTermGoal, longTermGoal) {
    const alertButton = Selector('.swal-button--confirm').withText('OK');

    await testController
      .typeText(this.shortGoalSelector, shortTermGoal)
      .typeText(this.longGoalSelector, longTermGoal)
      .click(this.submitGoalSelector)
      .click(alertButton());
  }

  async hasGoalError(testController) {
    const goalError = Selector('#goal-error');

    await testController.click(this.submitGoalSelector);
    await testController.expect(goalError.exists).ok();
  }
}

export const addGoalsPage = new AddGoalsPage();

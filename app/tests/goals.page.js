import { Selector } from 'testcafe';

class GoalsPage {
  constructor() {
    this.pageId = '#goals';
    this.pageSelector = Selector(this.pageId);
    this.goalSelector = Selector('#goal');
    this.deleteGoalSelector = Selector('#removeGoal');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasGoal(testController, shortGoal, longGoal) {
    const goalNotification = this.goalSelector
      .withText(`Short Term Goal: ${shortGoal}`)
      .withText(`Long Term Goal: ${longGoal}`);

    await testController
      .expect(goalNotification.exists).ok();
  }

  async deleteGoal(testController) {
    await testController.click(this.deleteGoalSelector);
  }
}

export const goalsPage = new GoalsPage();

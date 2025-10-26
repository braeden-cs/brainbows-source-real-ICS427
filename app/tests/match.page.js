import { Selector } from 'testcafe';

class MatchPage {
  constructor() {
    this.pageId = '#match';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoUrgentSeshPage(testController) {
    await testController.click('#urgent-sesh');
  }

  async gotoRecruitPage(testController) {
    await testController.click('#recruit');
  }

  async gotoSpecificRecruit(testController, name) {
    const userCard = Selector('#user-card').withText(name);
    const recruitButton = userCard.find('#recruit');
    await testController
      .click(recruitButton);
  }
}

export const matchPage = new MatchPage();

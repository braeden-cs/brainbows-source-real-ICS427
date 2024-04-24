import { Selector } from 'testcafe';

class LeaderboardPage {
  constructor() {
    this.pageId = '#leaderboard-nav';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const leaderboardPage = new LeaderboardPage();

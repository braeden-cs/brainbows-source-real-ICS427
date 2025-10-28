import { Selector } from 'testcafe';

class RecruitPage {
  constructor() {
    this.pageId = '#recruit';
    this.pageSelector = Selector(this.pageId);
    this.courseSelector = Selector('#course');
    this.topicSelector = Selector('#topic');
    this.startTimeSelector = Selector('#start-time');
    this.endTimeSelector = Selector('#end-time');
    this.submitSelector = Selector('#submit-recruit input.btn.btn-primary');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async fillRecruitForm(testController, course, topic, startTime, endTime) {
    const alertButton = Selector('.swal-button--confirm').withText('OK');

    await testController
      .click(this.courseSelector)
      .click(this.courseSelector.find('option').withText(course))
      .typeText(this.topicSelector, topic)
      .click(this.startTimeSelector)
      .click(this.startTimeSelector.find('option').withText(startTime))
      .click(this.endTimeSelector)
      .click(this.endTimeSelector.find('option').withText(endTime))
      .click(this.submitSelector)
      .click(alertButton());
  }

  async isErrorDisplayed(testController) {
    const seshError = Selector('#sesh-error');

    await testController.click(this.submitSelector);
    await testController.expect(seshError.exists).ok();
  }
}

export const recruitPage = new RecruitPage();

import { Selector } from 'testcafe';

class UrgentPage {
  constructor() {
    this.pageId = '#urgent-sesh';
    this.pageSelector = Selector(this.pageId);
    this.nameSelector = Selector('#urgent-name');
    this.courseSelector = Selector('#urgent-course');
    this.topicSelector = Selector('#urgent-topic');
    this.startTimeSelector = Selector('#urgent-startTime');
    this.endTimeSelector = Selector('#urgent-endTime');
    this.submitSelector = Selector('#urgent-submit input.btn.btn-primary');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async fillUrgentSeshForm(testController, name, course, topic, startTime, endTime) {
    const alertButton = Selector('.swal-button--confirm').withText('OK');

    await testController
      .typeText(this.nameSelector, name)
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
}

export const urgentPage = new UrgentPage();

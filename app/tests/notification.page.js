import { Selector } from 'testcafe';

class NotificationPage {
  constructor() {
    this.pageId = '#notification-nav';
    this.pageSelector = Selector(this.pageId);
    this.notification = Selector('#study-notif');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasStudyNotification(testController, student, course, topic, startTime, endTime) {
    const studyNotification = this.notification
      .withText(`Student: ${student}`)
      .withText(`Course: ${course}`)
      .withText(`Topic: ${topic}`)
      .withText(`Time: ${startTime} - ${endTime}`);

    await testController
      .expect(studyNotification.exists).ok();
  }
}

export const notifPage = new NotificationPage();

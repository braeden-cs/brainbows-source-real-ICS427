import { Selector } from 'testcafe';

class NotificationPage {
  constructor() {
    this.pageId = '#notification-nav';
    this.pageSelector = Selector(this.pageId);
    this.notification = Selector('#study-notif');
    this.urgentNotification = Selector('#urgent-notif');
    this.deleteSelector = Selector('#delete-button');
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

  async hasUrgentStudyNotification(testController, student, course, topic, startTime, endTime) {
    const studyNotification = this.urgentNotification
      .withText(`Student: ${student}`)
      .withText(`Course: ${course}`)
      .withText(`Topic: ${topic}`)
      .withText(`Time: ${startTime} - ${endTime}`);

    await testController
      .expect(studyNotification.exists).ok();
  }

  async deleteNotification(testController) {
    await testController.click(this.deleteSelector);
  }

  async hasScripts(testController, student, course, topic, startTime, endTime) {
    const studyNotification = this.Notification
      .withText(`Student: ${student}`)
      .withText(`Course: ${course}`)
      .withText(`Topic: ${topic}`)
      .withText(`Time: ${startTime} - ${endTime}`);

    const html = await studyNotification.innerHTML;

    await testController.expect(html).notContains('<script>');
  }
}

export const notifPage = new NotificationPage();

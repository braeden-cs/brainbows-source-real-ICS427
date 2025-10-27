import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userHomePage } from './userhome.page';
import { leaderboardPage } from './leaderboard.page';
import { calendarPage } from './calendar.page';
import { officeHoursPage } from './officehours.page';
import { editProfilePage } from './editprofile.page';
import { matchPage } from './match.page';
import { notifPage } from './notification.page';
import { urgentPage } from './urgent.page';
import { recruitPage } from './recruit.page';
import { goalsPage } from './goals.page';
import { addGoalsPage } from './addgoals.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme', name: 'John Doe' };
const senseiCredentials = { username: 'steve@foo.com', password: 'changeme', name: 'steve blemming' };
const recruitInfo = { course: 'ICS 111', topic: 'testing', startTime: '7 am', endTime: '8 am' };
const urgentSeshInfo = { course: 'ICS 111', topic: 'urgent testing', startTime: '7 am', endTime: '8 am' };
const goalInfo = { short: 'short term goal', long: 'long term goal' };
const updateProfileInfo = { level: 'Sophomore' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the user home page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserHomePage(testController);
  await userHomePage.isDisplayed(testController);
});
test('Test that the edit page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoEditProfilePage(testController);
  await editProfilePage.isDisplayed(testController);
});

test('Test that the match page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMatchPage(testController);
  await matchPage.isDisplayed(testController);
});

test('Test that the notification page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoNotificationPage(testController);
  await notifPage.isDisplayed(testController);
});

test('Test that the urgent sesh page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMatchPage(testController);
  await matchPage.gotoUrgentSeshPage(testController);
  await urgentPage.isDisplayed(testController);
});

test('Test that the recruit page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMatchPage(testController);
  await matchPage.gotoRecruitPage(testController);
  await recruitPage.isDisplayed(testController);
});

test('Test that the calendar page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoCalendarPage(testController);
  await calendarPage.isDisplayed(testController);
});

test('Test that the office hours page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoOfficeHoursPage(testController);
  await officeHoursPage.isDisplayed(testController);
});

test('Test that the leaderboard page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoLeaderboardPage(testController);
  await leaderboardPage.isDisplayed(testController);
});

test('Test that the goals page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserHomePage(testController);
  await goalsPage.isDisplayed(testController);
});

test('Test that the add goals page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserHomePage(testController);
  await addGoalsPage.isDisplayed(testController);
});

test('Test that the Recruit function works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMatchPage(testController);
  await matchPage.isDisplayed(testController);
  await matchPage.gotoSpecificRecruit(testController, senseiCredentials.name);
  await recruitPage.isDisplayed(testController);
  await recruitPage.fillRecruitForm(testController, recruitInfo.course, recruitInfo.topic, recruitInfo.startTime, recruitInfo.endTime);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, senseiCredentials.username, senseiCredentials.password);
  await navBar.gotoNotificationPage(testController);
  await notifPage.isDisplayed(testController);
  await notifPage.hasStudyNotification(testController, credentials.username, recruitInfo.course, recruitInfo.topic, recruitInfo.startTime, recruitInfo.endTime);
});

test('Test that the Urgent Study Sesh function works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMatchPage(testController);
  await matchPage.isDisplayed(testController);
  await matchPage.gotoUrgentSeshPage(testController);
  await urgentPage.isDisplayed(testController);
  await urgentPage.fillUrgentSeshForm(testController, credentials.name, urgentSeshInfo.course, urgentSeshInfo.topic, urgentSeshInfo.startTime, urgentSeshInfo.endTime);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, senseiCredentials.username, senseiCredentials.password);
  await navBar.gotoNotificationPage(testController);
  await notifPage.isDisplayed(testController);
  await notifPage.hasUrgentStudyNotification(testController, credentials.username, urgentSeshInfo.course, urgentSeshInfo.topic, urgentSeshInfo.startTime, urgentSeshInfo.endTime);
});

test('Test that the delete notification function works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, senseiCredentials.username, senseiCredentials.password);
  await navBar.gotoNotificationPage(testController);
  await notifPage.isDisplayed(testController);
  await notifPage.deleteNotification(testController);
});

test('Test that the add goal function works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddGoalsPage(testController);
  await addGoalsPage.createGoal(testController, goalInfo.short, goalInfo.long);
  await navBar.gotoUserHomePage(testController);
  await navBar.gotoViewGoalsPage(testController);
  await goalsPage.hasGoal(testController, goalInfo.short, goalInfo.long);
});

test('Test that the delete goal notification function works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoViewGoalsPage(testController);
  await goalsPage.deleteGoal(testController);
});

test('Test that the edit page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoEditProfilePage(testController);
  await editProfilePage.isDisplayed(testController);
  await editProfilePage.isUpdated(testController, updateProfileInfo.level);
});

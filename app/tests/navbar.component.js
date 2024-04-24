import { Selector } from 'testcafe';

class NavBar {
  async gotoSignInPage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignUpPage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  async gotoUserHomePage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#home-nav');
  }

  async gotoLeaderboardPage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#leaderboard-nav');
  }

  async gotoOfficeHoursPage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#list-stuff-nav');
  }

  async gotoCalendarPage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#list-stuff-nav');
  }
}

export const navBar = new NavBar();

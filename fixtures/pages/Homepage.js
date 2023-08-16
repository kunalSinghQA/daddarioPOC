const { executeStep } = require("../../utilities/actions");

require("dotenv").config();
exports.Homepage = class Homepage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.acceptOrDeclineCokkies = (option) =>
      page.locator(
        `//div[contains(@class,"banner-actions-container")]/button[contains(text(),"${option}")]`
      );
    this.navItems = (navItem) =>
      page.locator(
        `//nav[contains(@data-view,"MenuDesktop")]//li[contains(@class,"top-level-item")]/div[contains(text(),"${navItem}")]`
      );
    this.selectGetStarted = (buttonName, title) =>
      page.locator(
        `//a[contains(text(),"${buttonName}")][contains(@title,"${title}")]/ancestor::div[contains(@class,"slick-active")]`
      );
  }

  navigateToHomepage = async (URL) => {
    await executeStep(
      this.test,
      await this.page,
      "navigate",
      `Navigate to ${URL}`,
      URL
    );
  };

  handleCokkies = async (option) => {
    await executeStep(
      this.test,
      this.acceptOrDeclineCokkies(option),
      "click",
      `${option} the cokkies`
    );
  };

  selectingANavElement = async (navItem) => {
    await executeStep(
      this.test,
      this.navItems(navItem),
      "click",
      `Selecting ${navItem} from top menu`
    );
  };

  selectingGetStarted = async (button, title) => {
    await executeStep(
      this.test,
      this.selectGetStarted(button, title),
      "click",
      `Selecting ${button} from top menu`
    );
  };
};

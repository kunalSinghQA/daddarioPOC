const { executeStep } = require('../../utilities/actions');

require('dotenv').config();
exports.ResultsPage = class ResultsPage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.navItems = (text) =>
      page.locator(
        `//div[contains(@class,"navigation-item--visited")]//div[contains(text(),"${text}")]`
      );
    this.activeNavItems = (navItems) =>
      page.locator(
        `//div[contains(@class,"navigation-item--active")]//div[contains(text(),"${navItems}")]`
      );
  }

  selectingANavItem = async (option) => {
    await executeStep(
      this.test,
      this.navItems(option),
      'click',
      `Selecting ${option} from available options`
    );
  };
};

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
  }

  navigateToHomepage = async (URL) => {
    await executeStep(
      this.test,
      this.page,
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
};

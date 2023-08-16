const { executeStep } = require("../../utilities/actions");

require("dotenv").config();
exports.Homepage = class Homepage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.drumheadOptions = (option) =>
      page.locator(`//div[contains(@data-name,${option})]`);
  }

  selectingDrum = async (option) => {
    await executeStep(
      this.test,
      this.drumheadOptions(option),
      "click",
      `Selecting ${option} from available options`
    );
  };
};

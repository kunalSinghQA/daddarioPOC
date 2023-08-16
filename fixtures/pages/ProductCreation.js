const { executeStep } = require("../../utilities/actions");

require("dotenv").config();
exports.ProductCreation = class ProductCreation {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.drumheadOptions = (option) =>
      page.locator(`//div[contains(@data-name,${option})]`);
    this.backButton = page.getByRole('button', { name: 'Back' })
    this.nextButton = page.getByRole('button', { name: 'Next' })

  }

  selectingDrum = async (option) => {
    await executeStep(
      this.test,
      this.drumheadOptions(option),
      "click",
      `Selecting ${option} from available options`
    );
  };

  clickingOnNextBuuton = async ()=>{
    await executeStep(
      this.test,
      this.nextButton,
      'click',
      `clicking on next button`
    );
  }
  clickingOnBackBuuton = async ()=>{
    await executeStep(
      this.test,
      this.backButton,
      'click',
      `clicking on back button`
    );
  }

  
};

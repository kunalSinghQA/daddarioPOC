const { executeStep } = require('../../utilities/actions');

require('dotenv').config();
exports.ProductCreation = class ProductCreation {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.drumTypeOptions = (option) =>
      page.locator(`//div[contains(@data-name,"${option}")]`);
    this.drumFindByText = (text) =>
      page.locator(`//div[contains(text(),"${text}")]`);
    this.backButton = page.getByRole('button', { name: 'Back' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.textInDrumHead = (text) => page.getByText(text).first();
    this.saveTheResult = (text) =>
      page.locator(`//span[contains(text(),"${text}")]`);
    this.skipTheResult = (text) =>
      page.locator(`//div[contains(text(),"${text}")]`);
    this.viewProductsButton = (text) =>
      page.locator(
        `//div[contains(@class,"result-items")]//div[contains(@class,"learn_more_button")][contains(text(),"${text}")]`
      );
  }

  selectingDrumType = async (option) => {
    await executeStep(
      this.test,
      this.drumTypeOptions(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingDrumhead = async (option) => {
    await executeStep(
      this.test,
      this.drumTypeOptions(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingDrumSize = async (option) => {
    await executeStep(
      this.test,
      this.drumTypeOptions(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingDrumReason = async (option) => {
    await executeStep(
      this.test,
      this.drumTypeOptions(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingDrumEnvrioment = async (option) => {
    await executeStep(
      this.test,
      this.drumTypeOptions(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingDrumGenre = async (option) => {
    await executeStep(
      this.test,
      this.drumTypeOptions(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingDrumSustain = async (option) => {
    await executeStep(
      this.test,
      this.textInDrumHead(option),
      'click',
      `Selecting ${option} from available options`
    );
    await this.page.waitForTimeout(1000);
  };

  selectingDrumTone = async (option) => {
    await executeStep(
      this.test,
      this.textInDrumHead(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingSkipResult = async (option) => {
    await executeStep(
      this.test,
      this.skipTheResult(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingViewProduct = async (option) => {
    await executeStep(
      this.test,
      this.viewProductsButton(option),
      'click',
      `Selecting ${option}`
    );
  };

  clickingOnNextButton = async () => {
    await executeStep(
      this.test,
      this.nextButton,
      'click',
      `clicking on next button`
    );
  };

  clickingOnBackButton = async () => {
    await executeStep(
      this.test,
      this.backButton,
      'click',
      `clicking on back button`
    );
  };
};

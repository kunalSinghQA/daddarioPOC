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
    this.textInDrumbHead = (text) => page.getByText(text);
    this.saveTheResult = (text) =>
      page.locator(`//span[contains(text(),"${text}")]`);
    this.skipTheResult = (text) =>
      page.locator(`//div[contains(text(),"${text}")]`);
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

  selectingDrumbSize = async (option) => {
    await executeStep(
      this.test,
      this.drumTypeOptions(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingDrumbReason = async (option) => {
    await executeStep(
      this.test,
      this.drumTypeOptions(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingDrumbEnvrioment = async (option) => {
    await executeStep(
      this.test,
      this.drumTypeOptions(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingDrumbGenre = async (option) => {
    await executeStep(
      this.test,
      this.drumTypeOptions(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingDrumbSustain = async (option) => {
    await executeStep(
      this.test,
      this.drumFindByText(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingDrumbTone = async (option) => {
    await executeStep(
      this.test,
      this.drumFindByText(option),
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

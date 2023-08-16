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
    this.addToCart = (text) =>
      page.locator(
        `//div[contains(@class,"add-to-cart")]//button[contains(text(),"${text}")]`
      );
    this.goToCart = (text) =>
      page.locator(
        `//div[contains(@class,"mini-cart-subtotal")]/div[contains(text(),"${text}")]`
      );
    this.proceedAsGuest = page.locator('#proceed-to-checkout-button');
  }

  selectingANavItem = async (option) => {
    await executeStep(
      this.test,
      this.navItems(option),
      'click',
      `Selecting ${option} from available options`
    );
  };

  selectingGoToKart = async (option) => {
    await executeStep(
      this.test,
      this.goToCart(option),
      'click',
      `Selecting ${option}`
    );
  };

  selectingAddToCart = async (option) => {
    await executeStep(
        this.test,
        this.page.locator('//div[contains(@data-variant-type,"ProductSize")]').nth(1),
        'click',
    )
    await executeStep(
      this.test,
      this.addToCart(option),
      'click',
      `Selecting ${option}`
    );
  };

  selectingProceedAsGuest = async (option) => {
    await executeStep(
      this.test,
      this.proceedAsGuest,
      'click',
      `Selecting ${option}`
    );
  };
};

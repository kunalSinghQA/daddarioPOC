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
      this.page
        .locator('//div[contains(@data-variant-type,"ProductSize")]')
        .nth(1),
      'click'
    );
    await executeStep(
      this.test,
      this.addToCart(option),
      'click',
      `Selecting ${option}`
    );
  };

  fillTheShippingDetails = async (faker) => {
    await this.page.locator('#shipping-F_Orange').click();
    await this.page
      .locator('#shipping-F_Orange')
      .fill(faker.person.firstName());
    await this.page.locator('#shipping-L_Red').click();
    await this.page.locator('#shipping-L_Red').fill(faker.person.lastName());
    await this.page.locator('#shipping-address1').click();
    await this.page
      .locator('#shipping-address1')
      .fill(faker.location.streetAddress());
    await this.page.locator('#shipping-city-name').click();
    await this.page.locator('#shipping-city-name').fill(faker.location.city());
    await this.page.locator('#shipping-state-container > .select2').click();
    await this.page.getByRole('searchbox').fill('New York');
    await this.page.getByRole('option', { name: 'New York' }).click();
    await this.page.locator('#shipping-postal-code').click();
    await this.page.locator('#shipping-postal-code').fill('10001');
    await this.page.locator('#CE_Purple').click();
    await this.page
      .locator('#CE_Purple')
      .fill(`${faker.person.firstName()}@test.com`);
    await this.page.locator('#phoneNumber').click();
    await this.page
      .locator('#phoneNumber')
      .fill(faker.phone.number());
    await this.page.locator('#credit-card-name').click();
    await this.page.locator('#credit-card-name').fill(faker.person.firstName());
    await this.page.locator('#credit-card-number').click();
    await this.page
      .locator('#credit-card-number')
      .fill(faker.finance.creditCardNumber());
    await this.page.locator('#credit-card-cvv').click();
    await this.page
      .locator('#credit-card-cvv')
      .fill(faker.finance.creditCardCVV());
    await this.page.locator('#credit-card-expiration-date').click();
    await this.page
      .locator('#credit-card-expiration-date')
      .fill('06/30');
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

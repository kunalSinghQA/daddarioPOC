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
    this.firstName = page.locator('#shipping-F_Orange');
    this.lastName = page.locator('#shipping-L_Red');
    this.placeOrderButton = page.locator('#order-confirmation-button');
    this.addressField = page.locator('#shipping-address1');
    this.cityField = page.locator('#shipping-city-name');
    this.stateField = page.locator('#shipping-state-container > .select2');
    this.postalCodeField = page.locator('#shipping-postal-code');
    this.secondOptionForCity = page.locator(
      '#shipping-state-container > .select2'
    );
    this.errorMeassageText = page.locator(
      '//div[@class="validation-summary-errors"]'
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

  clickingOnFirstName = async () => {
    await executeStep(
      this.test,
      this.firstName,
      'click',
      'clicking on first name'
    );
  };
  fillingFirstName = async (faker) => {
    await executeStep(
      this.test,
      this.firstName,
      'fill',
      `filling first name ${faker.person.firstName()}`,
      [faker.person.lastName()]
    );
  };

  clickingOnLastName = async () => {
    await executeStep(
      this.test,
      this.lastName,
      'click',
      'clicking on last name'
    );
  };
  fillingLastName = async (faker) => {
    await executeStep(
      this.test,
      this.lastName,
      'fill',
      `filling last name ${faker.person.lastName()}`,
      [faker.person.lastName()]
    );
  };
  clickingOnAddress = async () => {
    await executeStep(
      this.test,
      this.addressField,
      'click',
      'clicking on address field'
    );
  };
  fillingAddress = async (faker) => {
    await executeStep(
      this.test,
      this.addressField,
      'fill',
      `filling last name ${faker.location.streetAddress()}`,
      [faker.location.streetAddress()]
    );
  };
  clickingOnCity = async () => {
    await executeStep(
      this.test,
      this.cityField,
      'click',
      'clicking on city field'
    );
  };
  fillingCity = async (faker) => {
    await executeStep(
      this.test,
      this.cityField,
      'fill',
      `filling city ${faker.location.city()}`,
      [faker.location.city()]
    );
  };

  selectingSecondOptionForCity = async () => {
    await executeStep(
      this.test,
      this.secondOptionForCity,
      'click',
      'selecting second option '
    );
  };

  fillTheShippingDetails = async (faker) => {
    await this.clickingOnFirstName();
    await this.fillingFirstName(faker);
    await this.clickingOnLastName();
    await this.fillingLastName(faker);
    await this.clickingOnAddress();
    await this.fillingAddress(faker);
    await this.clickingOnCity();
    await this.fillingCity(faker);
    await this.selectingSecondOptionForCity();
    await this.page.getByRole('searchbox').fill('New York');
    await this.page.getByRole('option', { name: 'New York' }).click();
    await this.page.locator('#shipping-postal-code').click();
    await this.page.locator('#shipping-postal-code').fill('10001');
    await this.page.locator('#CE_Purple').click();
    await this.page
      .locator('#CE_Purple')
      .fill(`${faker.person.firstName()}@test.com`);
    await this.page.locator('#phoneNumber').click();
    await this.page.locator('#phoneNumber').fill(faker.phone.number());
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
    await this.page.locator('#credit-card-expiration-date').fill('06/30');
  };

  selectingProceedAsGuest = async (option) => {
    await executeStep(
      this.test,
      this.proceedAsGuest,
      'click',
      `Selecting ${option}`
    );
  };

  clickingOnPlaceOrderButton = async () => {
    await executeStep(
      this.test,
      this.placeOrderButton,
      'click',
      `clicking on place order button`
    );
  };
};

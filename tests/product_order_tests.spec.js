const { test, expect } = require('@playwright/test');
const Sections = require('../fixtures/pageIndex');
const testData = require('../fixtures/data/homepage.json');
const productsData = require('../fixtures/data/productCreation.json');
const { use } = require('../playwright.config');
require('dotenv').config();

test("'TC-01' Validate products are visible", async ({ page }) => {
  const homepage = new Sections.Homepage(page, test);
  // await homepage.navigateToHomepage(`${use.baseURL}/`);
  await page.goto(`${use.baseURL}/`);
  await expect(
    homepage.acceptOrDeclineCokkies(testData.cokkies.accept),
    `Verifying ${testData.cokkies.accept} button should be visible`
  ).toBeVisible();
  await expect(
    homepage.acceptOrDeclineCokkies(testData.cokkies.decline),
    `Verifying ${testData.cokkies.decline} button should be visible`
  ).toBeVisible();
  await homepage.handleCokkies(testData.cokkies.accept);
  for (let i = 0; i <= testData.headerElement; i++) {
    await expect(
      homepage.navItems(testData.headerElement[i]),
      `Verifying ${testData.headerElement[i]} option should be visible`
    ).toBeVisible();
  }
});

test("'TC-02' Validate get started button is visible and navigation is correct", async ({
  page,
}) => {
  const homepage = new Sections.Homepage(page, test);
  // await homepage.navigateToHomepage(`${use.baseURL}/`);
  await page.goto(`${use.baseURL}/`);
  await expect(
    homepage.acceptOrDeclineCokkies(testData.cokkies.accept),
    `Verifying ${testData.cokkies.accept} button should be visible`
  ).toBeVisible();
  await expect(
    homepage.acceptOrDeclineCokkies(testData.cokkies.decline),
    `Verifying ${testData.cokkies.decline} button should be visible`
  ).toBeVisible();
  await homepage.handleCokkies(testData.cokkies.accept);
  await expect(
    homepage.selectGetStarted(
      testData.slickSliderItems[0].drumhead[1].buttonName,
      testData.slickSliderItems[0].drumhead[0].title
    ),
    `Verifying ${testData.slickSliderItems[0].drumhead[1].buttonName} button should be visible`
  ).toBeVisible();
  await homepage.selectingGetStarted(
    testData.slickSliderItems[0].drumhead[1].buttonName,
    testData.slickSliderItems[0].drumhead[0].title
  );
  await expect(page).toHaveURL(/drumhead-finder/);
});

test("'TC-03' Validate get selecting a drumhead option once selected navigate to new page", async ({
  page,
}) => {
  const homepage = new Sections.Homepage(page, test);
  // await homepage.navigateToHomepage(`${use.baseURL}/`);
  await page.goto(`${use.baseURL}/`);
  await homepage.handleCokkies(testData.cokkies.accept);
  await expect(
    homepage.selectGetStarted(
      testData.slickSliderItems[0].drumhead[1].buttonName,
      testData.slickSliderItems[0].drumhead[0].title
    ),
    `Verifying ${testData.slickSliderItems[0].drumhead[1].buttonName} button should be visible`
  ).toBeVisible();
  await homepage.selectingGetStarted(
    testData.slickSliderItems[0].drumhead[1].buttonName
  );
  const productCreation = new Sections.ProductCreation(page, test);
  await expect(page).toHaveURL(/drumhead-finder/);
  for (let i = 0; i < productsData.typeOfDrumbs.length; i++) {
    await expect(
      productCreation.drumTypeOptions(productsData.typeOfDrumbs[i].type),
      `${productsData.typeOfDrumbs[i].type} is visible`
    ).toBeVisible();
  }
  await productCreation.selectingDrum(productsData.typeOfDrumbs[0].type);
  await expect(
    productCreation.textInDrumbHead(productsData.textInDrumbType),
    `${productsData.textInDrumbType} is visible`
  ).toBeVisible();
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumbHead(productsData.textInDrumbHead),
    `${productsData.textInDrumbHead} is visible`
  ).toBeVisible();
});

test.only("'TC-04' Verify that the selected drum 'Size' is highlighted and NEXT button is enabled", async ({
  page,
}) => {
  const homepage = new Sections.Homepage(page, test);
  // await homepage.navigateToHomepage(`${use.baseURL}/`);
  await page.goto(`${use.baseURL}/`);
  await homepage.handleCokkies(testData.cokkies.accept);
  await expect(
    homepage.selectGetStarted(
      testData.slickSliderItems[0].drumhead[1].buttonName,
      testData.slickSliderItems[0].drumhead[0].title
    ),
    `Verifying ${testData.slickSliderItems[0].drumhead[1].buttonName} button should be visible`
  ).toBeVisible();
  await homepage.selectingGetStarted(
    testData.slickSliderItems[0].drumhead[1].buttonName
  );
  const productCreation = new Sections.ProductCreation(page, test);
  await expect(page).toHaveURL(/drumhead-finder/);
  await productCreation.selectingDrum(productsData.typeOfDrumbs[0].type);
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrum(productsData.typeOfDrumbHeads[0].type);
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumbTypes(productsData.textInDrumbSize),
    `verifying text ${productsData.textInDrumbSize} is visible`
  );
});

test("'TC-07' Validate Enviroment values and forward /back button functionality", async ({
  page,
}) => {
  const homepage = new Sections.Homepage(page, test);
  // await homepage.navigateToHomepage(`${use.baseURL}/`);
  await page.goto(`${use.baseURL}/`);
  await homepage.handleCokkies(testData.cokkies.accept);
  await expect(
    homepage.selectGetStarted(
      testData.slickSliderItems[0].drumhead[1].buttonName,
      testData.slickSliderItems[0].drumhead[0].title
    ),
    `Verifying ${testData.slickSliderItems[0].drumhead[1].buttonName} button should be visible`
  ).toBeVisible();
  await homepage.selectingGetStarted(
    testData.slickSliderItems[0].drumhead[1].buttonName
  );
  const productCreation = new Sections.ProductCreation(page, test);
  await productCreation.selectingDrumType(productsData.typeOfDrumbs[0].type);
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumhead(
    productsData.typeOfDrumbHeads[0].type
  );
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumbSize(
    productsData.typeOfDrumbSize[0].type
  );
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumbReason(
    productsData.typeOfDrumbReason[0].type
  );
  await productCreation.clickingOnNextButton();
  for (let i = 0; i < productsData.typeOfDrumbEnvironmnet.length; i++) {
    await expect(
      productCreation.textInDrumbHead(
        productsData.typeOfDrumbEnvironmnet[i].type
      ),
      `${productsData.typeOfDrumbEnvironmnet[i].type} is visible`
    ).toBeVisible();
  }
  await productCreation.clickingOnBackButton();
  await expect(
    productCreation.textInDrumbHead(productsData.textInDrumbReason),
    `${productsData.textInDrumbReason} is visible`
  ).toBeVisible();
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumbEnvrioment(
    productsData.typeOfDrumbEnvironmnet[0].type
  );
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumbHead(productsData.textInDrumbGenre),
    `${productsData.textInDrumbGenre} is visible`
  ).toBeVisible();
});

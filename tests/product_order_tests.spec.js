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
  for (let i = 0; i < productsData.typeOfDrums.length; i++) {
    await expect(
      productCreation.drumTypeOptions(productsData.typeOfDrums[i].type),
      `${productsData.typeOfDrums[i].type} is visible`
    ).toBeVisible();
  }
  await productCreation.selectingDrum(productsData.typeOfDrums[0].type);
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumType),
    `${productsData.textInDrumType} is visible`
  ).toBeVisible();
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumHead),
    `${productsData.textInDrumHead} is visible`
  ).toBeVisible();
});

test("'TC-04' Verify that the selected drum 'Size' is highlighted and NEXT button is enabled", async ({
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
  await productCreation.selectingDrumType(productsData.typeOfDrums[0].type);
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumhead(productsData.typeOfDrumHeads[0].type);
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumSize),
    `verifying text ${productsData.textInDrumSize} is visible`
  ).toBeVisible;
  await productCreation.selectingDrumSize(productsData.typeOfDrumSize[0].type);
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumReason),
    `verifying text ${productsData.textInDrumReason} is visible`
  ).toBeVisible();
  await productCreation.clickingOnBackButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumSize),
    `verifying text ${productsData.textInDrumSize} is visible`
  ).toBeVisible;
});

test("'TC-05' Verify that the selected drum 'Size' is highlighted and NEXT button is enabled", async ({
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
  await productCreation.selectingDrumType(productsData.typeOfDrums[0].type);
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumhead(productsData.typeOfDrumHeads[0].type);
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumSize(productsData.typeOfDrumSize[0].type);
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumReason),
    `verifying text ${productsData.textInDrumReason} is visible`
  ).toBeVisible();
  await expect(
    productCreation.textInDrumHead(productsData.typeOfDrumReason[0].type),
    `verifying text ${productsData.textInDrumReason} is visible`
  ).toBeVisible();
  await productCreation.selectingDrumReason(
    productsData.typeOfDrumReason[0].type
  );
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumEnvironment),
    `verifying text ${productsData.textInDrumEnvironment} is visible`
  ).toBeVisible();
  await productCreation.clickingOnBackButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumReason),
    `verifying text ${productsData.textInDrumReason} is visible`
  ).toBeVisible;
});

test("'TC-06' Validate Enviroment values and forward /back button functionality", async ({
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
  await productCreation.selectingDrumType(productsData.typeOfDrums[0].type);
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumhead(productsData.typeOfDrumHeads[0].type);
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumSize(productsData.typeOfDrumSize[0].type);
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumReason(
    productsData.typeOfDrumReason[0].type
  );
  await productCreation.clickingOnNextButton();
  for (let i = 0; i < productsData.typeOfDrumEnvironmnet.length; i++) {
    await expect(
      productCreation.textInDrumHead(
        productsData.typeOfDrumEnvironmnet[i].type
      ),
      `${productsData.typeOfDrumEnvironmnet[i].type} is visible`
    ).toBeVisible();
  }
  await productCreation.clickingOnBackButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumReason),
    `${productsData.textInDrumReason} is visible`
  ).toBeVisible();
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumEnvrioment(
    productsData.typeOfDrumEnvironmnet[0].type
  );
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumGenre),
    `${productsData.textInDrumGenre} is visible`
  ).toBeVisible();
});

test("'TC-07' Validate Genre values and forward /back button functionality", async ({
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
  await productCreation.selectingDrumType(productsData.typeOfDrums[0].type);
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumhead(
    productsData.typeOfDrumHeads[0].type
  );
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumSize(
    productsData.typeOfDrumSize[0].type
  );
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumReason(
    productsData.typeOfDrumReason[0].type
  );
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumEnvrioment(
    productsData.typeOfDrumEnvironmnet[0].type
  );
  await productCreation.clickingOnNextButton();
  for (let i = 0; i < productsData.typeOfDrumGenre.length; i++) {
    await expect(
      productCreation.textInDrumHead(productsData.typeOfDrumGenre[i].type),
      `${productsData.typeOfDrumGenre[i].type} is visible`
    ).toBeVisible();
  }
  await productCreation.clickingOnBackButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumEnvironment),
    `${productsData.textInDrumEnvironment} is visible`
  ).toBeVisible();
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumGenre(
    productsData.typeOfDrumGenre[0].type
  );
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumSustain),
    `${productsData.textInDrumSustain} is visible`
  ).toBeVisible();
});

test.only("'TC-08' Validate Tone values and forward /back button functionality", async ({
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
  await productCreation.selectingDrumType(productsData.typeOfDrums[0].type);
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumhead(
    productsData.typeOfDrumHeads[0].type
  );
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumSize(
    productsData.typeOfDrumSize[0].type
  );
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumReason(
    productsData.typeOfDrumReason[0].type
  );
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumEnvrioment(
    productsData.typeOfDrumEnvironmnet[0].type
  );
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumGenre(
    productsData.typeOfDrumGenre[0].type
  );
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumSustain(
    productsData.sustainabilityScale[0].type
  );
  await productCreation.clickingOnNextButton();
  for (let i = 0; i < productsData.toneScale.length; i++) {
    await expect(
      productCreation.textInDrumHead(productsData.toneScale[i].type),
      `${productsData.toneScale[i].type} is visible`
    ).toBeVisible();
  }
  await productCreation.clickingOnBackButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumSustain),
    `${productsData.textInDrumSustain} is visible`
  ).toBeVisible();
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumTone(productsData.toneScale[0].type);
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.resultPagePopup[0].save),
    `${productsData.resultPagePopup[0].save} is visible`
  ).toBeVisible();
  await expect(
    productCreation.textInDrumHead(productsData.resultPagePopup[1].skip),
    `${productsData.resultPagePopup[1].skip} is visible`
  ).toBeVisible();
});

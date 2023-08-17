const { test, expect, chromium } = require('@playwright/test');
const { faker, th } = require('@faker-js/faker');
const Sections = require('../fixtures/pageIndex');
const { use } = require('../playwright.config');
require('dotenv').config();

test('TC-01, Validate view products functionality and checkout page functionality error message should display', async ({
  browser,
}) => {
  browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${use.baseURL}/`);
  const homepage = new Sections.Homepage(page, test);
  const testData = Sections.testData;
  const productsData = Sections.productsData;
  const resultData = Sections.resultPageData;
  // await homepage.navigateToHomepage(`${use.baseURL}/`);
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
  await page.locator('//i[@class="arrow-left"] ').click();

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
  await expect(page).toHaveURL(/drumhead-finder/);
  //!! types of drum
  const productCreation = new Sections.ProductCreation(page, test);
  for (let i = 0; i < productsData.typeOfDrums.length; i++) {
    await expect(
      productCreation.drumTypeOptions(productsData.typeOfDrums[i].type),
      `${productsData.typeOfDrums[i].type} is visible`
    ).toBeVisible();
  }
  await productCreation.selectingDrumType(productsData.typeOfDrums[0].type);
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumType),
    `${productsData.textInDrumType} is visible`
  ).toBeVisible();
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumHead),
    `${productsData.textInDrumHead} is visible`
  ).toBeVisible();
  await productCreation.clickingOnBackButton();
  await productCreation.selectingDrumType(productsData.typeOfDrums[0].type);
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumHead),
    `${productsData.textInDrumHead} is visible`
  ).toBeVisible();

  //!! types of drum head
  for (let i = 0; i < productsData.typeOfDrumHeads.length; i++) {
    await expect(
      productCreation.drumTypeOptions(productsData.typeOfDrumHeads[i].type),
      `${productsData.typeOfDrumHeads[i].type} is visible`
    ).toBeVisible();
  }
  await productCreation.selectingDrumhead(productsData.typeOfDrumHeads[0].type);
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumSize),
    `verifying text ${productsData.textInDrumSize} is visible`
  ).toBeVisible;
  await productCreation.clickingOnBackButton();
  await productCreation.selectingDrumhead(productsData.typeOfDrumHeads[0].type);
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumSize),
    `verifying text ${productsData.textInDrumSize} is visible`
  ).toBeVisible;

  //!! types of drum size
  for (let i = 0; i < productsData.typeOfDrumSize.length; i++) {
    await expect(
      productCreation.drumTypeOptions(productsData.typeOfDrumSize[i].type),
      `${productsData.typeOfDrumSize[i].type} is visible`
    ).toBeVisible();
  }
  await productCreation.selectingDrumSize(productsData.typeOfDrumSize[0].type);
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumReason),
    `verifying text ${productsData.textInDrumReason} is visible`
  ).toBeVisible();
  await productCreation.clickingOnBackButton();

  await productCreation.selectingDrumSize(productsData.typeOfDrumSize[0].type);
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumReason),
    `verifying text ${productsData.textInDrumReason} is visible`
  ).toBeVisible();

  //!! types of drum reason
  for (let i = 0; i < productsData.typeOfDrumReason.length; i++) {
    await expect(
      productCreation.drumTypeOptions(productsData.typeOfDrumReason[i].type),
      `${productsData.typeOfDrumReason[i].type} is visible`
    ).toBeVisible();
  }
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

  await productCreation.selectingDrumReason(
    productsData.typeOfDrumReason[0].type
  );
  await productCreation.clickingOnNextButton();

  //!! drum Enviroment
  for (let i = 0; i < productsData.typeOfDrumEnvironmnet.length; i++) {
    await expect(
      productCreation.textInDrumHead(
        productsData.typeOfDrumEnvironmnet[i].type
      ),
      `${productsData.typeOfDrumEnvironmnet[i].type} is visible`
    ).toBeVisible();
  }

  await productCreation.selectingDrumEnvrioment(
    productsData.typeOfDrumEnvironmnet[0].type
  );
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumGenre),
    `${productsData.textInDrumGenre} is visible`
  ).toBeVisible();
  await productCreation.clickingOnBackButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumEnvironment),
    `${productsData.textInDrumEnvironment} is visible`
  ).toBeVisible();
  await productCreation.selectingDrumEnvrioment(
    productsData.typeOfDrumEnvironmnet[0].type
  );
  await productCreation.clickingOnNextButton();

  //!!genre
  for (let i = 0; i < productsData.typeOfDrumGenre.length; i++) {
    await expect(
      productCreation.textInDrumHead(productsData.typeOfDrumGenre[i].type),
      `${productsData.typeOfDrumGenre[i].type} is visible`
    ).toBeVisible();
  }
  await productCreation.selectingDrumGenre(
    productsData.typeOfDrumGenre[0].type
  );
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumSustain),
    `${productsData.textInDrumSustain} is visible`
  ).toBeVisible();
  await productCreation.clickingOnBackButton();
  await expect(
    productCreation.textInDrumHead(productsData.textInDrumGenre),
    `${productsData.textInDrumGenre} is visible`
  ).toBeVisible();
  await productCreation.selectingDrumGenre(
    productsData.typeOfDrumGenre[0].type
  );
  await productCreation.clickingOnNextButton();

  await productCreation.selectingDrumSustain(
    productsData.sustainabilityScale[0].type
  );
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumTone(productsData.toneScale[0].type);
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.resultPagePopup[1].skip),
    `${productsData.resultPagePopup[1].skip} is visible`
  ).toBeVisible();
  await productCreation.selectingSkipResult(
    productsData.resultPagePopup[1].skip
  );
  const page1Promise = page.waitForEvent('popup');
  await productCreation.selectingViewProduct(productsData.viewProducts);
  const resultPageContent = await page1Promise;
  const resultPage = new Sections.ResultsPage(resultPageContent, test);
  const resultPageData = Sections.resultPageData;
  await resultPage.selectingAddToCart(resultPageData.addToCart);
  await resultPage.selectingGoToKart(resultPageData.goToCart);
  await resultPage.selectingProceedAsGuest();
  await page.waitForTimeout(3000);
  await resultPage.fillTheShippingDetails(faker);
  await resultPage.clickingOnPlaceOrderButton();
  await expect(
    resultPage.errorMeassageText,
    'validating error message is visible'
  ).toHaveText(resultData.paymentError);
});

test('TC-02, Validate view products functionality and checkout page functionality error message should not display', async ({
  browser,
}) => {
  browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${use.baseURL}/`);
  const homepage = new Sections.Homepage(page, test);
  const testData = Sections.testData;
  const productsData = Sections.productsData;
  await homepage.handleCokkies(testData.cokkies.accept);
  await homepage.selectingGetStarted(
    testData.slickSliderItems[0].drumhead[1].buttonName
  );
  await expect(page).toHaveURL(/drumhead-finder/);
  //!! types of drum
  const productCreation = new Sections.ProductCreation(page, test);
  await productCreation.selectingDrumType(productsData.typeOfDrums[0].type);
  await productCreation.clickingOnNextButton();
  //!! types of drum head
  await productCreation.selectingDrumhead(productsData.typeOfDrumHeads[0].type);
  await productCreation.clickingOnNextButton();
  //!! types of drum size
  await productCreation.selectingDrumSize(productsData.typeOfDrumSize[0].type);
  await productCreation.clickingOnNextButton();
  //!! types of drum reason
  await productCreation.selectingDrumReason(
    productsData.typeOfDrumReason[0].type
  );
  await productCreation.clickingOnNextButton();
  //!! drum Enviroment
  await productCreation.selectingDrumEnvrioment(
    productsData.typeOfDrumEnvironmnet[0].type
  );
  await productCreation.clickingOnNextButton();
  //!!genre
  await productCreation.selectingDrumGenre(
    productsData.typeOfDrumGenre[0].type
  );
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumSustain(
    productsData.sustainabilityScale[0].type
  );
  await productCreation.clickingOnNextButton();
  await productCreation.selectingDrumTone(productsData.toneScale[0].type);
  await productCreation.clickingOnNextButton();
  await expect(
    productCreation.textInDrumHead(productsData.resultPagePopup[1].skip),
    `${productsData.resultPagePopup[1].skip} is visible`
  ).toBeVisible();
  await productCreation.selectingSkipResult(
    productsData.resultPagePopup[1].skip
  );
  const page1Promise = page.waitForEvent('popup');
  await productCreation.selectingViewProduct(productsData.viewProducts);
  const resultPageContent = await page1Promise;
  const resultPage = new Sections.ResultsPage(resultPageContent, test);
  const resultPageData = Sections.resultPageData;
  await resultPage.selectingAddToCart(resultPageData.addToCart);
  await resultPage.selectingGoToKart(resultPageData.goToCart);
  await resultPage.selectingProceedAsGuest();
  await page.waitForTimeout(3000);
  await resultPage.fillTheShippingDetails(faker);
  await resultPage.clickingOnPlaceOrderButton();
  await expect(
    resultPage.errorMeassageText,
    'validating error message is visible'
  ).not.toHaveText(resultData.paymentError);
});

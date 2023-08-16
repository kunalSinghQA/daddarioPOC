const { test, expect } = require("@playwright/test");
const Sections = require("../fixtures/pageIndex");
const testData = require("../fixtures/data/homepage.json");
const { use } = require("../playwright.config");
require("dotenv").config();

test("Validate products are visible", async ({ page }) => {
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

test.only("Validate get started button is visible and navigation is correct", async ({
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
  
});

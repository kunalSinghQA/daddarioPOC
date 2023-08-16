const { test, expect } = require("@playwright/test");
const Sections = require("../fixtures/pageIndex");
const testData = require("../fixtures/data/homepage.json");
const { use } = require("../playwright.config");
require("dotenv").config();

test("Validate cokkies", async ({ page }) => {
  const homepage = new Sections.Homepage(page, test);
  await homepage.navigateToHomepage(use.baseURL)
  await expect(
    homepage.acceptOrDeclineCokkies(testData.cokkies.accept),
    `Verifying ${testData.cokkies.accept} button should be visible`
  ).toBeVisible();
  await expect(
    homepage.acceptOrDeclineCokkies(testData.cokkies.decline),
    `Verifying ${testData.cokkies.decline} button should be visible`
  ).toBeVisible();
  await homepage.handleCokkies(testData.cokkies.accept);
});
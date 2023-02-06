import { Page, Locator } from '@playwright/test';


export class Home {
  readonly btnStart: Locator;
  readonly btnStartHeader: Locator;
  readonly imgCloseChooseAccountLogin: Locator;
  page: Page;


  constructor(page: Page) {
    this.btnStart = page.locator(`//button[text()='Login']`);
    this.btnStartHeader = page.locator('//h1[text()=\'OWN. RACE. EARN.\']/following-sibling::button');
    this.imgCloseChooseAccountLogin = page.locator('(//img[@class=\'close-icon\'])[2]');
  }

  delay = async (ms: number | undefined) => await new Promise(resolve => setTimeout(resolve, ms))

  imgLogo = async () => await this.page.waitForSelector('.logo-img');

  async startWithMetamask() {
    await this.btnStart.waitFor();
    await this.btnStart.click();
  }

  async clickOnStartButton() {
    await this.btnStart.waitFor();
    return await this.btnStart.click();
  }

}

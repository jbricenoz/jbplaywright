import { Locator, Page } from '@playwright/test';

class HomePage {

    readonly page: Page;
    readonly lnkDocs: Locator;
    readonly lnkUpgrade: Locator;
    readonly lnkNewPurchaseItem: Locator;
    readonly lblLoadingMessage: Locator;
    readonly lblLoadingMessage2: Locator;
    readonly lnkRecipeTableOptions: (recipeName?: string) => any;
    readonly lnkRecipeBooksTableOptions: (recipeBookName?: string) => any;
    readonly ckbRecipeTableByName: (recipeName?: string) => any;
    

    constructor(page: Page) {
        this.page = page;
        // Examples 
        // this.colour = page.locator('span[role=button]', {hasText: 'COLOUR'}).first();
        // this.colourSearch = page.locator(`(//input[@placeholder='Search'])[3]`);
        // this.colorSelect  = (color: string) => page.locator(`//label[text()='${color}']`);
        // this.btnCloseFilterPanel = page.locator('div[class="flex"]').locator('button').locator('img');
        // this.ClearAllFiltersLink = page.locator(`div[class="flex"]`).locator(`button`).locator(`div`);
        // this.horseList = (id?: number) => id ? page.locator(`button.panel__label .label-content:nth-child(${id})`) : page.locator('button.panel__label .label-content');
        // this.lstHorses: (id?: number) => id ? `.panel:nth-child(${id})` : '.panel';
        // this.horseList: (id?: number) => id ? `button.panel__label .label-content:nth-child(${id})` : 'button.panel__label .label-content';

        this.lnkUpgrade = page.locator('//*[@data-cy="chip_doc_purchased_item_teaser"]');
        this.lnkDocs = page.locator('//*[@data-cy="chip_label_doc"]');
        this.lnkNewPurchaseItem = page.locator('//*[@data-cy="chip_label_purchased_item"]');
        this.lblLoadingMessage = page.locator('text=Your sample data is loading. Please check again shortly');
        this.lblLoadingMessage2 = page.locator('text=One sec... we\'re loading some sample recipes for you. They will be ready momentarily (you may need to refresh)');
        this.lnkRecipeTableOptions = (recipeName?: string) => recipeName ? page.locator(`//*[@data-cy="BodyItemBase_link_entity_detail"]/p[text()="${recipeName}"]/../../div/div/button`) : page.locator('//*[@data-cy="BodyItemBase_link_column_data"]/../div/div/button');
        this.lnkRecipeBooksTableOptions = (recipeBookName?: string) => recipeBookName ? page.locator(`//*[@data-cy="BodyItemBase_link_entity_detail"]/p[text()="${recipeBookName}"]/../../div/div/button`) : page.locator('//*[@data-cy="BodyItemBase_link_column_data"]/../div/div/button');
     
    }

    isLoading = async () => {
        let isElementVisible = false;
        let retries = 0;
        do {
            await this.page.reload();
            isElementVisible = await this.lblLoadingMessage.isVisible();
            console.log("Inside:" + retries + isElementVisible);
            retries++;
        } while (isElementVisible == false && retries == 10)
        return isElementVisible;
    }


    delay = async (ms: number | undefined) => await new Promise(resolve => setTimeout(resolve, ms))

    reloading = async () => {
        await this.page.waitForTimeout(3000);
        await this.page.reload();
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(3000);
    }

    async selectDocs(docName: string) {
        return docName;
    }

    async filterBy(filterName: string) {
        return filterName;
    }

    async getPageTitle() {
        return await "here";
    }

}
export default HomePage;
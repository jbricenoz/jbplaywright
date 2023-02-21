import { Locator, Page } from '@playwright/test';

class ProductsPage {

    readonly page: Page;
    readonly inventoryItems: Locator; 
    readonly inventoryItemsName: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.inventoryItemsName = page.locator('(//*[@class="inventory_item_description"])//*[@class="inventory_item_name"]');
        this.inventoryItems = page.locator('(//*[@id="inventory_container"])//div[@class="inventory_item"]')
    }



    delay = async (ms: number | undefined) => await new Promise(resolve => setTimeout(resolve, ms))

    reloading = async () => {
        await this.page.waitForTimeout(3000);
        await this.page.reload();
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(3000);
    }

    getItemsNameList = async () => {
        await this.page.waitForTimeout(500);
        const values = await this.inventoryItemsName.evaluateAll(list => list.map(element => element.textContent));
        return values;
    }

    getTotalOfInventoryItems = async () => {
        await this.page.waitForTimeout(500);
        const inventoryItems = this.inventoryItems.allTextContents();
        return (await inventoryItems).length;
    }



   
}
export default ProductsPage;
import { Locator, Page, request } from '@playwright/test';
import { nanoid } from 'nanoid'
import { _api } from '../fixtures/api.data';

class API {

    readonly page: Page;
    readonly lknTryNow: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lknTryNow = page.locator('text=Try Now for free');
    }

    get = async (token:string, path:any) => {
        const context = await request.newContext({
            baseURL: _api.host,
            extraHTTPHeaders: _api.headers(token)
        });
        let data = await context.get(path);
        return await data.json();
    }

    post = async (token:string, body:any, path:any) => {
        const context = await request.newContext({
            baseURL: _api.host,
            extraHTTPHeaders: _api.headers(token)
        });
        let key = await context.post(path, {
            data: body
        });
        let values = await key.json();
        return values;
    }

    delete = async (token:string, id:any, path:any) => {
        const context = await request.newContext({
            baseURL: _api.host,
            extraHTTPHeaders: _api.headers(token)
        });
        let key = await context.delete(path, {
            data: id
        });
        let values = await key.json();
        return values;
    }

    put = async (token:string, body:any, id:any, path:any) => {
        const context = await request.newContext({
            baseURL: _api.host,
            extraHTTPHeaders: _api.headers(token)
        });
        let key = await context.put(path, {
            data: body
        });
        let values = await key.json();
        return values;
    }

    getUserInfoWithCurrentBrowserContext = async () => {
        const localStorage = await this.page.evaluate(() => window.localStorage);
        var jsonArray = JSON.parse(localStorage.tokens);
        const context = await request.newContext({
            baseURL: _api.host,
            extraHTTPHeaders: _api.headers(jsonArray[0].token)
        });
        let data = await context.get(_api.users.me);
        return await data.json();
    }

    getUserDetailsWithAuth = async ({ username, password }) => {
        const context = await request.newContext({
            baseURL: _api.host,
            extraHTTPHeaders: _api.headers()
        });

        let key = await context.post(_api.auth.token, {
            data: {
                username: username,
                password: password
            }
        });
        let values = await key.json();

        let data = await context.get(_api.users.me, {
            headers: _api.headers(values.token) 
            // {
            //     'Accept': 'application/json, text/plain, */*',
            //     'Authorization': `Token ${values.token}`,
            // }
        });
        return await data.json();
    }

}
export default API;
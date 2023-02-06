import { Page } from '@playwright/test';
import { nanoid } from 'nanoid';

class Util {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getRandomUUID = async (length: any) => {
        return nanoid(length).toLowerCase().toString();
    }

    getRandomName = async (amount: any, baseName: any) => {
        return Array(amount).fill(0).map(() => `${baseName}_${this.getRandomInt(10000000)}`);
    }

    getRandomStr = async (length: any, characters: any) => {
        let ans = '';
        for (let i = length; i > 0; i--) {
            ans += characters[Math.floor(Math.random() * characters.length)];
        }
        return ans;
    }

    getRandomInt = async (length: any) => {
        return Math.floor(Math.random() * Math.floor(length));
    }

    capitalizeFirstLetter = (uncapitalizedSentence: string) : string => {
        let capitalizedSentence: any[];
        capitalizedSentence = uncapitalizedSentence.split(' ');
        capitalizedSentence = capitalizedSentence.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        return capitalizedSentence.join(' ');
    }

}
export default Util;
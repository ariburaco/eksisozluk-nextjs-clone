import axios, { AxiosRequestConfig } from "axios";
import { JSDOM } from "jsdom";

export async function checkPageNumber(reqLink: string) {
    const configEntries: AxiosRequestConfig = {
        method: 'get',
        url: `https://eksisozluk.com/${reqLink}?p=1`,
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        }
    };
    let data: string = "NULL";

    await axios(configEntries)
        .then(function (responsee) {
            data = responsee.data
        })
        .catch(function (error) {
            return 1;
        });

    let totalPages = "1";
    try {
        const doc = new JSDOM(data).window.document.body;
        const pager = doc.querySelector('#topic > div.clearfix.sub-title-container > div.pager');
        if (pager) {
            totalPages = pager.getAttribute('data-pagecount')!;
        }
    } catch (error) {
        return 1;
    }

    return parseInt(totalPages);

}

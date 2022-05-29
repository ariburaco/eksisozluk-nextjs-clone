// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosRequestConfig } from 'axios';
import { JSDOM } from 'jsdom';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Topic } from '../../@types';

type ErrorResult = {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Topic[] | ErrorResult>
) {
    const gundemUrl = 'https://eksisozluk.com/basliklar/gundem';


    const configGundem: AxiosRequestConfig = {
        method: 'get',
        url: gundemUrl,
        headers: {
            // "Access-Control-Allow-Origin": "*",
            // 'Access-Control-Allow-Credentials': 'true',
            'accept': '*/*',
            'x-requested-with': 'XMLHttpRequest'
        }
    };

    let topics: Topic[] = [];
    let data: string = "NULL";


    try {
        await axios(configGundem)
            .then(function (responsee) {
                data = responsee.data

            });
    } catch (error) {
        return res.status(404).json({ error: "Page not found" });
    }


    const doc = new JSDOM(data).window.document.body;

    // get all entries
    const list = doc.querySelectorAll('.topic-list > li');

    for (let i = 0; i < list.length; i++) {

        const entry = list[i];
        const titleHtml = entry.getElementsByTagName('a')[0];

        const link = entry.getElementsByTagName('a')[0].getAttribute('href');
        const count = entry.getElementsByTagName('small');
        let countOfEntries: number = 1;
        let title = "";

        if (count && count.length > 0) {
            if (count[0].textContent) {
                countOfEntries = parseInt(count[0].textContent);
            }
        }


        if (titleHtml.hasChildNodes()) {
            if (titleHtml.lastChild?.nodeName === 'SMALL') {
                titleHtml.removeChild(titleHtml.lastChild);
            }
        }

        if (titleHtml.textContent && link) {
            title = titleHtml.textContent?.trim();

            topics.push({ title: title, link: link, entryCount: countOfEntries });
        }
    }

    return res.status(200).json(topics)

}



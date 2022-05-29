// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosRequestConfig } from 'axios';
import { JSDOM } from 'jsdom';
import type { NextApiRequest, NextApiResponse } from 'next'

import { EntriesResult, Entry, Topic } from '../../../@types';


type ErrorResult = {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<EntriesResult | ErrorResult>
) {

    const entry = req.query.entry;
    let entriesWithContent: Entry[] = [];

    const configEntries: AxiosRequestConfig = {
        method: 'get',
        url: `https://eksisozluk.com/entry/${entry}`,
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        }
    };
    let data: string = "NULL";
   
    try {
        await axios(configEntries)
            .then(function (responsee) {
                data = responsee.data

            });
    } catch (error) {
        return res.status(404).json({ error: "Page not found" });
    }

    try {
        if (data === "NULL") {
            return res.status(404).json({ error: "Page not found" });
        }

        const doc = new JSDOM(data).window.document.body;

        const entries = doc.querySelectorAll('#entry-item-list > li');

        let pager, currentPage, totalPages;
        let pageCount = 1, currentPageNumber = 1;

        try {
            pager = doc.querySelector('#topic > div.clearfix.sub-title-container > div.pager');
            currentPage = pager!.getAttribute('data-currentpage');
            totalPages = pager!.getAttribute('data-pagecount');
            pageCount = parseInt(totalPages!);
            currentPageNumber = parseInt(currentPage!);

        } catch (error) {

            // res.status(200).json({ error: "Page not found" });
            // return;
        }

        const title = doc.querySelector('#title')!.getAttribute('data-title');
        const entryId = doc.querySelector('#title')!.getAttribute('data-id');
        const link = doc.querySelector('#title > a')!.getAttribute('href');

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            const content = entry.querySelector('div.content')!.innerHTML;
            const author = entry.querySelector('#entry-author > a')!.textContent!.trim();
            const authotId = entry.getAttribute('data-author-id');
            const authorLink = entry.querySelector('#entry-author > a')!.getAttribute('href');
            const authorAvatarLink = entry.querySelector('footer > div.info > div > div.avatar-container > a > img')!.getAttribute('src');
            const date = entry.querySelector('footer > div.info > div > div.footer-info > div:nth-child(2) > a')!.textContent!.trim();
            const favoriteCount = parseInt(entry.getAttribute('data-favorite-count')!);

            let avatarLink = authorAvatarLink;
            if (authorAvatarLink!.startsWith('//')) {
                avatarLink = `https:${authorAvatarLink}`;
            }

            entriesWithContent.push({
                id: entryId!,
                topic: { title: title!, link: link! },
                content: content.replace('?q=', 'topics/'),
                author: {
                    authorId: authotId!,
                    authorName: author,
                    authorLink: authorLink!,
                    authorAvatarLink: avatarLink!
                },
                date: date,
                favoriteCount: favoriteCount
            });
        }

        const result: EntriesResult = {
            pages: pageCount,
            currentPage: currentPageNumber,
            pageLimit: entriesWithContent.length,
            entries: entriesWithContent
        }

        return res.status(200).json(result);

    } catch (error) {
        const result: EntriesResult = {
            pages: 1,
            currentPage: 1,
            pageLimit: entriesWithContent.length,
            entries: entriesWithContent
        }
        return res.status(200).json(result);

    }
}



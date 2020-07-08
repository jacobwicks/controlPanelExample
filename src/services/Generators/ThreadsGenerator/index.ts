import * as cheerio from 'cheerio';
import { FrontEndThread } from '../../../types/types';

const getRandomInt = (min = 1, max = 100) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    max < min && (max = min + 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const proxyurl = 'https://cors-anywhere.herokuapp.com/';

const threadsGenerator = async () => {
    const baseUrl = 'https://forums.somethingawful.com';

    const url =
        'https://forums.somethingawful.com/forumdisplay.php?forumid=273&daysprune=1000&perpage=40&posticon=0&sortorder=desc&sortfield=lastpost&pagenumber=2';
    const response = await fetch(proxyurl + url);

    const text = await response.text();

    const $ = cheerio.load(text);

    let threads = $('.thread')
        .map((i: number, thread: CheerioElement) => {
            const titleElement = $(thread).find('.thread_title');
            const title = $(titleElement).text();

            const link = `${baseUrl}/${$(titleElement).attr('href')}`;

            const threadId = Number(titleElement.attr('href')?.split('=')[1]);

            //sometimes announcements or ads are put in the bookmark list
            //these aren't threads, don't have a threadId
            //so don't put them in the thread array!
            if (isNaN(threadId)) return;

            const pageNumbers = $(thread).find('.pagenumber');
            const pages = Number(
                $(pageNumbers[pageNumbers.length - 1])
                    .text()
                    .toLowerCase() === 'last post'
                    ? $(pageNumbers[pageNumbers.length - 2]).text()
                    : $(pageNumbers[pageNumbers.length - 1]).text()
            );

            const unreadPages = getRandomInt(0, 3);

            const unreadPosts = unreadPages
                ? (unreadPages - 1) * 40 + getRandomInt(0, 40)
                : getRandomInt(0, 40);

            return {
                bookmarked: true,
                link,
                title,
                threadId,
                pages: pages ? pages : 1,
                unreadPosts,
            } as FrontEndThread;
        })
        .toArray();

    const returnThreads: FrontEndThread[] = [];

    const numberOfThreads = getRandomInt(2, 5);

    for (let i = 0; i < numberOfThreads; i++) {
        const thread = threads.splice(getRandomInt(0, threads.length), 1)[0];
        //@ts-ignore
        returnThreads.push(thread as FrontEndThread);
    }

    console.log(returnThreads);
    return returnThreads;
};

export default threadsGenerator;

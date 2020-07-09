import {
    FrontEndThread,
    ThreadsAction,
    ThreadsActionTypes,
} from '../../../../types/types';
import { authFetchJSON } from '../AuthFetch';
import unbookmarkThread from './UnbookmarkThread';
import bookmarkThread from './BookmarkThread';
import markLastRead from './MarkLastRead';

const getRandomInt = (min = 1, max = 100) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    max < min && (max = min + 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

interface ThreadsResponse {
    threads: FrontEndThread[];
}

type TR = ThreadsResponse | undefined;

//gets the imgur albums for the bot from the API
const getThreads = async () => {
    const route = 'threads';
    const response = (await authFetchJSON(route)) as TR;
    const threads = response?.threads;

    return threads;
};

//loads albums into the albumsContext
const loadThreads = async ({
    dispatch,
    threads,
}: {
    dispatch: React.Dispatch<ThreadsAction>;
    threads: FrontEndThread[];
}) => {
    const newThreads = threads.map((thread) => ({
        ...thread,
        unreadPosts: thread.unreadPosts + getRandomInt(0, 15),
    }));
    dispatch({
        type: ThreadsActionTypes.setThreads,
        threads: newThreads,
    });
};

export { bookmarkThread, loadThreads, markLastRead, unbookmarkThread };

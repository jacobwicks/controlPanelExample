import {
    FrontEndThread,
    EventsActionTypes,
    EventsAction,
    DisplayAction,
} from '../../../types/types';
import userGenerator, { generateUsers } from '../UserGenerator';

export const getRandomInt = (min = 1, max = 100) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    max < min && (max = min + 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getDelay = (longer?: boolean) =>
    longer ? 750 + getRandomInt(0, 500) : 450 + getRandomInt(0, 300);

const delayedDispatch = async ({
    array,
    dispatch,
}: {
    array: any[];
    dispatch: React.Dispatch<EventsAction>;
}) => {
    for await (const el of array) {
        dispatch({
            type: EventsActionTypes.addEvent,
            event: makeEvent(el),
        });
        await new Promise((resolve) => setTimeout(() => resolve(), 450));
    }
};

const addEvent = async (
    data: any,
    dispatch: React.Dispatch<EventsAction>,
    longer?: boolean
) => {
    dispatch({
        type: EventsActionTypes.addEvent,
        event: makeEvent(data),
    });
    await new Promise((resolve) =>
        setTimeout(() => resolve(), getDelay(longer))
    );
};

export const makeEvent = (data: string | object, text?: string) =>
    // prettier-ignore
    typeof data === 'string'
        ? { text: data, time: Date() }
        : text
            ? { data, text, time: Date() }
            : { data, time: Date() };

const preRun = [
    'Bot running once...',
    { setting: { running: true } },
    'bot has logged in',
    'getting threads...',
];

const postRun = [
    'bot has gotten posts and handled the posts',
    'bot finished, logging out',
    { setting: { running: false } },
];

const generateInstructionsForThread = async ({
    actions,
    botName,
    dispatch,
    thread,
}: {
    actions: { [key: string]: DisplayAction };
    botName: string;
    dispatch: React.Dispatch<EventsAction>;
    thread: FrontEndThread;
}) => {
    const { unreadPosts } = thread;

    const numberOfInstructions = unreadPosts
        ? getRandomInt(0, unreadPosts > 3 ? 3 : unreadPosts)
        : 0;

    if (numberOfInstructions === 0) {
        addEvent(
            `${thread.title} has no instructions. id: ${thread.threadId}`,
            dispatch
        );
        return;
    }

    const activeActions = Object.entries(actions)
        .map(([key, action]) => action)
        .filter(({ active }) => active);

    const users = await generateUsers();

    const randomUser = () => users[getRandomInt(0, users.length - 1)];

    const text = `There ${
        numberOfInstructions !== 1 ? 'are' : 'is'
    } ${numberOfInstructions} instruction${
        numberOfInstructions !== 1 ? 's' : ''
    } in ${thread.title}, id: ${thread.threadId}`;

    const instructions = [];

    for (let i = 0; i < numberOfInstructions; i++) {
        const actionIndex = getRandomInt(0, activeActions.length - 1);

        const thisAction = activeActions[actionIndex];

        const trigger =
            thisAction.triggers.filter(
                (trigger) => typeof trigger === 'string'
            )?.[0] || 'do something';

        const instruction = {
            author: randomUser(),
            body: `${botName}, ${trigger}`,
            date: Date(),
            id: getRandomInt(10000, 500000),
            images: [],
            link: 'https://forums.somethingawful.com/',
            instruction: trigger,
        };

        instructions.push(instruction);
    }

    await addEvent({ text, instructions }, dispatch);

    for await (const instruction of instructions) {
        await Promise.all([
            addEvent(`executing ${instruction.instruction}...`, dispatch, true),
            addEvent(
                {
                    post: {
                        author: {
                            avatar:
                                'https://fi.somethingawful.com/safs/titles/58/73/00226364.0001.jpg',
                            id: 226364,
                            name: botName,
                            profile:
                                'https://forums.somethingawful.com/member.php?action=getinfo&userid=226364',
                            regDate: 'Apr 24, 2020',
                            title: '',
                        },
                        body: `example post for ${instruction.instruction} \n________________________________\nHack the planet!!`,
                        date: Date(),
                        id: getRandomInt(10000, 500000),
                        images: [],
                        link: `https://forums.somethingawful.com/showthread.php?threadid=${thread.threadId}`,
                    },
                },
                dispatch,
                true
            ),
        ]);
    }
};

export const simulateRunForAllThreads = async ({
    actions,
    botName,
    dispatch,
    threads,
}: {
    actions: { [key: string]: DisplayAction };
    botName: string;
    dispatch: React.Dispatch<EventsAction>;
    threads: FrontEndThread[];
}) => {
    await delayedDispatch({ array: preRun, dispatch });

    await addEvent(
        {
            text: `bot found ${threads.length} threads`,
            threads,
        },
        dispatch
    );

    await addEvent('getting posts...', dispatch);

    const scanningEvents = threads.reduce(
        (acc, { title, threadId, unreadPosts }) => {
            acc.push(`Scanning ${title}, threadId ${threadId}...`);
            acc.push(
                `there are ${unreadPosts} new posts in the ${title} thread`
            );
            return acc;
        },
        <string[]>[]
    );

    await delayedDispatch({ array: scanningEvents, dispatch });

    for await (const thread of threads) {
        if (thread.unreadPosts) {
            await generateInstructionsForThread({
                actions,
                botName,
                dispatch,
                thread,
            });
        }
    }

    //set unread posts
    //turn bot off
    await delayedDispatch({ array: postRun, dispatch });
};

export const simulateRunForThread = async ({
    actions,
    botName,
    dispatch,
    thread,
}: {
    actions: { [key: string]: DisplayAction };
    botName: string;
    dispatch: React.Dispatch<EventsAction>;
    thread: FrontEndThread;
}) => {
    const preRunSingle = [
        'Bot running once...',
        { setting: { running: true } },
        'bot has logged in',
    ];

    await delayedDispatch({ array: preRunSingle, dispatch });

    await addEvent('getting posts...', dispatch);

    const { title, threadId, unreadPosts } = thread;
    await addEvent(
        `Scanning ${title}, threadId ${threadId}...`,
        dispatch,
        true
    );
    await addEvent(
        `there are ${unreadPosts} new posts in the ${title} thread`,
        dispatch,
        true
    );

    if (unreadPosts) {
        await generateInstructionsForThread({
            actions,
            botName,
            dispatch,
            thread,
        });
    }

    await delayedDispatch({ array: postRun, dispatch });
};

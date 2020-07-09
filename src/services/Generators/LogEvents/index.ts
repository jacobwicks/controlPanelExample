import {
    FrontEndThread,
    EventsActionTypes,
    EventsAction,
    DisplayAction,
} from '../../../types/types';

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

const preRun1 = [
    {
        text: 'Bot running once...',
        time: 'Wed Jul 08 2020 17:05:53 GMT-0700 (Pacific Daylight Time)',
    },
    {
        data: { setting: { running: true } },
        time: 'Wed Jul 08 2020 17:05:53 GMT-0700 (Pacific Daylight Time)',
    },
    {
        text: 'bot has logged in',
        time: 'Wed Jul 08 2020 17:05:53 GMT-0700 (Pacific Daylight Time)',
    },
    {
        text: 'getting threads...',
        time: 'Wed Jul 08 2020 17:05:53 GMT-0700 (Pacific Daylight Time)',
    },
];

// dispatch({
//     type: EventsActionTypes.addEvent,
//     event: {
//         time: Date(),
//         data: {
//             text: threadText,
//             threads,
//         },
//     },
// });

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

const addEvent = async (data: any, dispatch: React.Dispatch<EventsAction>) => {
    dispatch({
        type: EventsActionTypes.addEvent,
        event: makeEvent(data),
    });
    await new Promise((resolve) => setTimeout(() => resolve(), 450));
};

export const simulateRunForAllThreads = async ({
    actions,
    dispatch,
    threads,
}: {
    actions: { [key: string]: DisplayAction };
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
};

export const simulateRunForThread = async () => {};

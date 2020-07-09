import React, { useContext, useEffect } from 'react';
import { Tab, Message } from 'semantic-ui-react';
import Actions from '../Actions';
import Albums from '../Albums';
import APIs from '../APIs';
import Credentials from '../Credentials';
import Settings from '../Settings';
import Threads from '../Threads';
import { listenToEvents } from '../../services/Api';
import { EventsContext } from '../../services/EventsContext';
import { BotContext } from '../../services/BotContext';
import { ThreadsContext } from '../../services/ThreadsContext';
import { EventsActionTypes, FrontEndBotSettings } from '../../types/types';
import { makeEvent } from '../../services/Generators/LogEvents';
import { InstructionsContext } from '../../services/InstructionsContext';

// edit the config.json file that the bot accesses
// input api keys and secrets to config.json file
// Change the bot name
// change the sa userName and password stored in the bot config
// turn responses (keyword and action pairs) on and off
// view logs, including date picker
// view stats
// review images submitted to albums, accept or reject them
// ignore users
// set email addres for error alerts/crashes
// real time viewer- scrolling window of executed instructions, posts made, and errors
// Start and STop button
// Interval timer
// Countdouwn until next time the bot runs
// List of current threads viewed

const tabs = [
    {
        menuItem: 'Controls',
        render: () => (
            <Tab.Pane>
                <Settings />
            </Tab.Pane>
        ),
    },
    {
        menuItem: 'Threads',
        render: () => (
            <Tab.Pane>
                <Threads />
            </Tab.Pane>
        ),
    },
    {
        menuItem: 'Credentials',
        render: () => (
            <Tab.Pane>
                <Credentials />
            </Tab.Pane>
        ),
    },
    {
        menuItem: 'Actions',
        render: () => (
            <Tab.Pane>
                <Actions />
            </Tab.Pane>
        ),
    },
    {
        menuItem: 'Image Albums',
        render: () => (
            <Tab.Pane>
                <Albums />
            </Tab.Pane>
        ),
    },
    {
        menuItem: 'APIs',
        render: () => (
            <Tab.Pane>
                <APIs />
            </Tab.Pane>
        ),
    },
];

const ControlPanel = () => {
    const { dispatch, listening } = useContext(EventsContext);
    const { threads } = useContext(ThreadsContext);
    const { settings } = useContext(BotContext);
    const { interval, on, running } = settings as FrontEndBotSettings;

    useEffect(() => {
        if (!listening) {
            dispatch({
                type: EventsActionTypes.setListening,
                listening: true,
            });
            dispatch({
                type: EventsActionTypes.addEvent,
                event: makeEvent('api started'),
            });
            dispatch({
                type: EventsActionTypes.addEvent,
                event: {
                    time: Date(),
                    data: { setting: { interval } },
                },
            });
            dispatch({
                type: EventsActionTypes.addEvent,
                event: { time: Date(), data: { setting: { on } } },
            });
            dispatch({
                type: EventsActionTypes.addEvent,
                event: { time: Date(), data: { setting: { running } } },
            });
        }
    }, [listening, dispatch, interval, on, running]);

    useEffect(() => {
        if (!!threads && !!threads.length) {
            const threadText = threads
                ? `Watching ${threads.length} thread${
                      threads.length === 1 ? '' : 's'
                  }`
                : 'Not Watching any threads';

            dispatch({
                type: EventsActionTypes.addEvent,
                event: {
                    time: Date(),
                    data: {
                        text: threadText,
                        threads,
                    },
                },
            });
        }
    }, [dispatch, threads]);

    return (
        <>
            <Message>
                Welcome to the control panel. This example pulls some
                information from the forums but isn't actually hooked up to an
                instance of the bot. <br />
                Most of the controls will work. <br />
                Try clicking the 'run once' button to see how it looks when the
                bot runs and responds to posts.
            </Message>
            <Tab panes={tabs} />
        </>
    );
};

export default ControlPanel;

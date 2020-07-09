import React, { useContext } from 'react';
import { BotContext } from '../../../../services/BotContext';
import { Button, Icon } from 'semantic-ui-react';
import { startBot, stopBot, runOnce } from '../../../../services/Api';
import { simulateRunForAllThreads } from '../../../../services/Generators/LogEvents';
import { ThreadsContext } from '../../../../services/ThreadsContext';
import { EventsContext } from '../../../../services/EventsContext';
import { ActionsContext } from '../../../../services/ActionsContext';
import { BotActionTypes } from '../../../../types/Bot';

const ControlButtons = () => {
    const { dispatch, settings } = useContext(BotContext);
    const { dispatch: eventsDispatch } = useContext(EventsContext);
    const { actions } = useContext(ActionsContext);
    const { threads } = useContext(ThreadsContext);
    const on = !!settings?.on;
    const running = !!settings?.running;
    const botName = settings?.botName || '';

    const doRunOnce = async () => {
        runOnce(dispatch);
        await simulateRunForAllThreads({
            actions,
            botName,
            dispatch: eventsDispatch,
            threads: threads || [],
        });

        dispatch({
            type: BotActionTypes.setRunning,
            running: false,
        });
    };
    return (
        <div>
            <Button onClick={() => !on && startBot(dispatch)} color="green">
                <Icon name="play" size="large" />
                Start
            </Button>
            <Button
                onClick={() =>
                    (on || running) &&
                    stopBot({
                        dispatch,
                        on,
                        running,
                    })
                }
                color="red"
            >
                <Icon name="stop" size="large" />
                Stop
            </Button>
            <Button
                color="blue"
                onClick={() => {
                    if (!running) {
                        doRunOnce();
                    }
                }}
            >
                <Icon name="play circle" size="large" />
                Run Once
            </Button>
        </div>
    );
};

export default ControlButtons;

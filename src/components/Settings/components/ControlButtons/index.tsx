import React, { useContext } from 'react';
import { BotContext } from '../../../../services/BotContext';
import { Button, Icon } from 'semantic-ui-react';
import { startBot, stopBot, runOnce } from '../../../../services/Api';
import { simulateRunForAllThreads } from '../../../../services/Generators/LogEvents';
import { ThreadsContext } from '../../../../services/ThreadsContext';
import { EventsContext } from '../../../../services/EventsContext';
import { ActionsContext } from '../../../../services/ActionsContext';

const ControlButtons = () => {
    const { dispatch, settings } = useContext(BotContext);
    const { dispatch: eventsDispatch } = useContext(EventsContext);
    const { actions } = useContext(ActionsContext);
    const { threads } = useContext(ThreadsContext);
    const on = !!settings?.on;
    const running = !!settings?.running;

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
                        runOnce(dispatch);
                        simulateRunForAllThreads({
                            actions,
                            dispatch: eventsDispatch,
                            threads: threads || [],
                        });
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

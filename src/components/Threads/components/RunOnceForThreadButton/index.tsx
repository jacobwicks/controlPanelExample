import React, { useContext, useState } from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { BotContext } from '../../../../services/BotContext';
import { runOnceForThread, runOnce } from '../../../../services/Api';
import RotatingCog from '../../../RotatingCog';
import LogViewer from '../../../LogViewer';
import { simulateRunForThread } from '../../../../services/Generators/LogEvents';
import { ActionsContext } from '../../../../services/ActionsContext';
import { EventsContext } from '../../../../services/EventsContext';
import { ThreadsContext } from '../../../../services/ThreadsContext';
import { BotActionTypes } from '../../../../types/Bot';

const RunOnceForThreadButton = ({ threadId }: { threadId: number }) => {
    const [open, setOpen] = useState(false);
    const { dispatch, settings } = useContext(BotContext);
    const { dispatch: eventsDispatch } = useContext(EventsContext);
    const { threads } = useContext(ThreadsContext);
    const running = !!settings?.running;
    const { actions } = useContext(ActionsContext);
    const botName = settings?.botName || '';

    const thread = threads?.find((t) => t.threadId === threadId);

    const doRunOnce = async () => {
        if (thread) {
            runOnce(dispatch);
            await simulateRunForThread({
                actions,
                botName,
                dispatch: eventsDispatch,
                thread,
            });

            dispatch({
                type: BotActionTypes.setRunning,
                running: false,
            });
        }
    };

    return (
        <>
            <Button
                color="blue"
                onClick={() => {
                    setOpen(true);
                    !running && doRunOnce();
                }}
            >
                {running ? (
                    <RotatingCog size="large" />
                ) : (
                    <Icon name="play circle" size="large" />
                )}
                {running ? 'Running' : 'Run Once For This Thread'}
            </Button>
            {open && (
                <Segment>
                    <Button
                        floated="right"
                        icon="close"
                        onClick={() => setOpen(false)}
                    />
                    <LogViewer lines={6} />
                </Segment>
            )}
        </>
    );
};

export default RunOnceForThreadButton;

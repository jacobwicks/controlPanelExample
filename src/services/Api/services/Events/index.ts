import { apiUrl } from '../..';
import {
    BotAction,
    EventsAction,
    EventsActionTypes,
    LogEvent,
    BotActionTypes,
    ThreadsAction,
    //ThreadsActionTypes,
} from '../../../../types/types';
//import { millisToMinutesAndSeconds } from '../../../MillisToMinutesAndSeconds';

const listenToEvents = ({
    botDispatch,
    eventsDispatch,
    threadsDispatch,
}: {
    botDispatch: React.Dispatch<BotAction>;
    eventsDispatch: React.Dispatch<EventsAction>;
    threadsDispatch: React.Dispatch<ThreadsAction>;
}) => {
    //parsed event is either LogEvent or LogEvent[]
    //console.log(`got an event`, parsedEvent);
};

export default listenToEvents;

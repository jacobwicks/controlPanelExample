import React from 'react';
import { Segment } from 'semantic-ui-react';
import BotStateDisplay from './components/BotStateDisplay';
import ControlButtons from './components/ControlButtons';
import Interval from './components/Interval';
import LogViewer from '../LogViewer/';

const Settings = () => {
    return (
        <div>
            <Segment>
                <LogViewer />
            </Segment>
            <Segment>
                <ControlButtons />
                <BotStateDisplay />
                <Interval />
            </Segment>
        </div>
    );
};

export default Settings;

import React, { useState } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import EditableInput from '../EditableInput';
import { BotAction } from '../../types/types';
import Cookies from './components/Cookies';
import LoginButton from './components/LoginButton';
import BotName from './components/BotName';
import Signature from './components/Signature';

export const settingsConfigKeys = ['settings'];

const Credentials = () => {
    const [username, setUsername] = useState('Patient Zero Cool');
    const [password, setPassword] = useState('example password');

    const configKeys = [...settingsConfigKeys, 'creds'];

    return (
        <>
            <BotName />
            <Signature />
            <Segment>
                <Header>SA Credentials</Header>
                This is the SA forums username and password that the bot uses.
                <EditableInput
                    configKeys={configKeys}
                    dispatch={({ value }) => setUsername(value)}
                    dispatchBefore={[{} as BotAction]}
                    dispatchOnFailure={[
                        ({ value: username } as any) as BotAction,
                    ]}
                    input="username"
                    labelText="Bot SA Username"
                    value={username}
                />
                <EditableInput
                    configKeys={configKeys}
                    dispatch={({ value }) => setPassword(value)}
                    dispatchBefore={[{} as BotAction]}
                    dispatchOnFailure={[
                        ({ value: password } as any) as BotAction,
                    ]}
                    input="password"
                    labelText="Bot SA Password"
                    password
                    value={password}
                />
                <LoginButton />
            </Segment>
            <Cookies />
        </>
    );
};
export default Credentials;

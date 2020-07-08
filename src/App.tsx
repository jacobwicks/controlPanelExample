import React, { useContext, useEffect, useState, useCallback } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import ControlPanel from './components/ControlPanel';
import { Container } from 'semantic-ui-react';
import Instructions from './components/Instructions';
import { LoginContext } from './services/LoginContext';
import Providers from './components/Providers';
import { getHeaders } from './services/Api/services/Headers';
import { LoginActionTypes, ThreadsActionTypes } from './types/types';
import { ThreadsContext } from './services/ThreadsContext';
import threadsGenerator from './services/Generators/ThreadsGenerator';

const App2 = () => {
    const { isLoggedIn, dispatch } = useContext(LoginContext);
    const { dispatch: threadsDispatch } = useContext(ThreadsContext);
    const [hasMounted, setHasMounted] = useState(false);

    const checkToken = useCallback(async () => {
        const token = getHeaders();
        token
            ? dispatch({ type: LoginActionTypes.success })
            : dispatch({ type: LoginActionTypes.logout });
    }, [dispatch]);

    const loadThreads = useCallback(async () => {
        const threads = await threadsGenerator();
        threadsDispatch({
            type: ThreadsActionTypes.setThreads,
            threads,
        });
    }, [threadsDispatch]);

    useEffect(() => {
        if (!hasMounted) {
            setHasMounted(true);
            loadThreads();
            checkToken();
        }
    }, [hasMounted, loadThreads, setHasMounted, checkToken]);

    return (
        <React.Fragment>
            <TopBar />
            <Container text={!isLoggedIn}>
                {isLoggedIn ? <ControlPanel /> : <Instructions />}
            </Container>
        </React.Fragment>
    );
};

const App = () => (
    <Providers>
        <App2 />
    </Providers>
);
export default App;

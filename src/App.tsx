import React, { useContext, useEffect, useState, useCallback } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import ControlPanel from './components/ControlPanel';
import { Container } from 'semantic-ui-react';
import Instructions from './components/Instructions';
import { LoginContext } from './services/LoginContext';
import Providers from './components/Providers';
import { getHeaders } from './services/Api/services/Headers';
import {
    ImageReviewStatus,
    LoginActionTypes,
    ThreadsActionTypes,
    AlbumsAction,
    AlbumsActionTypes,
} from './types/types';
import { ThreadsContext } from './services/ThreadsContext';
import threadsGenerator from './services/Generators/ThreadsGenerator';
import { generateUsers } from './services/Generators/UserGenerator';
import { getRandomInt } from './services/Generators/LogEvents';
import { AlbumsContext } from './services/AlbumsContext';

const App2 = () => {
    const { isLoggedIn, dispatch } = useContext(LoginContext);
    const { dispatch: threadsDispatch } = useContext(ThreadsContext);
    const { dispatch: albumsDispatch } = useContext(AlbumsContext);

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

    const loadImageQueue = useCallback(async () => {
        const users = await generateUsers();
        const randomUser = () => users[getRandomInt(0, 9)];

        const makeImage = (album: string, image: string) => ({
            album,
            hash: getRandomInt(),
            image,
            submittedAt: Date(),
            submittedBy: randomUser(),
            status: ImageReviewStatus.pending,
        });
        const imageQueue = [
            makeImage(
                'Schnorkles',
                'http://www.fulltable.com/VTS/p/pr/l/im/74.jpg'
            ),
            makeImage(
                'Schnorkles',
                'https://pbs.twimg.com/profile_images/722643164478234624/l4N8ZoOx_400x400.jpg'
            ),
            makeImage(
                'Snoo',
                'https://img0.etsystatic.com/136/0/10948157/il_340x270.1032580150_snoo.jpg'
            ),
            makeImage('Corn', 'https://i.imgur.com/mWW6MMf.jpg'),
            makeImage('Corn', 'https://i.imgur.com/fV6OKlN.jpg'),
        ];

        albumsDispatch({
            type: AlbumsActionTypes.setImageQueue,
            imageQueue,
        });
    }, []);

    useEffect(() => {
        if (!hasMounted) {
            setHasMounted(true);
            loadThreads();
            checkToken();
            loadImageQueue();
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

import React, { useContext } from 'react';
import { ThreadsContext } from '../../services/ThreadsContext';
import { loadThreads } from '../../services/Api/services/Threads';
import { Grid, Header, Segment, Button } from 'semantic-ui-react';
import CurrentThread from './components/CurrentThread';
import SideBarThreads from './components/SideBarThreads';
import { ThreadsActionTypes } from '../../types/types';

const Threads = () => {
    const { dispatch, fetching } = useContext(ThreadsContext);

    return (
        <Segment>
            <Grid columns={2} divided>
                <Grid.Column width={4}>
                    <Header
                        as="h2"
                        onClick={() =>
                            dispatch({
                                type: ThreadsActionTypes.currentThread,
                                threadId: 0,
                            })
                        }
                        style={{ cursor: 'pointer' }}
                    >
                        Threads{' '}
                        <Button
                            disabled={fetching}
                            onClick={(e) => {
                                e.stopPropagation();
                                loadThreads(dispatch);
                            }}
                            floated="right"
                            icon="refresh"
                        />
                    </Header>
                    <SideBarThreads />
                </Grid.Column>
                <Grid.Column width={12}>
                    <CurrentThread />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default Threads;

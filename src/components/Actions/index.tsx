import React, { useContext } from 'react';
import SideBarActions from './components/SideBarActions';
import { Segment, Grid, Header } from 'semantic-ui-react';
import { ActionsContext } from '../../services/ActionsContext';
import { ActionsActionTypes } from '../../types/types';
import CurrentAction from './components/CurrentAction';

const Actions = () => {
    const { dispatch } = useContext(ActionsContext);

    return (
        <Segment>
            <Grid columns={2} divided>
                <Grid.Column width={4}>
                    <Header
                        as="h2"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            dispatch({
                                type: ActionsActionTypes.currentAction,
                                key: '',
                            })
                        }
                    >
                        Actions{' '}
                    </Header>
                    <SideBarActions />
                </Grid.Column>
                <Grid.Column width={12}>
                    <CurrentAction />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default Actions;

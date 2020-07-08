import React, { createContext, useReducer } from 'react';
import { ActionsState, ActionsAction } from '../../types/types';

const initialState = {
    actions: {
        AddImageToAlbum: {
            albums: true,
            active: true,
            name: 'Add Image to Album',
            triggers: [/^\\badd\\b/i],
        },
        DeathToll: {
            albums: false,
            active: true,
            name: 'Death Toll',
            triggers: ['deathtoll', 'death toll'],
        },
        ImageCloser: {
            albums: false,
            active: true,
            name: 'Zoom in on Image',
            triggers: ['closer', /^zoom/],
        },
        ImageFromAlbum: {
            albums: true,
            active: true,
            name: 'Get Image From Album',
            triggers: [/^\\bgimme\\b/i, /^\\bgimmie\\b/i, /^give me/i],
        },
        ImageRedder: {
            albums: false,
            active: true,
            name: 'Redden image',
            triggers: ['redder'],
        },
        ImageWider: {
            albums: false,
            active: true,
            name: 'Widen Image',
            triggers: ['wider'],
        },
        NoneAThisMatters: {
            albums: false,
            active: true,
            name: 'None a this matters',
            triggers: [/matter/gi],
        },
        PostCat: {
            albums: false,
            active: true,
            name: 'Cat Pictures',
            triggers: ['kittycat'],
        },
        PostTrumpTweet: {
            albums: false,
            active: true,
            name: 'Trump Tweet',
            triggers: [
                "what's trumping",
                "what's trumpin",
                'whats trumping',
                'whats trumpin',
            ],
        },
        SASmiley: {
            albums: false,
            active: true,
            name: 'Smiley',
            triggers: ['smiley'],
        },
        Tayne: {
            albums: false,
            active: true,
            name: 'Tayne',
            triggers: ['tayne', /hat wobble/gi],
        },
        Thoughts: {
            albums: false,
            active: true,
            name: 'Thoughts',
            triggers: [/thoughts/gi, /think/gi],
        },
        TrumpWeight: {
            albums: false,
            active: true,
            name: 'Trump weight',
            triggers: [/\\btrump\\b.*?(weight|bmi|fat)/gi],
        },
        Tweet: {
            albums: false,
            active: true,
            name: 'Post Tweet',
            triggers: [/^@/],
        },
        WhatIsLove: {
            albums: false,
            active: true,
            name: 'What is Love?',
            triggers: ['what is love'],
        },
    },
    failed: false,
    fetching: false,
    dispatch: (action: ActionsAction) => undefined,
} as ActionsState;

let reducer = (state: ActionsState, action: ActionsAction) => {
    switch (action.type) {
        case 'currentAction': {
            const { key } = action;
            return {
                ...state,
                action: key,
            };
        }
        case 'failed': {
            return {
                ...state,
                failed: true,
                fetching: false,
                actions: {},
            };
        }
        case 'fetchAttempt': {
            return {
                ...state,
                fetching: true,
            };
        }
        case 'setAction': {
            const { key, value } = action;
            const newActions = { ...state.actions };
            newActions[key] = value;
            return {
                ...state,
                actions: newActions,
            };
        }
        case 'setActions': {
            const { actions } = action;
            return {
                ...state,
                failed: false,
                fetching: false,
                actions,
            };
        }
        case 'setActive': {
            const { key, value } = action;
            const newActions = { ...state.actions };
            const newAction = { ...newActions[key] };
            newAction.active = value;

            newActions[key] = newAction;

            return {
                ...state,
                actions: newActions,
            };
        }
        default: {
            console.log(`actionsContext default`, action);
            //throw new Error();
            return state;
        }
    }
};

const ActionsContext = createContext(initialState);

//the Props that the ActionsProvider will accept
type ActionsProps = {
    //You can put react components inside of the Provider component
    children: React.ReactNode;

    //We might want to pass a state into the CardProvider for testing purposes
    testState?: ActionsState;

    testDispatch?: (args: any) => void;
};

const ActionsProvider = ({
    children,
    testState,
    testDispatch,
}: ActionsProps) => {
    //useReducer returns an array containing the state at [0]
    //and the dispatch method at [1]
    //use array destructuring to get state and dispatch
    const [state, dispatch] = useReducer(
        reducer,
        testState ? testState : initialState
    );

    //add dispatch to value object and cast to LoggedInState
    const value = {
        ...state,
        dispatch,
    } as ActionsState;

    return (
        <ActionsContext.Provider value={value}>
            {children}
        </ActionsContext.Provider>
    );
};

export { ActionsContext, ActionsProvider };

import React, { createContext, useReducer } from 'react';
import {
    InstructionsState,
    InstructionsAction,
    dummySAUser,
} from '../../types/types';

const initialState = {
    actions: [
        {
            albums: true,
            example: 'zeroCool add ${album}',
            instructions:
                '# Add Image to Album\r\n\r\nYou can request to add an image to one of the albums that the bot uses. The bot will add all images in a post and/or in quoted posts to the image review queue. If the person running the bot approves an image, it will be added to the album.  ',
            key: 'AddImageToAlbum',
            name: 'Add Image to Album',
            triggers: [/^\\badd\\b/i],
        },
        {
            albums: false,
            instructions:
                '# Death Toll\r\n\r\nzeroCool can tell you all about coronavirus. This handy action scrapes the CDC.gov website and posts the current U.S. Coronavirus Death Toll. It also posts the total number of coronavirus cases.',
            key: 'DeathToll',
            name: 'Death Toll',
            triggers: ['deathtoll', 'death toll'],
        },
        {
            example: 'zeroCool, zoom in on that',
            instructions:
                '# Closer\r\n\r\nZooms in on image, uploads it to imgur, and posts the zoomed in image.',
            key: 'ImageCloser',
            name: 'Zoom in on Image',
            triggers: ['closer', /^zoom/],
        },
        {
            albums: true,
            example:
                'zeroCool gimme ${album}\r\n\r\nzeroCool gimme a ${album}\r\n\r\nzeroCool give me ${album}',
            instructions:
                '# Get Image From Album\r\n\r\nYou can request a random image from one of the albums that the bot uses. The bot will quote your post and post one of the images from the requested album.',
            key: 'ImageFromAlbum',
            name: 'Get Image From Album',
            triggers: [/^\\bgimme\\b/i, /^\\bgimmie\\b/i, /^give me/i],
        },
        {
            instructions:
                '# Redder\r\n\r\nRaises the red levels of an image, hosts it on imgur, and posts it.',
            key: 'ImageRedder',
            name: 'Redden image',
            triggers: ['redder'],
        },
        {
            instructions:
                '# Wider\r\n\r\nWidens an image, hosts it on imgur, and posts it.',
            key: 'ImageWider',
            name: 'Widen Image',
            triggers: ['wider'],
        },
        {
            example:
                "The regular expression will grab any post that starts with zeroCool and contains the word 'matter'\r\n\r\nzeroCool matter\r\n\r\nzeroCool, does anything matter?\r\n\r\nzeroCool, what's the matter?",
            instructions:
                '# None of this matters\r\n\r\nA bleak philosophical outlook.\r\n\r\n![](https://i.imgur.com/yX9KZ49.jpg)',
            key: 'NoneAThisMatters',
            name: 'None a this matters',
            triggers: [/matter/gi],
        },
        {
            instructions:
                '# Cat Picture\r\n\r\nUses [the cat api](http://www.thecatapi.com) to post a random picture of a cat. \r\n\r\n![](https://cdn2.thecatapi.com/images/2fp.jpg)',
            key: 'PostCat',
            name: 'Cat Pictures',
            triggers: ['kittycat'],
        },
        {
            instructions:
                '# Trump Tweet\r\n\r\nPosts the latest tweet from the president. Needs a bit more work telling tweets from re-tweets.',
            key: 'PostTrumpTweet',
            name: 'Trump Tweet',
            triggers: [
                "what's trumping",
                "what's trumpin",
                'whats trumping',
                'whats trumpin',
            ],
        },
        {
            instructions: '# Smiley\r\n\r\nPosts a random SA Smiley.',
            key: 'SASmiley',
            name: 'Smiley',
            triggers: ['smiley'],
        },
        {
            example: 'zeroCool hat wobble',
            instructions:
                '# Tayne\r\n\r\nA wonderful gif of Tayne doing a hat wobble.\r\n\r\n![](https://i.imgur.com/5oCbDFL.gif)',
            key: 'Tayne',
            name: 'Tayne',
            triggers: ['tayne', /hat wobble/gi],
        },
        {
            example:
                "The regular expression will grab any post that starts with zeroCool and contains the word 'thoughts'\r\n\r\nzeroCool thoughts\r\n\r\nzeroCool, what are your thoughts on this?\r\n\r\nzeroCool, what do you think?",
            instructions:
                "# Thoughts\r\n\r\nUses [deepai text generator](https://deepai.org/machine-learning-model/text-generator) to produce zeroCool's thoughts about anything. ",
            key: 'Thoughts',
            name: 'Thoughts',
            triggers: [/thoughts/gi, /think/gi],
        },
        {
            instructions:
                '# Trump Weight\r\n\r\nGives the official regime figures for trump weight and height. Needs to be updated as of mid 2020.',
            key: 'TrumpWeight',
            name: 'Trump weight',
            triggers: [/\\btrump\\b.*?(weight|bmi|fat)/gi],
        },
        {
            example:
                'The regular expression will grab any post that starts with zeroCool and then the @ character\r\n\r\nzeroCool @nationalGeographic\r\n\r\nzeroCool, @PossumEveryHour',
            instructions:
                '# Tweet\r\n\r\nPosts the latest tweet from the requested twitter account.',
            key: 'Tweet',
            name: 'Post Tweet',
            triggers: [/^@/],
        },
        {
            instructions:
                "# What is love?\r\n\r\nBaby don't hurt me\r\n\r\nDon't hurt me\r\n\r\nNo more\r\n\r\n![](https://i.imgur.com/qXcDIBl.gif)\r\n\r\nThis incredibly useful action posts a gif from night at the roxbury",
            key: 'WhatIsLove',
            name: 'What is Love?',
            triggers: ['what is love'],
        },
    ],
    albums: [
        {
            album: 'Schnorkles',
            description: 'Insane in the Poll Plane (Insane in the Brain!)',
        },
        {
            album: 'Snoo',
            description:
                "You think you're too good to look at rats? YOU AREN'T!!!",
        },
        {
            album: 'Corn',
            description: 'Pictures of corn are funny for this one afternoon',
        },
        { album: 'Trump', description: 'unfortunately' },
    ],
    bot: dummySAUser,
    botName: 'zeroCool',
    done: true,
    fetching: false,
    failed: false,
    general:
        '# How to use zeroCool, an SA Forums Bot\r\n\r\nzeroCool reads and responds to posts on SA automatically. Here is a list of the responses that it can make. To use the bot, just post in a thread that the bot is reading. If your post matches one of the action triggers, then the bot will respond to your post.\r\n',
    homepage: 'https://jacobwicks.github.io/forumsBotInstructions',
    threads: [],
    dispatch: (action: InstructionsAction) => undefined,
} as InstructionsState;

// }

let reducer = (state: InstructionsState, action: InstructionsAction) => {
    switch (action.type) {
        case 'done': {
            return {
                ...state,
                done: true,
                fetching: false,
            };
        }
        case 'failed': {
            return {
                ...state,
                actions: [],
                albums: [],
                done: true,
                fetching: false,
                failed: true,
                general: '',
            };
        }
        // setInstructions = 'setInstructions',
        case 'fetchAttempt': {
            return {
                ...state,
                fetching: true,
            };
        }
        case 'setBotName': {
            const { botName } = action;
            return {
                ...state,
                botName,
            };
        }
        case 'setInstructions': {
            const { instructions } = action;
            const {
                actions,
                albums,
                bot,
                general,
                homepage,
                threads,
            } = instructions;
            return {
                ...state,
                failed: false,
                fetching: false,
                actions,
                albums,
                bot,
                general,
                homepage,
                threads,
            };
        }
        default: {
            console.log(`InstructionsContext default`, action);
            //throw new Error();
            return state;
        }
    }
};

const InstructionsContext = createContext(initialState);

//the Props that the InstructionsProvider will accept
type InstructionsProps = {
    //You can put react components inside of the Provider component
    children: React.ReactNode;

    //We might want to pass a state into the CardProvider for testing purposes
    testState?: InstructionsState;

    testDispatch?: (args: any) => void;
};

const InstructionsProvider = ({
    children,
    testState,
    testDispatch,
}: InstructionsProps) => {
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
    } as InstructionsState;

    return (
        <InstructionsContext.Provider value={value}>
            {children}
        </InstructionsContext.Provider>
    );
};

export { InstructionsContext, InstructionsProvider };

import React, { useState, useContext } from 'react';
import { Button, Segment, Popup } from 'semantic-ui-react';
import ReactMarkdown from '../../../Markdown';
import useResize from '../../../APIs/components/Instructions/GenericInstructions/services/UseResize';
import { KeyStringInterface } from '../../../../types/types';
import { InstructionsContext } from '../../../../services/InstructionsContext';

export const getInstructionsObject = (botName: string): KeyStringInterface => ({
    AddImageToAlbum: `# Add Image to Album

You can request to add an image to one of the albums that the bot uses. 
The bot will add all images in a post and/or in quoted posts to the image review queue. 
If the person running the bot approves an image, it will be added to the album.  `,
    DeathToll: `# Death Toll

${botName} can tell you all about coronavirus. 
This handy action scrapes the CDC.gov website and posts the current U.S. Coronavirus Death Toll. 
It also posts the total number of coronavirus cases.`,
    ImageCloser: `# Closer

Zooms in on image, uploads it to imgur, and posts the zoomed in image.`,
    ImageFromAlbum: `# Get Image From Album

You can request a random image from one of the albums that the bot uses. 
The bot will quote your post and post one of the images from the requested album.`,
    ImageRedder: `# Redder

Raises the red levels of an image, hosts it on imgur, and posts it.`,
    ImageWider: `# Wider

Widens an image, hosts it on imgur, and posts it.`,
    NoneAThisMatters: `# None of this matters

A bleak philosophical outlook.
    
![](https://i.imgur.com/yX9KZ49.jpg)`,
    PostCat: `# Cat Picture

Uses [the cat api](http://www.thecatapi.com) to post a random picture of a cat. 
    
![](https://cdn2.thecatapi.com/images/2fp.jpg)`,
    PostTrumpTweet: `# Trump Tweet

Posts the latest tweet from the president.`,
    SASmiley: `# Smiley

Posts a random SA Smiley.`,
    Tayne: `# Tayne

A wonderful gif of Tayne doing a hat wobble.
    
![](https://i.imgur.com/5oCbDFL.gif)`,
    Thoughts: `# Thoughts

Uses [deepai text generator](https://deepai.org/machine-learning-model/text-generator) to produce ${botName}'s thoughts about anything. `,
    TrumpWeight: `# Trump Weight

Gives the official regime figures for trump weight and height. 
Needs to be updated as of mid 2020.`,
    Tweet: `# Tweet

Posts the latest tweet from the requested twitter account.`,
    WhatIsLove: `# What is love?

Baby don't hurt me
    
Don't hurt me
    
No more
    
![](https://i.imgur.com/qXcDIBl.gif)
    
This incredibly useful action posts a gif from night at the roxbury`,
});

export const Instructions = ({
    action,
    addChildren,
}: {
    action: string;
    addChildren?: JSX.Element[];
}) => {
    const { botName } = useContext(InstructionsContext);
    const divRef = React.useRef<HTMLDivElement>(null);
    const maxWidth = useResize(divRef);
    const [open, setOpen] = useState(false);

    const instructionsObject = getInstructionsObject(botName);

    const input = instructionsObject[action];

    const children = [
        <ReactMarkdown
            key="markdown"
            escapeHtml={false}
            source={input}
            maxWidth={maxWidth}
        />,
    ];

    addChildren?.forEach((child, index) =>
        children.push({ ...child, key: index.toString() })
    );

    const noInstructions = !input;

    return (
        <div ref={divRef} style={{ marginBottom: 20 }}>
            <Popup
                trigger={
                    <Button onClick={() => input && setOpen(!open)}>
                        {action}
                    </Button>
                }
                content="click for instructions"
                disabled={open || noInstructions}
            />
            {open && <Segment children={children} />}
        </div>
    );
};

export default Instructions;

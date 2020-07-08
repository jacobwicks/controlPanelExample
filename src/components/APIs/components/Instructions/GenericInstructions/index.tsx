import React, { useState } from 'react';
import { Button, Segment, Popup } from 'semantic-ui-react';
import ReactMarkdown from '../../../../Markdown';
import useResize from './services/UseResize';
import { KeyStringInterface } from '../../../../../types/types';

const instructionsObject: KeyStringInterface = {
    catAPI: `# To Get the Cat Api Key

1. Go to the cat api website and sign up <br/>
<a href="https://thecatapi.com/signup" target="_blank">Sign Up Here on the Cat Api Website</a>

2. You will get an email with the key in it.
3. Copy the key from your email into the field on this page`,
    deepAi: `# Deep AI API

The Deep AI API provides a [text generator](https://deepai.org/machine-learning-model/text-generator). zeroCool uses it to generate responses to posts.

To get the Deep AI API key, go to (https://deepai.org/) and click the 'sign up' button in the upper right. Provide a valid email address. They will email you a verification link. Click the verification link. You will then be logged in to the Deep AI website. The code will be displayed on the [Deep AI profile screen](https://deepai.org/dashboard/profile).`,
    imgur: `# To get the Imgur api keys follow the 4 steps below
If you already have an account with Imgur, you can skip step 1.

1. Register an Imgur account

    <a href="https://imgur.com/register" target="_blank">https://imgur.com/register</a>

2. Log in to Imgur

    <a href="https://imgur.com/signin/" target="_blank">https://imgur.com/signin/</a>

3. Register an application on Imgur

Registering an application will get you the client_id and client_secret.

Go to this link:
        <a href="https://api.imgur.com/oauth2/addclient" target="_blank">https://api.imgur.com/oauth2/addclient</a>


You'll need to log in with your imgur account if you haven't already.

To register the application type the application name. 

It can be anything. I suggest something like "saForumsBot"

Select "OAuth 2 authorization without a callback URL".

Skip the Authorization callback url and website fields.

Fill in the email and description fields.

Do the captcha if there is one.

Click submit.

Copy and paste the client_id and client_secret into the fields on this screen.

The client_id is used to upload images "anonymously", meaning they don't go into one of the named albums on the account.

4. Click the "Get Token" button to use your Imgur username and password to get the access token

The access token is used to upload images to albums.`,
    twitter: `# Twitter

Twitter documentation 1: [Application-only authentication and OAuth 2.0 Bearer Token](https://developer.twitter.com/en/docs/basics/authentication/api-reference/token)

Twitter documentation 2: [Application-only authentication and OAuth 2.0 Bearer Token](https://developer.twitter.com/en/docs/basics/authentication/oauth-2-0/application-only)

Follow these 6 steps to get the authentication codes that you need to make your bot work with Twitter.

1. You need to [sign up for twitter](https://twitter.com/signup/), if you haven't already.

2. Sign Up for Twitter Developer Account

Then you need to [sign up for a twitter developer account](https://developer.twitter.com/en).
After you sign up, you'll need to verify your account by clicking a link that Twitter will email you. You'll also have to provide a phone number.

3. Create an App

Go to the Twitter developer dashboard and [create an app](https://developer.twitter.com/en/apps/create).

4. Get the 'Consumer Key' and the Consumer Secret'
Click the 'Details' button for the app.

![Details Button](https://jacobwicks.github.io/assets//images/2020-05-11/detailsButton.png)

Click on 'Keys and Tokens'.

![Keys and Tokens Button](https://jacobwicks.github.io/assets//images/2020-05-11/keysAndTokens.png)

Get the consumer key and consumer secret for the app.

![Key and Secret](https://jacobwicks.github.io/assets//images/2020-05-11/keySecret.png)

Copy and paste the consumer key and consumer secret into the fields on this page.

5. Click the button below to get the bearer token`,
};

export const GenericInstructions = ({
    api,
    addChildren,
}: {
    api: string;
    addChildren?: JSX.Element[];
}) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    const maxWidth = useResize(divRef);
    const [open, setOpen] = useState(false);

    const input = instructionsObject[api];

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
                        {api}
                    </Button>
                }
                content="click for instructions"
                disabled={open || noInstructions}
            />
            {open && <Segment children={children} />}
        </div>
    );
};

export default GenericInstructions;

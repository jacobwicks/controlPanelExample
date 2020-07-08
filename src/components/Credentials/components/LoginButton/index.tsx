import React from 'react';
import { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';

const LoginButton = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [success, setSuccess] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const testCreds = async () => {
        setIsFetching(true);

        await setTimeout(() => {}, 750);

        setIsFetching(false);
        setSuccess(true);
        setHasFetched(true);
    };

    return (
        <>
            <Button onClick={() => testCreds()} loading={isFetching}>
                Test Login
            </Button>
            {hasFetched ? (
                success ? (
                    <Icon name="thumbs up outline" />
                ) : (
                    <Icon name="thumbs down outline" />
                )
            ) : undefined}
        </>
    );
};

export default LoginButton;

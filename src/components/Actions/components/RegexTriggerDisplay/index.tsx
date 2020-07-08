import React, { useEffect, useState, useCallback, useContext } from 'react';
import { authFetchJSON } from '../../../../services/Api/services/AuthFetch';
import ReactMarkdown from '../../../Markdown';
import useResize from '../../../APIs/components/Instructions/GenericInstructions/services/UseResize';
import { ActionsContext } from '../../../../services/ActionsContext';
import { Segment, Header } from 'semantic-ui-react';
import { getInstructionsObject } from '../Instructions';
import { InstructionsContext } from '../../../../services/InstructionsContext';

export const RegexTriggerDisplay = () => {
    const { action } = useContext(ActionsContext);
    const { botName } = useContext(InstructionsContext);
    const instructionsObject = getInstructionsObject(botName);

    const divRef = React.useRef<HTMLDivElement>(null);
    const maxWidth = useResize(divRef);
    const input = action && instructionsObject[action];

    const noExample = !input;

    return (
        <Segment>
            {noExample ? (
                <Header as="h4">
                    No example given to match regular expression trigger
                </Header>
            ) : (
                <div ref={divRef}>
                    <ReactMarkdown
                        key="markdown"
                        escapeHtml={false}
                        source={input}
                        maxWidth={maxWidth}
                    />{' '}
                </div>
            )}
        </Segment>
    );
};

export default RegexTriggerDisplay;

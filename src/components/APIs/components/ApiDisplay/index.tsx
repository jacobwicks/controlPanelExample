import React, { useContext } from 'react';
import { ApiContext } from '../../../../services/ApiContext';
import ArrayDisplay from '../ArrayDisplay';
import ObjectDisplay from '../ObjectDisplay';
import Instructions from '../Instructions';
import ApiInput from '../ApiInput';

const ApiDisplay = ({ api }: { api: string }) => {
    const { apis } = useContext(ApiContext);

    const instructionChild = <Instructions key={api} api={api} />;
    const thisApi = apis[api];

    const configKeys = ['apis', api];

    const apiChild =
        typeof thisApi === 'string' ? (
            <ApiInput api={api} value={thisApi} />
        ) : (
            Object.entries(thisApi).map(([key, value], index) => {
                return (
                    <div key={index}>
                        {typeof value === 'object' ? (
                            Array.isArray(value) ? (
                                <ArrayDisplay
                                    api={api}
                                    keys={configKeys}
                                    array={value}
                                    name={key}
                                />
                            ) : (
                                <ObjectDisplay
                                    api={api}
                                    keys={configKeys}
                                    object={value}
                                    name={key}
                                />
                            )
                        ) : (
                            <ApiInput api={api} input={key} value={value} />
                        )}
                    </div>
                );
            })
        );

    return (
        <>
            {instructionChild}
            {apiChild}
        </>
    );
};

export default ApiDisplay;

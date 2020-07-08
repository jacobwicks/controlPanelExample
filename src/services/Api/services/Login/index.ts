import { LoginAction, LoginActionTypes } from '../../../../types/types';
import { saveToken } from '../Token';

const login = async ({
    dispatch,
}: {
    dispatch: React.Dispatch<LoginAction>;
}) => {
    dispatch({ type: LoginActionTypes.attempt });

    try {
        const token = 'placeholder token';

        //if token is truthy
        //save the token to local storage
        token && saveToken(token)
            ? //and dispatch a success action
              dispatch({ type: LoginActionTypes.success })
            : //otherwise, login failed
              dispatch({ type: LoginActionTypes.failure });
    } catch (err) {
        //log(err)
        dispatch({ type: LoginActionTypes.failure });
    }
};

export default login;

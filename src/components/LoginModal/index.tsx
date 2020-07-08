import React, { useContext, useState } from 'react';
import { Button, Icon, Input, Header, Modal } from 'semantic-ui-react';
import { LoginContext } from '../../services/LoginContext';
import { login, logout } from '../../services/Api';

const LoginModal = () => {
    const { modalOpen, loggingIn, dispatch } = useContext(LoginContext);
    const [password, setPassword] = useState('');
    return (
        <Modal open={modalOpen}>
            <Header icon="lock" content="Login to see controls" />
            <Modal.Content>
                <Header>Click "Yes" to login</Header>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color="red" onClick={() => logout(dispatch)}>
                    <Icon name="remove" /> No
                </Button>
                {loggingIn ? (
                    <Button color="green" loading />
                ) : (
                    <Button color="green" onClick={() => login({ dispatch })}>
                        <Icon name="checkmark" /> Yes
                    </Button>
                )}
            </Modal.Actions>
        </Modal>
    );
};

export default LoginModal;

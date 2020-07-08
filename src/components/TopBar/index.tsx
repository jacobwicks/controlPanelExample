import React, { useContext, useState, useEffect } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import LoginModal from '../LoginModal';
import { BotContext } from '../../services/BotContext';
import { InstructionsContext } from '../../services/InstructionsContext';
import ControlPanelLink from './components/ControlPanelLink';
import SaveInstructionsButton from './components/SaveInstructionsButton';
import InstructionsLink from './components/InstructionsLink';

const Title = () => {
    const { settings } = useContext(BotContext);
    const { botName: instructionsBotName } = useContext(InstructionsContext);
    const [botName, setBotName] = useState(
        instructionsBotName
            ? instructionsBotName
            : settings?.botName
            ? settings.botName
            : ''
    );

    useEffect(() => {
        if (settings) {
            setBotName(settings.botName);
        }
    }, [settings]);

    return <Header size="large" content={`${botName}, an SA Forums Bot`} />;
};

const menuItems = [
    <ControlPanelLink />,
    <Title />,
    <SaveInstructionsButton />,
    <InstructionsLink />,
].map((element, index) => <Menu.Item key={index}>{element}</Menu.Item>);

const TopBar = () => (
    <>
        <Menu children={menuItems} color="green" inverted />
        <LoginModal />
    </>
);

export default TopBar;

import { Layout as AntLayout, Typography, Button } from 'antd';
import { SettingsIcon } from '../../icons';

import './header.css';

const { Header: AntHeader } = AntLayout;

const { Title, Text } = Typography;

export const Header = () => (
    <AntHeader className='header'>
        <Text>Главная </Text>
        <div className='header__wrapper'>
            <Title className='title'>
                Приветствуем тебя в CleverFit — приложении,
                <br /> которое поможет тебе добиться своей мечты!
            </Title>
            <Button icon={<SettingsIcon />} size='large' className='btn-settings'>
                Настройки
            </Button>
        </div>
    </AntHeader>
);

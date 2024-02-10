import { Layout as AntLayout, Typography, Button } from 'antd';
import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {SettingsIcon} from '../../icons'
import './header.css';

const { Header: AntHeader } = AntLayout;

interface HeaderProps {
    collapsed: boolean;
    toggleCollapsed: () => void;
  }

  const { Title, Text } = Typography;


export const Header = ({ collapsed, toggleCollapsed}: HeaderProps) => (
    <AntHeader>
        <Text>Главная </Text>
        <div className='title_wrapper'>
        <Title className='title'>Приветствуем тебя в CleverFit — приложении,<br/> которое поможет тебе добиться своей мечты!</Title>
       <Button icon={collapsed ? null : <SettingsIcon />} size="large" className='btn_settings'>
      Настройки
    </Button>
        </div>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggleCollapsed,
      })}
  </AntHeader>
);

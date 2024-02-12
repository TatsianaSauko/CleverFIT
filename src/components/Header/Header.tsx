import { Layout as AntLayout, Typography, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {SettingsIcon} from '../../icons';
// import React, { useState } from 'react';
import './header.css';

const { Header: AntHeader } = AntLayout;

interface HeaderProps {
    collapsed: boolean;
    toggleCollapsed: () => void;
  }

  const { Title, Text } = Typography;


export const Header = ({ collapsed, toggleCollapsed}: HeaderProps) => {
    return(
    <AntHeader className='header'>
        <Text>Главная </Text>
        <div className='title_wrapper'>
        <Title className='title'>Приветствуем тебя в CleverFit — приложении,<br/> которое поможет тебе добиться своей мечты!</Title>
       <Button icon={collapsed ? null : <SettingsIcon />} size="large" className='btn_settings'>
      Настройки
    </Button>
        </div>
        {collapsed? <MenuUnfoldOutlined className='sider-switch trigger' data-test-id='sider-switch' onClick={toggleCollapsed} />:
         <MenuFoldOutlined className='sider-switch trigger' data-test-id='sider-switch' onClick={toggleCollapsed}/>}
  </AntHeader>
)};

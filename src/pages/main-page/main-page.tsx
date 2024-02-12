import { Layout, Button, Divider } from 'antd';
import React, { useState } from 'react';
import { Sider } from '@components/Sider';
import { Header } from '@components/Header';
import { SiderMobile } from '@components/SiderMobile';
import { Card } from '@components/Card';
import backgroundImage from '/png/mainPageLight.png';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
    HeartIconSmall,
    CalendarIconSmall,
    IdCardIconSmall,
    AppleIcon,
    AndroidIcon,
} from '../../icons';

import './main-page.css';

const { Content, Footer } = Layout;

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [collapsedMobile, setCollapsedMobile] = useState(false);

    const toggleCollapsedMobile = () => {
        setCollapsedMobile(!collapsedMobile);
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className='wrapper'
        >
            <Sider collapsed={collapsed} />
            {!collapsedMobile ? (
                <MenuUnfoldOutlined
                    className='sider-switch-mobile'
                    data-test-id='sider-switch-mobile'
                    onClick={toggleCollapsedMobile}
                />
            ) : (
                <MenuFoldOutlined
                    className='sider-switch-mobile trigger'
                    data-test-id='sider-switch-mobile'
                    onClick={toggleCollapsedMobile}
                />
            )}
            <SiderMobile collapsedMobile={collapsedMobile} />
            <Layout style={{ backgroundColor: 'transparent' }} className='site_layout'>
                <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                <Content className='main'>
                    <div className='block_skills'>
                        C CleverFit ты сможешь: <br />— планировать свои тренировки на календаре,
                        выбирая тип и уровень нагрузки;
                        <br /> — отслеживать свои достижения в разделе статистики, сравнивая свои
                        результаты c нормами и рекордами; <br />— создавать свой профиль, где ты
                        можешь загружать свои фото, видео и отзывы o тренировках; <br />— выполнять
                        расписанные тренировки для разных частей тела, следуя подробным инструкциям
                        и советам профессиональных тренеров.
                    </div>
                    <div className='sub_title'>
                        CleverFit — это не просто приложение, a твой личный помощник в мире фитнеса.
                        He откладывай на завтра — начни тренироваться уже сегодня!
                    </div>
                    <div className='block_cards'>
                        <div className='cards_wrapper'>
                            <Card
                                title='Расписать тренировки'
                                link='Тренировки'
                                icon={<HeartIconSmall />}
                            />
                            <Card
                                title='Назначить календарь'
                                link='Календарь'
                                icon={<CalendarIconSmall />}
                            />
                            <Card
                                title='Заполнить профиль'
                                link='Профиль'
                                icon={<IdCardIconSmall />}
                            />
                        </div>
                    </div>
                    <div className='block_download'>
                        <div className='info'>
                            <div className='block_download__title'>Скачать на телефон</div>
                            <div className='block_download__sub_title'>Доступно в PRO-тарифе</div>
                        </div>
                        <Divider className='divider' />
                        <div className='block_download__buttons'>
                            <Button icon={<AndroidIcon />} block className='btn_download'>
                                Android OS
                            </Button>
                            <Button icon={<AppleIcon />} block className='btn_download'>
                                Apple iOS
                            </Button>
                        </div>
                    </div>
                </Content>
                <Footer className='footer'>
                    <div className='footer_btn'>Смотреть отзывы</div>
                </Footer>
            </Layout>
        </Layout>
    );
};

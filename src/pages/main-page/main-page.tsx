import { Layout, Button, Divider } from 'antd';
import React, { useState } from 'react';
import { Sider } from '@components/Sider';
import { Header } from '@components/Header';
import { SiderMobile } from '@components/SiderMobile';
import { ButtonSiderToggle } from '@components/ButtonSiderToggle';
import { Card } from '@components/Card';
import backgroundImage from '/png/mainPageLight.png';
import {
    HeartIconSmall,
    CalendarIconSmall,
    IdCardIconSmall,
    AppleIcon,
    AndroidIcon,
} from '../../icons';

import './main-page.css';

const { Content, Footer } = Layout;

export const CARDS_DATA = [
    {
        title: 'Расписать тренировки',
        link: 'Тренировки',
        icon: <HeartIconSmall />,
    },
    {
        title: 'Назначить календарь',
        link: 'Календарь',
        icon: <CalendarIconSmall />,
    },
    {
        title: 'Заполнить профиль',
        link: 'Профиль',
        icon: <IdCardIconSmall />,
    },
];

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
            <SiderMobile collapsedMobile={collapsedMobile} />
            <Layout style={{ backgroundColor: 'transparent' }} className='site_layout'>
                <ButtonSiderToggle
                    collapsed={collapsed}
                    collapsedMobile={collapsedMobile}
                    toggleCollapsed={toggleCollapsed}
                    toggleCollapsedMobile={toggleCollapsedMobile}
                />
                <Header />
                <Content className='main'>
                    <div className='main__skills'>
                        C CleverFit ты сможешь: <br />— планировать свои тренировки на календаре,
                        выбирая тип и уровень нагрузки;
                        <br /> — отслеживать свои достижения в разделе статистики, сравнивая свои
                        результаты c нормами и рекордами; <br />— создавать свой профиль, где ты
                        можешь загружать свои фото, видео и отзывы o тренировках; <br />— выполнять
                        расписанные тренировки для разных частей тела, следуя подробным инструкциям
                        и советам профессиональных тренеров.
                    </div>
                    <div className='main__subtitle'>
                        CleverFit — это не просто приложение, a твой личный помощник в мире фитнеса.
                        He откладывай на завтра — начни тренироваться уже сегодня!
                    </div>
                    <div className='main__cards'>
                        <div className='cards__wrapper'>
                            {CARDS_DATA.map((card) => (
                                <Card title={card.title} link={card.link} icon={card.icon} />
                            ))}
                        </div>
                    </div>
                    <div className='block-download'>
                        <div className='block-download__info info'>
                            <div className='info__title'>Скачать на телефон</div>
                            <div className='info__subtitle'>Доступно в PRO-тарифе</div>
                        </div>
                        <Divider className='divider' />
                        <div className='block-download__buttons'>
                            <Button icon={<AndroidIcon />} block className='btn-download'>
                                Android OS
                            </Button>
                            <Button icon={<AppleIcon />} block className='btn-download'>
                                Apple iOS
                            </Button>
                        </div>
                    </div>
                </Content>
                <Footer className='footer'>
                    <div className='footer__btn'>Смотреть отзывы</div>
                </Footer>
            </Layout>
        </Layout>
    );
};

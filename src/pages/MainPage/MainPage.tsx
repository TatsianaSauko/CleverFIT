import { Layout, Button, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { Sider } from '@components/Sider';
import { Header } from '@components/Header';
import { ButtonSiderToggle } from '@components/ButtonSiderToggle';
import { Card } from '@components/Card';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { useLocation } from 'react-router-dom';
import {
    HeartIconSmall,
    CalendarIconSmall,
    IdCardIconSmall,
    AppleIcon,
    AndroidIcon,
} from '../../icons';

import './mainPage.css';
import { Loader } from '@components/Loader';

const { Content, Footer } = Layout;

export const CARDS_DATA = [
    {
        key: '1',
        title: 'Расписать тренировки',
        link: 'Тренировки',
        icon: <HeartIconSmall />,
    },
    {
        key: '2',
        title: 'Назначить календарь',
        link: 'Календарь',
        icon: <CalendarIconSmall />,
    },
    {
        key: '3',
        title: 'Заполнить профиль',
        link: 'Профиль',
        icon: <IdCardIconSmall />,
    },
];

export const MainPage: React.FC = () => {
    const { token, loading } = useAppSelector((state) => state.auth);
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        if (location.pathname === '/') {
            history.push('/main');
        }
        if (!token) {
            history.push('/auth');
        }
    }, [token]);

    return (
        <Layout className='main-page'>
            {loading && <Loader />}
            <Sider collapsed={collapsed} />
            <Layout className='site_layout'>
                <ButtonSiderToggle collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
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
                                <Card
                                    title={card.title}
                                    link={card.link}
                                    icon={card.icon}
                                    key={card.key}
                                />
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

import { Layout as AntLayout, Typography, Button, PageHeader } from 'antd';
import { SettingsIcon } from '../../icons';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Path } from '@constants/paths';
import { history } from '@redux/configure-store';

import './header.css';

const { Header: AntHeader } = AntLayout;

const { Title } = Typography;

interface BreadcrumbRoute {
    path: string;
    breadcrumbName: string;
}

export const Header = () => {
    const location = useLocation();
    const [isTitleHeader, setIsTitleHeader] = useState(false);
    const [isWrapperTitleHeader, setWrapperIsTitleHeader] = useState(false);
    const [breadcrumbRoutes, setBreadcrumbRoutes] = useState<BreadcrumbRoute[]>([]);

    useEffect(() => {
        if (location.pathname === Path.Main) {
            setIsTitleHeader(true);
            setWrapperIsTitleHeader(true);
            setBreadcrumbRoutes([
                {
                    path: Path.Main,
                    breadcrumbName: 'Главная',
                },
            ]);
        } else if (location.pathname === Path.Feedbacks) {
            setWrapperIsTitleHeader(false);
            setBreadcrumbRoutes([
                {
                    path: Path.Main,
                    breadcrumbName: 'Главная',
                },
                {
                    path: Path.Feedbacks,
                    breadcrumbName: 'Отзывы пользователей',
                },
            ]);
        } else if (location.pathname === Path.Calendar) {
            setWrapperIsTitleHeader(true);
            setIsTitleHeader(false);
            setBreadcrumbRoutes([
                {
                    path: Path.Main,
                    breadcrumbName: 'Главная',
                },
                {
                    path: Path.Calendar,
                    breadcrumbName: 'Календарь',
                },
            ]);
        }
    }, [location.pathname]);

    const handleBreadcrumbClick = (route: BreadcrumbRoute) => {
        if (route.path === Path.Main) {
            history.push(Path.Main);
        }
    };

    return (
        <AntHeader className='header'>
            <PageHeader
                className='site-page-header'
                breadcrumb={{
                    routes: breadcrumbRoutes,
                    itemRender: (route) => (
                        <span onClick={() => handleBreadcrumbClick(route)}>
                            {route.breadcrumbName}
                        </span>
                    ),
                }}
            />
            <div className={isWrapperTitleHeader ? 'header__wrapper' : 'header__wrapper_hidden'}>
                <Title className={isTitleHeader ? 'title' : 'hidden'}>
                    Приветствуем тебя в CleverFit — приложении,
                    <br /> которое поможет тебе добиться своей мечты!
                </Title>
                <Button icon={<SettingsIcon />} size='large' className='btn-settings'>
                    Настройки
                </Button>
            </div>
        </AntHeader>
    );
};

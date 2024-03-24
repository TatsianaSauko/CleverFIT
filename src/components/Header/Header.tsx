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
    const [isWrapperTitleHeader, setIsWrapperIsTitleHeader] = useState(false);
    const [breadcrumbRoutes, setBreadcrumbRoutes] = useState<BreadcrumbRoute[]>([]);

    useEffect(() => {
        switch (location.pathname) {
            case Path.Main:
                setIsTitleHeader(true);
                setIsWrapperIsTitleHeader(true);
                setBreadcrumbRoutes([
                    {
                        path: Path.Main,
                        breadcrumbName: 'Главная',
                    },
                ]);
                break;
            case Path.Feedbacks:
                setIsWrapperIsTitleHeader(false);
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
                break;
            case Path.Calendar:
                setIsWrapperIsTitleHeader(true);
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
                break;
            case Path.Profile:
                setIsTitleHeader(false);
                setIsWrapperIsTitleHeader(true);
                setBreadcrumbRoutes([
                    // {
                    //     path: Path.Main,
                    //     breadcrumbName: 'Главная',
                    // },
                    {
                        path: Path.Profile,
                        breadcrumbName: 'Профиль',
                    },
                ]);
                break;
            default:
                setBreadcrumbRoutes([
                    {
                        path: Path.Main,
                        breadcrumbName: 'Главная',
                    },
                ]);
                break;
        }
    }, [location.pathname]);

    const handleBreadcrumbClick = (route: BreadcrumbRoute) => {
        if (route.path === Path.Main) {
            history.push(Path.Main);
        }
    };

    return (
        <AntHeader
            className={!isTitleHeader && isWrapperTitleHeader ? 'header header-profile' : 'header'}
        >
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
                <Button
                    icon={
                        <SettingsIcon
                            style={
                                !isTitleHeader && isWrapperTitleHeader
                                    ? { fontSize: '14px' }
                                    : undefined
                            }
                        />
                    }
                    size={!isTitleHeader && isWrapperTitleHeader ? undefined : 'large'}
                    className={
                        !isTitleHeader && isWrapperTitleHeader
                            ? 'btn-settings btn-settings__profile'
                            : 'btn-settings'
                    }
                >
                    Настройки
                </Button>
            </div>
        </AntHeader>
    );
};

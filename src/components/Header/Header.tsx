import { Layout as AntLayout, Typography, Button, PageHeader } from 'antd';
import { SettingsIcon } from '../../icons';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './header.css';
import { Path } from '@constants/paths';
import { history } from '@redux/configure-store';

const { Header: AntHeader } = AntLayout;

const routes = [
    {
        path: Path.Main,
        breadcrumbName: 'Главная',
    },
    {
        path: Path.Feedbacks,
        breadcrumbName: 'Отзывы пользователей',
    },
];

const { Title } = Typography;

interface BreadcrumbRoute {
    path: string;
    breadcrumbName: string;
}

export const Header = () => {
    const location = useLocation();
    const [isTitleHeader, setIsTitleHeader] = useState(false);
    const [breadcrumbRoutes, setBreadcrumbRoutes] = useState<BreadcrumbRoute[]>([]);

    useEffect(() => {
        if (location.pathname === Path.Main) {
            setIsTitleHeader(true);
            setBreadcrumbRoutes([
                {
                    path: Path.Main,
                    breadcrumbName: 'Главная',
                },
            ]);
        } else if (location.pathname === Path.Feedbacks) {
            setIsTitleHeader(false);
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
            <div className={isTitleHeader ? 'header__wrapper' : 'header__wrapper_hidden'}>
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
};

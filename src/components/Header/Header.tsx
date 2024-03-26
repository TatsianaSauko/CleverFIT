import { Layout as AntLayout, Typography, Button, PageHeader } from 'antd';
import { SettingsIcon } from '../../icons';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Path } from '@constants/paths';
import { history } from '@redux/configure-store';

import './header.css';
import { getTariffList } from '@redux/ActionCreators';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useSelector } from 'react-redux';
import { authSelector } from '@redux/slices/AuthSlice';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Header: AntHeader } = AntLayout;

const { Title } = Typography;

interface BreadcrumbRoute {
    path: string;
    breadcrumbName: string;
}

export const Header = () => {
    const { token } = useSelector(authSelector);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [isTitleHeader, setIsTitleHeader] = useState(false);
    const [isWrapperTitleHeader, setIsWrapperIsTitleHeader] = useState(false);
    const [isButtonBack, setIsButtonBack] = useState(false);
    const [breadcrumbRoutes, setBreadcrumbRoutes] = useState<BreadcrumbRoute[]>([]);

    useEffect(() => {
        switch (location.pathname) {
            case Path.Main:
                setIsTitleHeader(true);
                setIsWrapperIsTitleHeader(true);
                setIsButtonBack(false);
                setBreadcrumbRoutes([
                    {
                        path: Path.Main,
                        breadcrumbName: 'Главная',
                    },
                ]);
                break;
            case Path.Feedbacks:
                setIsWrapperIsTitleHeader(false);
                setIsButtonBack(false);
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
                setIsButtonBack(false);
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
                setIsButtonBack(false);
                setBreadcrumbRoutes([
                    {
                        path: Path.Profile,
                        breadcrumbName: 'Профиль',
                    },
                ]);
                break;
            case Path.Settings:
                setIsTitleHeader(false);
                setIsWrapperIsTitleHeader(false);
                setIsButtonBack(true);
                setBreadcrumbRoutes([]);
                break;
            default:
                break;
        }
    }, [location.pathname]);

    const handleBreadcrumbClick = (route: BreadcrumbRoute) => {
        if (route.path === Path.Main) {
            history.push(Path.Main);
        }
    };

    const handleButtonSettings = () => {
        dispatch(getTariffList(token));
        history.push(Path.Settings);
    };

    return (
        <AntHeader
            className={!isTitleHeader && isWrapperTitleHeader ? 'header header-profile' : 'header'}
        >
            {isButtonBack ? (
                <div data-test-id='settings-back'>
                    <PageHeader
                        data-test-id='settings-back'
                        className='site-page-header'
                        onBack={() => history.back()}
                        title={
                            <div onClick={() => history.back()} className='title-back'>
                                Настройки
                            </div>
                        }
                    />
                </div>
            ) : (
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
            )}
            <div className={isWrapperTitleHeader ? 'header__wrapper' : 'header__wrapper_hidden'}>
                <Title className={isTitleHeader ? 'title' : 'hidden'}>
                    Приветствуем тебя в CleverFit — приложении,
                    <br /> которое поможет тебе добиться своей мечты!
                </Title>
                <Button
                    data-test-id='header-settings'
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
                    onClick={handleButtonSettings}
                >
                    Настройки
                </Button>
            </div>
        </AntHeader>
    );
};

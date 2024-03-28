import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Path } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getTariffList } from '@redux/ActionCreators';
import { history } from '@redux/configure-store';
import { authSelector } from '@redux/slices/AuthSlice';
import { Button, Layout as AntLayout, PageHeader, Typography } from 'antd';

import { SettingsIcon } from '../../icons';

import './header.css';

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
    const shouldChangeFontSize = !isTitleHeader && isWrapperTitleHeader;

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

    const handleBackClick = () => {
        history.back();
    };

    return (
        <AntHeader className={shouldChangeFontSize ? 'header header-profile' : 'header'}>
            {isButtonBack ? (
                <PageHeader
                    className='site-page-header'
                    onBack={handleBackClick}
                    title={
                        <div
                            data-test-id='settings-back'
                            onClick={handleBackClick}
                            className='title-back'
                        >
                            Настройки
                        </div>
                    }
                />
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
                    icon={<SettingsIcon style={shouldChangeFontSize ? { fontSize: '14px' } : {}} />}
                    size={shouldChangeFontSize ? undefined : 'large'}
                    className={
                        shouldChangeFontSize ? 'btn-settings btn-settings__profile' : 'btn-settings'
                    }
                    onClick={handleButtonSettings}
                >
                    Настройки
                </Button>
            </div>
        </AntHeader>
    );
};

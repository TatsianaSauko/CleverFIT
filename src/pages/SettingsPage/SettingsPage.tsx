import { Button, Row, Switch, Tooltip, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import free from '/png/free.png';
import proDisable from '/png/pro-disable.png';
import proActive from '/png/pro-able.png';
import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { userSelector } from '@redux/slices/UserSlice';
import { authSelector, logout } from '@redux/slices/AuthSlice';
import { useState } from 'react';
import { feedback, getFeedback, getUserMe, putUser } from '@redux/ActionCreators';
import { DrawerTariffs } from '@components/DrawerTariffs';
import { PaymentCheckModal } from '@components/PaymentCheckModal';
import { history } from '@redux/configure-store';
import { Path } from '@constants/paths';
import moment from 'moment';
import { useResponsiveVisibility } from '@hooks/useResponsiveVisibility';
import { ModalFeedback } from '@components/ModalFeedback';
import { FormFeedback } from '../../types/Types';
import { ModalFeedbackError } from '@components/ModalFeedbackError';
import { ModalFeedbackSuccess } from '@components/ModalFeedbackSuccess';

import './settingsPage.css';

const { Title } = Typography;

export const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const { user } = useSelector(userSelector);
    const { token } = useSelector(authSelector);
    const [switchReadyForJointTraining, setSwitchReadyForJointTraining] = useState(
        user.readyForJointTraining,
    );
    const [switchSendNotification, setSwitchSendNotification] = useState(user.sendNotification);
    const [switchTheme, setSwitchTheme] = useState(false);
    const [isDrawer, setIsDrawer] = useState(false);
    const [isModalPayment, setIsModalPayment] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const defaultVisibility = window.innerWidth < 576 ? false : true;
    const isWidth = useResponsiveVisibility(defaultVisibility);
    const [isModalGetData, setIsModalGetData] = useState(false);
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    const [isModalError, setIsModalError] = useState(false);

    const switchData = [
        {
            title: 'Открыт для совместных тренировок',
            tooltip: 'включеная функция позволит участвовать в совместных тренировках',
            checked: switchReadyForJointTraining,
            disabled: false,
        },
        {
            title: 'Уведомления',
            tooltip: 'включеная функция позволит получать уведомления об активностях',
            checked: switchSendNotification,
            disabled: false,
        },
        {
            title: 'Тёмная тема',
            tooltip: 'темная тема доступна для PRO tarif',
            checked: switchTheme,
            disabled: !Boolean(user.tariff?.tariffId),
        },
    ];

    const onChange = async (checked: boolean, switchName: string) => {
        switch (switchName) {
            case 'Открыт для совместных тренировок':
                setSwitchReadyForJointTraining(checked);
                let newUser1 = {
                    ...user,
                    readyForJointTraining: checked,
                };
                dispatch(putUser(newUser1, token));
                dispatch(getUserMe(token));
                break;
            case 'Уведомления':
                setSwitchSendNotification(checked);
                let newUser2 = {
                    ...user,
                    sendNotification: checked,
                };

                dispatch(putUser(newUser2, token));
                dispatch(getUserMe(token));
                break;
            case 'Тёмная тема':
                setSwitchTheme(checked);
                break;
            default:
                break;
        }
    };

    const closeDrawer = () => {
        setIsDrawer(false);
    };

    const handleButtonClose = () => {
        dispatch(logout());
        history.push(Path.Auth);
    };

    const handleFeedbackSubmit = async (formData: FormFeedback) => {
        try {
            await dispatch(feedback(formData, token));
            setIsModalSuccess(true);
        } catch {
            setIsModalError(true);
        }
    };
    const handleModalToggle = () => {
        setIsModal(false);
        setIsModalError(false);
        if (isModalGetData) {
            setIsModalGetData(false);
            history.back();
        }
        if (isModalSuccess) {
            setIsModalSuccess(false);
            dispatch(getFeedback({ token: token }));
        }
    };

    const handleCreateFeedback = () => {
        setIsModal(true);
    };

    return (
        <Content className='main main-settings'>
            {isModal && (
                <ModalFeedback
                    isModal={isModal}
                    handleModalToggle={handleModalToggle}
                    handleFeedbackSubmit={handleFeedbackSubmit}
                />
            )}
            {isModalError && (
                <ModalFeedbackError
                    isModalError={isModalError}
                    handleModalToggle={handleModalToggle}
                    handleCreateFeedback={handleCreateFeedback}
                />
            )}
            {isModalSuccess && (
                <ModalFeedbackSuccess
                    isModalSuccess={isModalSuccess}
                    handleModalToggle={handleModalToggle}
                />
            )}
            <DrawerTariffs
                onClose={closeDrawer}
                isDrawer={isDrawer}
                onModalPayment={() => setIsModalPayment(true)}
            />
            <PaymentCheckModal
                visible={isModalPayment}
                onClose={handleButtonClose}
            ></PaymentCheckModal>
            <div className='settings-page'>
                <div>
                    <Title level={4} className='title'>
                        Мой тариф
                    </Title>
                    <div className='tariff__wrapper'>
                        <div className='tariff-card'>
                            <div className='title-card__wrapper'>
                                <Title level={5} className='title-card'>
                                    FREE tarif
                                </Title>
                                <Button
                                    type='link'
                                    className='link'
                                    onClick={() => setIsDrawer(true)}
                                >
                                    Подробнее
                                </Button>
                            </div>
                            <img src={free} alt='tariff' className='icon-tariff' />
                            <div className='status-tariff'>
                                активен
                                <CheckOutlined style={{ paddingLeft: '9.14px' }} />
                            </div>
                        </div>
                        <div className='tariff-card'>
                            <div className='title-card__wrapper'>
                                <Title level={5} className='title-card'>
                                    PRO tarif
                                </Title>
                                <Button
                                    type='link'
                                    className='link'
                                    onClick={() => setIsDrawer(true)}
                                >
                                    Подробнее
                                </Button>
                            </div>
                            <img
                                src={user.tariff?.tariffId ? proActive : proDisable}
                                alt='tariff'
                                className='icon-tariff'
                            />
                            {user.tariff?.tariffId ? (
                                <div className='status-tariff'>
                                    активен
                                    <br />
                                    до {moment(user.tariff?.expired).format('DD.MM')}
                                </div>
                            ) : (
                                <Button size='large' type='primary' className='btn-activate'>
                                    Активировать
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className='switch__wrapper'>
                    {switchData.map((data, index) => (
                        <Row key={index} justify='space-between' align='middle'>
                            <div className={`switch-title ${data.disabled ? 'disabled' : ''}`}>
                                {data.title}
                                <Tooltip placement='bottomLeft' title={data.tooltip}>
                                    <ExclamationCircleOutlined
                                        style={{
                                            paddingLeft: '4px',
                                            color: 'var(--character-light-secondary-45)',
                                            fontSize: '16px',
                                        }}
                                    />
                                </Tooltip>
                            </div>
                            <Switch
                                onChange={(checked) => onChange(checked, data.title)}
                                size={!isWidth ? 'small' : undefined}
                                checked={data.checked}
                                disabled={data.disabled}
                            />
                        </Row>
                    ))}
                </div>
                <div className='settings-button__wrapper'>
                    <Button
                        type='primary'
                        size='large'
                        className='btn-feedback'
                        onClick={handleCreateFeedback}
                    >
                        Написать отзыв
                    </Button>
                    <Button
                        type='link'
                        size='large'
                        className='btn-collapse'
                        onClick={() => history.push(Path.Feedbacks)}
                    >
                        Смотреть все отзывы
                    </Button>
                </div>
            </div>
        </Content>
    );
};

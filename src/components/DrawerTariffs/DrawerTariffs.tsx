import { useSelector } from 'react-redux';
import { Button, Drawer, Row, Space, Radio } from 'antd';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { DrawerTariffProps } from '../../types/Props';
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { useResponsiveWidth } from '@hooks/useResponsiveWidth';
import type { RadioChangeEvent } from 'antd';
import { useState } from 'react';
import { tariffData } from '@constants/tariffData';
import { tariffSelector } from '@redux/slices/TariffSlice';
import { createTariff } from '@redux/ActionCreators';
import { authSelector } from '@redux/slices/AuthSlice';
import { userSelector } from '@redux/slices/UserSlice';
import moment from 'moment';

import './drawerTariffs.css';

export const DrawerTariffs = ({ onClose, isDrawer, onModalPayment }: DrawerTariffProps) => {
    const dispatch = useAppDispatch();
    const { tariffList } = useSelector(tariffSelector);
    const modalWidth = useResponsiveWidth(360, 408);
    const [isDisabled, setIsDisabled] = useState(true);
    const [value, setValue] = useState(undefined);
    const { token } = useSelector(authSelector);
    const { user } = useSelector(userSelector);

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        setIsDisabled(false);
    };

    const handleButtonPay = () => {
        if (value !== undefined) {
            dispatch(
                createTariff(
                    { tariffId: tariffList._id, days: tariffList.periods[value].days },
                    token,
                ),
            );
            onClose();
            onModalPayment();
        }
    };

    return (
        <Drawer
            title='Сравнить тарифы'
            placement='right'
            className='drawer-tariff'
            onClose={onClose}
            open={isDrawer}
            closable={false}
            width={modalWidth}
            extra={
                <Space>
                    <Button
                        icon={
                            <CloseOutlined
                                style={{
                                    color: 'var(--character-light-secondary-45)',
                                    fontSize: '12px',
                                }}
                            />
                        }
                        className='btn-close'
                        onClick={onClose}
                    ></Button>
                </Space>
            }
        >
            <div className='drawer-tariff__wrapper'>
                {user.tariff?.tariffId && (
                    <div className='pro-tariff'>
                        Ваш PRO tarif активен до {moment(user.tariff?.expired).format('DD.MM')}
                    </div>
                )}
                <div className='tariff-info'>
                    <div className='tariff-info__title'>
                        <div className='title-free'>FREE</div>
                        <div className='title-pro'>
                            PRO
                            {user.tariff?.tariffId && (
                                <CheckCircleOutlined
                                    style={{
                                        color: 'var(--character-light-success)',
                                        fontSize: '14px',
                                        paddingLeft: '4px',
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    <div className='tariff-row__wrapper'>
                        {tariffData.map((data, index) => (
                            <Row
                                key={index}
                                justify='space-between'
                                align='middle'
                                style={{ lineHeight: '18.2px' }}
                            >
                                <div className='tariff-row__title'>{data.title}</div>
                                <div className='tariff-row__buttons'>
                                    {data.isAvailableFree ? (
                                        <CheckCircleFilled style={{ fontSize: '18px' }} />
                                    ) : (
                                        <CloseCircleOutlined
                                            style={{
                                                color: 'var(--character-light-disable-25)',
                                                fontSize: '18px',
                                            }}
                                        />
                                    )}
                                    {data.isAvailablePro ? (
                                        <CheckCircleFilled style={{ fontSize: '18px' }} />
                                    ) : (
                                        <CloseCircleOutlined
                                            style={{
                                                color: 'var(--character-light-disable-25)',
                                                fontSize: '18px',
                                            }}
                                        />
                                    )}
                                </div>
                            </Row>
                        ))}
                    </div>
                </div>
                <div>
                    {!user.tariff?.tariffId && (
                        <>
                            <div className='tariff-price__title'>Стоимость тарифа</div>
                            <div className='tariff-price__wrapper'>
                                <Radio.Group onChange={onChange}>
                                    {tariffList.periods.map((period, index) => (
                                        <Row
                                            key={index}
                                            justify='space-between'
                                            align='middle'
                                            style={{ paddingTop: '5px', paddingBottom: '5px' }}
                                        >
                                            <div className='tariff-price__period'>
                                                {period.text}
                                            </div>
                                            <div className='tariff-price__info'>
                                                <div className='price'>{period.cost} $</div>
                                                <Radio value={index} />
                                            </div>
                                        </Row>
                                    ))}
                                </Radio.Group>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {!user.tariff?.tariffId && (
                <div className='drawer-footer'>
                    <Button size='large' disabled={isDisabled} block onClick={handleButtonPay}>
                        Выбрать и оплатить
                    </Button>
                </div>
            )}
        </Drawer>
    );
};

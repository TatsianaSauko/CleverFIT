import { useSelector } from 'react-redux';
import { useResponsiveWidth } from '@hooks/useResponsiveWidth';
import { userSelector } from '@redux/slices/UserSlice';
import { Modal, Typography } from 'antd';

import iconOk from '/png/ok.png';
import { FileSizeExceedModalProps } from '../../types/Props';

import './paymentCheckModal.css';

const { Title, Text } = Typography;

export const PaymentCheckModal = ({ visible, onClose }: FileSizeExceedModalProps) => {
    const modalWidth = useResponsiveWidth(328, 539);
    const { user } = useSelector(userSelector);

    return (
        <Modal
            data-test-id='tariff-modal-success'
            className='modal-payment'
            footer={false}
            centered={true}
            open={visible}
            onCancel={onClose}
            width={modalWidth}
        >
            <div className='modal-payment__content'>
                <div className='block-title__wrapper'>
                    <img src={iconOk} alt='Ok' className='icon-ok' />
                    <div className='block-title'>
                        <Title level={3} className='title'>
                            Чек для оплаты у вас на почте
                        </Title>
                        <Text type='secondary' className='subtitle'>
                            Мы отправили инструкцию для оплаты вам на e-mail{' '}
                            <strong>{user.email}</strong> После подтверждения оплаты войдите
                            в приложение заново.
                        </Text>
                    </div>
                </div>
                <Text type='secondary' className='subtitle subtitle-footer'>
                    Не пришло письмо? Проверьте папку Спам.
                </Text>
            </div>
        </Modal>
    );
};

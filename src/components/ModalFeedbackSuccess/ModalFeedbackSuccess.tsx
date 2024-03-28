import { useResponsiveWidth } from '@hooks/useResponsiveWidth';
import { Button, Modal, Typography } from 'antd';

import success from '/png/success.png';
import { ModalFeedbackSuccessProps } from '../../types/Props';

import './modalFeedbackSuccess.css';

const { Title } = Typography;

export const ModalFeedbackSuccess = ({
    isModalSuccess,
    handleModalToggle,
}: ModalFeedbackSuccessProps) => {
    const modalWidth = useResponsiveWidth(328, 539);

    return (
        <Modal
            className='modal-feedback-success'
            centered={true}
            open={isModalSuccess}
            width={modalWidth}
            onCancel={handleModalToggle}
            footer={null}
        >
            <div className='modal-feedback-success__wrapper'>
                <img src={success} alt='Error' className='icon-success' />
                <Title level={3} className='title'>
                    Отзыв успешно опубликован
                </Title>

                <Button
                    block={true}
                    type='primary'
                    size='large'
                    className='btn'
                    onClick={handleModalToggle}
                >
                    Отлично
                </Button>
            </div>
        </Modal>
    );
};

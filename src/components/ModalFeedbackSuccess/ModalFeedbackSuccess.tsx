import { Button, Modal, Typography } from 'antd';
import { ModalFeedbackSuccessProps } from '../../types/Props';
import { useEffect, useState } from 'react';
import success from '/png/success.png';

import './modalFeedbackSuccess.css';

const { Title } = Typography;

export const ModalFeedbackSuccess = ({
    isModalSuccess,
    handleModalToggle,
}: ModalFeedbackSuccessProps) => {
    const [modalWidth, setModalWidth] = useState(window.innerWidth < 576 ? 328 : 539);

    useEffect(() => {
        const handleResize = () => {
            setModalWidth(window.innerWidth < 576 ? 328 : 539);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Modal
            className='modal-feedback-success'
            centered
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
                    block
                    type='primary'
                    size={'large'}
                    className='btn'
                    onClick={handleModalToggle}
                >
                    Отлично
                </Button>
            </div>
        </Modal>
    );
};

import { useResponsiveWidth } from '@hooks/useResponsiveWidth';
import { Button, Modal, Typography } from 'antd';

import error from '/png/error.png';
import { ModalFeedbackErrorProps } from '../../types/Props';

import './modalFeedbackError.css';

const { Title, Text } = Typography;

export const ModalFeedbackError = ({
    isModalError,
    handleModalToggle,
    handleCreateFeedback,
}: ModalFeedbackErrorProps) => {
    const modalWidth = useResponsiveWidth(328, 539);

    const onClick = () => {
        handleModalToggle();
        handleCreateFeedback();
    };

    return (
        <Modal
            className='modal-feedback-error'
            centered={true}
            open={isModalError}
            width={modalWidth}
            onCancel={handleModalToggle}
            footer={null}
        >
            <div className='modal-feedback-error__wrapper'>
                <img src={error} alt='Error' className='icon-error' />
                <div className='block-title'>
                    <Title level={3} className='title'>
                        Данные не сохранились
                    </Title>
                    <Text type='secondary' className='subtitle'>
                        Что-то пошло не так. Попробуйте ещё раз.
                    </Text>
                </div>
                <div className='buttons'>
                    <Button
                        data-test-id='write-review-not-saved-modal'
                        block={true}
                        type='primary'
                        size='large'
                        className='btn_create-feedback'
                        onClick={onClick}
                    >
                        Написать отзыв
                    </Button>
                    <Button block={true} size='large' className='btn' onClick={handleModalToggle}>
                        Закрыть
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

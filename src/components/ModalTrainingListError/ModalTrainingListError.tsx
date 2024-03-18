import { useEffect, useState } from 'react';
import { Button, Modal, Typography } from 'antd';
import { ModalTrainingListErrorProps } from '../../types/Props';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

import './modalTrainingListError.css';

const { Title, Text } = Typography;

export const ModalTrainingListError = ({
    isModalTrainingList,
    handleModalToggle,
    update,
}: ModalTrainingListErrorProps) => {
    const [modalWidth, setModalWidth] = useState(window.innerWidth < 576 ? 328 : 384);

    useEffect(() => {
        const handleResize = () => {
            setModalWidth(window.innerWidth < 576 ? 328 : 384);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Modal
            className='modal-training-list-error'
            footer={false}
            centered
            open={isModalTrainingList}
            onCancel={handleModalToggle}
            width={modalWidth}
            closeIcon={<CloseOutlined data-test-id='modal-error-user-training-button-close' />}
        >
            <div className='result-training-list-error'>
                <div className='block-title__wrapper'>
                    <CloseCircleOutlined
                        className='icon-result'
                        style={{ color: 'var(--primary-light-6)', fontSize: '24px' }}
                        data-test-id='modal-error-user-training-button-close'
                    />
                    <div className='block-title'>
                        <Title
                            level={5}
                            className='title'
                            data-test-id='modal-error-user-training-title'
                        >
                            При открытии данных <br /> произошла ошибка
                        </Title>
                        <Text
                            type='secondary'
                            className='subtitle'
                            data-test-id='modal-error-user-training-subtitle'
                        >
                            Попробуйте ещё раз.
                        </Text>
                    </div>
                </div>

                <Button
                    type='primary'
                    className='btn-update'
                    onClick={update}
                    data-test-id='modal-error-user-training-button'
                >
                    Обновить
                </Button>
            </div>
        </Modal>
    );
};

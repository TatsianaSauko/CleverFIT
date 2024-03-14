import { Button, Modal, Typography } from 'antd';
import { ModalTrainingListErrorProps } from '../../types/Props';
import icon from '/png/icon-blue.png';
import { useEffect, useState } from 'react';

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
        >
            <div className='result-training-list-error'>
                <div className='block-title__wrapper'>
                    <img src={icon} alt='Error' className='icon-result' />
                    <div className='block-title'>
                        <Title level={5} className='title'>
                            При открытии данных <br /> произошла ошибка
                        </Title>
                        <Text type='secondary' className='subtitle'>
                            Попробуйте ещё раз.
                        </Text>
                    </div>
                </div>

                <Button type='primary' className='btn-update' onClick={update}>
                    Обновить
                </Button>
            </div>
        </Modal>
    );
};

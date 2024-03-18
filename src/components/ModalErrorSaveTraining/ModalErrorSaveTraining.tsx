import { Button, Modal, Typography } from 'antd';
import { ModalErrorSaveTrainingProps } from '../../types/Props';
import { useEffect, useState } from 'react';
import error from '/png/errorEmpty.png';

import './modalErrorSaveTraining.css';

export const ModalErrorSaveTraining = ({
    IsModalErrorSaveTraining,
    handleModalToggle,
}: ModalErrorSaveTrainingProps) => {
    const [modalWidth, setModalWidth] = useState(window.innerWidth < 576 ? 328 : 416);

    useEffect(() => {
        const handleResize = () => {
            setModalWidth(window.innerWidth < 576 ? 328 : 416);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Modal
            className='modal-error-save-training'
            closable={false}
            footer={false}
            centered
            open={IsModalErrorSaveTraining}
            width={modalWidth}
        >
            <div className='result-error'>
                <div className='block-title__wrapper'>
                    <img src={error} alt='Error' className='icon-result' />
                    <div className='block-title'>
                        <div className='title'>При сохранении данных произошла ошибка</div>
                        <div className='subtitle'>Придется попробовать еще раз</div>
                    </div>
                </div>
                <Button
                    type='primary'
                    size={'large'}
                    className='btn-close'
                    onClick={handleModalToggle}
                >
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};

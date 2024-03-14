import { Button, Modal, Typography } from 'antd';
import { ModalErrorProps } from '../../types/Props';
import errorCheckEmail from '/png/errorCheckEmail.png';
import { useEffect, useState } from 'react';

import './modalGetDataError.css';

const { Title, Text } = Typography;

export const ModalGetDataError = ({ isModalGetData, handleModalToggle }: ModalErrorProps) => {
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
        <Modal className='modal-error' centered open={isModalGetData} width={modalWidth}>
            <div className='result-error'>
                <img src={errorCheckEmail} alt='Error' className='icon-result' />
                <div className='block-title'>
                    <Title level={3} className='title'>
                        Что-то пошло не так
                    </Title>
                    <Text type='secondary' className='subtitle'>
                        Произошла ошибка, попробуйте ещё раз.
                    </Text>
                </div>
                <Button
                    type='primary'
                    size={'large'}
                    className='btn-back'
                    onClick={handleModalToggle}
                >
                    Назад
                </Button>
            </div>
        </Modal>
    );
};

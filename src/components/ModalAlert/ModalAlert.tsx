import { Alert } from 'antd';

import { ModalAlertProps } from '../../types/Props';

import './modalAlert.css';

export const ModalAlert = ({ onClose }: ModalAlertProps) => {

    return (
        <div className='alert-wrapper'>
            <Alert
                    data-test-id='alert'
                    className='alert'
                    message='Данные профиля успешно обновлены'
                    type='success'
                    showIcon={true}
                    closable={true}
                    onClose={onClose}
                />
        </div>

    );
};

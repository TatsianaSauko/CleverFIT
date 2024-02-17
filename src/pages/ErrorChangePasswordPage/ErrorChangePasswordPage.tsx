import { Typography, Button } from 'antd';
import error from '/png/error.png';

import './errorChangePasswordPage.css';

const { Title, Text } = Typography;

export const ErrorChangePasswordPage = () => (
    <div className='error-change-password'>
        <div className='error-change-password__content'>
            <img src={error} alt='Error' className='icon-error' />
            <Title level={3} className='title'>
                Данные не сохранились
            </Title>
            <Text type='secondary'>Что-то пошло не так. Попробуйте ещё раз</Text>
            <Button block type='primary' className='btn-repeat'>
                Повторить
            </Button>
        </div>
    </div>
);

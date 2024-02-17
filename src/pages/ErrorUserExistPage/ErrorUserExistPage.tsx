import { Typography, Button } from 'antd';
import error from '/png/error.png';

import './errorUserExistPage.css';

const { Title, Text } = Typography;

export const ErrorUserExistPage = () => (
    <div className='error-user-exist'>
        <div className='error-user-exist__content'>
            <img src={error} alt='Error' className='icon-user-exist-error' />
            <Title level={3} className='title'>
                Данные не сохранились
            </Title>
            <Text type='secondary'>
                Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.
            </Text>
            <Button block type='primary' className='btn-back'>
                Назад к регистрации
            </Button>
        </div>
    </div>
);

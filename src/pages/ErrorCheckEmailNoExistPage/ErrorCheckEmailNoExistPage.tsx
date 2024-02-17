import { Typography, Button } from 'antd';
import error from '/png/error.png';

import './errorCheckEmailNoExistPage.css';

const { Title, Text } = Typography;

export const ErrorCheckEmailNoExistPage = () => (
    <div className='error-email-no-exist'>
        <div className='error-email-no-exist__content'>
            <img src={error} alt='Error' className='icon-error' />
            <Title level={3} className='title'>
                Такой e-mail не зарегистрирован
            </Title>
            <Text type='secondary'>
                Мы не нашли в базе вашего e-mail. Попробуйте войти c другим e-mail.
            </Text>
            <Button type='primary' className='btn-repeat'>
                Попробовать снова
            </Button>
        </div>
    </div>
);

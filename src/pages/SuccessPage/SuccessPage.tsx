import { Typography, Button } from 'antd';
import success from '/png/success.png';

import './successPage.css';

const { Title, Text } = Typography;

export const SuccessPage = () => (
    <div className='success-page'>
        <div className='success-page__content'>
            <img src={success} alt='Error' className='icon-success' />
            <Title level={3} className='title'>
                Регистрация успешна
            </Title>
            <Text type='secondary'>
                Регистрация прошла успешно. Зайдите <br /> в приложение, используя свои e-mail и
                пароль.
            </Text>
            <Button block type='primary' className='btn-login'>
                Войти
            </Button>
        </div>
    </div>
);

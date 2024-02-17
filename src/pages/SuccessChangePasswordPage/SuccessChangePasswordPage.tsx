import { Typography, Button } from 'antd';
import success from '/png/success.png';

import './successChangePasswordPage.css';

const { Title, Text } = Typography;

export const SuccessChangePasswordPage = () => (
    <div className='success-change-password'>
        <div className='success-change-password__content'>
            <img src={success} alt='Error' className='icon-success' />
            <Title level={3} className='title'>
                Пароль успешно изменен
            </Title>
            <Text type='secondary'>
                Теперь можно войти в аккаунт, используя
                <br />
                свой логин и новый пароль
            </Text>
            <Button block type='primary' className='btn-login'>
                Вход
            </Button>
        </div>
    </div>
);

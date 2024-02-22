import { Typography, Button } from 'antd';
import { history } from '@redux/configure-store';
import success from '/png/success.png';

import './successChangePasswordPage.css';

const { Title, Text } = Typography;

export const SuccessChangePasswordPage = () => (
    <div className='success-change-password'>
        <img src={success} alt='Error' className='icon-success' />
        <div className='block-title'>
            <Title level={3} className='title'>
                Пароль успешно изменен
            </Title>
            <Text type='secondary'>
                Теперь можно войти в аккаунт, используя
                <br />
                свой логин и новый пароль
            </Text>
        </div>
        <Button
            block
            type='primary'
            size={'large'}
            className='button'
            onClick={() => history.push('/auth')}
            data-test-id='change-entry-button'
        >
            Вход
        </Button>
    </div>
);

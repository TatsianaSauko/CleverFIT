import { Typography, Button } from 'antd';
import success from '/png/success.png';
import { history } from '@redux/configure-store';
import { Path } from '@constants/paths';

import './SuccessPage.css';

const { Title, Text } = Typography;

export const SuccessPage = () => (
    <div className='success-page'>
        <img src={success} alt='Error' className='icon-success' />
        <div className='block-title'>
            <Title level={3} className='title'>
                Регистрация успешна
            </Title>
            <Text type='secondary'>
                Регистрация прошла успешно. Зайдите <br /> в приложение, используя свои e-mail и
                пароль.
            </Text>
        </div>
        <Button
            block
            type='primary'
            size={'large'}
            className='button'
            onClick={() => history.push(Path.Auth)}
            data-test-id='registration-enter-button'
        >
            Войти
        </Button>
    </div>
);

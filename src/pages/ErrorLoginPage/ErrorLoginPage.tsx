import { Typography, Button } from 'antd';
import triangleError from '/png/triangleError.png';
import { history } from '@redux/configure-store';
import { Path } from '@constants/paths';

import './errorLoginPage.css';

const { Title, Text } = Typography;

export const ErrorLoginPage = () => (
    <div className='error-login'>
        <img src={triangleError} alt='Error' className='icon-error-login' />
        <div className='block-title'>
            <Title level={3} className='title'>
                Вход не выполнен
            </Title>
            <Text type='secondary'>Что-то пошло не так. Попробуйте еще раз</Text>
        </div>
        <Button
            block
            type='primary'
            size={'large'}
            className='button'
            onClick={() => history.push(`${Path.Auth}`)}
            data-test-id='login-retry-button'
        >
            Повторить
        </Button>
    </div>
);

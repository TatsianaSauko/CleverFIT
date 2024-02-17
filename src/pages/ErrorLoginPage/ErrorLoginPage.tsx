import { Typography, Button } from 'antd';
import triangleError from '/png/triangleError.png';

import './errorLoginPage.css';

const { Title, Text } = Typography;

export const ErrorLoginPage = () => (
    <div className='error-login'>
        <div className='error-login__content'>
            <img src={triangleError} alt='Error' className='icon-error-login' />
            <Title level={3} className='title'>
                Вход не выполнен
            </Title>
            <Text type='secondary'>Что-то пошло не так. Попробуйте еще раз</Text>
            <Button block type='primary' className='btn-repeat'>
                Повторить
            </Button>
        </div>
    </div>
);

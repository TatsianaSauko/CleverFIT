import { Typography, Button } from 'antd';
import errorCheckEmail from '/png/errorCheckEmail.png';

import './errorCheckEmailPage.css';

const { Title, Text } = Typography;

export const ErrorCheckEmailPage = () => (
    <div className='error-check-email'>
        <div className='error-check-email__content'>
            <img src={errorCheckEmail} alt='Error' className='icon-error' />
            <Title level={3} className='title'>
                Что-то пошло не так
            </Title>
            <Text type='secondary'>Произошла ошибка, попробуйте отправить форму ещё раз.</Text>
            <Button type='primary' className='btn-back'>
                Назад
            </Button>
        </div>
    </div>
);

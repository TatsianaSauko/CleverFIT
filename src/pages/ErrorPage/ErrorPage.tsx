import { Typography, Button } from 'antd';
import error from '/png/error.png';

import './errorPage.css';

const { Title, Text } = Typography;

export const ErrorPage = () => (
    <div className='error-page'>
        <div className='error-page__content'>
            <img src={error} alt='Error' className='icon-error' />
            <Title level={3} className='title'>
                Данные не сохранились
            </Title>
            <Text type='secondary'>
                Что-то пошло не так и ваша регистрация <br /> не завершилась. Попробуйте ещё раз.
            </Text>
            <Button block type='primary' className='btn-repeat'>
                Повторить
            </Button>
        </div>
    </div>
);

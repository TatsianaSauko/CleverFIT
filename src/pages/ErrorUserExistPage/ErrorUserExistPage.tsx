import { Typography, Button } from 'antd';

import error from '/png/error.png';

import './errorUserExistPage.css';
// import { history } from '@redux/configure-store';

const { Title, Text } = Typography;

export const ErrorUserExistPage = () => {
    return (
        <div className='error-user-exist'>
            <img src={error} alt='Error' className='icon-user-exist-error' />
            <div>
                <Title level={3} className='title'>
                    Данные не сохранились
                </Title>
                <Text type='secondary'>
                    Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому
                    e-mail.
                </Text>
            </div>
            <Button
                block
                type='primary'
                size={'large'}
                className='button'
                onClick={() => history.back()}
                data-test-id='registration-back-button'
            >
                Назад к регистрации
            </Button>
        </div>
    );
};

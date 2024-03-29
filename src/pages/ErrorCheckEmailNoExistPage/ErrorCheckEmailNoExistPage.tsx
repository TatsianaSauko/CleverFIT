import { Button, Typography } from 'antd';

import error from '/png/error.png';

import './errorCheckEmailNoExistPage.css';

const { Title, Text } = Typography;

export const ErrorCheckEmailNoExistPage = () => (
    <div className='error-email-no-exist'>
        <img src={error} alt='Error' className='icon-error' />
        <div className='block-title'>
            <Title level={3} className='title'>
                Такой e-mail не зарегистрирован
            </Title>
            <Text type='secondary' className='subtitle'>
                Мы не нашли в базе вашего e-mail. Попробуйте войти c другим e-mail.
            </Text>
        </div>

        <Button
            type='primary'
            size='large'
            className='button'
            onClick={() => history.back()}
            data-test-id='check-retry-button'
        >
            Попробовать снова
        </Button>
    </div>
);

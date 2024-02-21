import { Typography, Button } from 'antd';
import error from '/png/error.png';

import './errorCheckEmailNoExistPage.css';
// import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
// import { back } from 'redux-first-history/build/es6/actions';

const { Title, Text } = Typography;

export const ErrorCheckEmailNoExistPage = () => {
    // const dispatch = useAppDispatch()
    return (
        <div className='error-email-no-exist'>
            <img src={error} alt='Error' className='icon-error' />
            <div>
                <Title level={3} className='title'>
                    Такой e-mail не зарегистрирован
                </Title>
                <Text type='secondary' className='subtitle'>
                    Мы не нашли в базе вашего e-mail. Попробуйте войти c другим e-mail.
                </Text>
            </div>

            <Button
                type='primary'
                size={'large'}
                className='button'
                onClick={() => history.back()}
                data-test-id='check-retry-button'
            >
                Попробовать снова
            </Button>
        </div>
    );
};

import { Typography, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { register } from '@redux/ActionCreators';
import error from '/png/error.png';

import './errorPage.css';

const { Title, Text } = Typography;

export const ErrorPage = () => {
    const { email, password } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const onClick = async () => {
        history.back();
        await dispatch(register({ email: email, password: password }));
    };

    return (
        <div className='error-page'>
            <img src={error} alt='Error' className='icon-error' />
            <div className='block-title'>
                <Title level={3} className='title'>
                    Данные не сохранились
                </Title>
                <Text type='secondary'>
                    Что-то пошло не так и ваша регистрация <br /> не завершилась. Попробуйте ещё
                    раз.
                </Text>
            </div>

            <Button
                block
                type='primary'
                size={'large'}
                className='button'
                onClick={onClick}
                data-test-id='registration-retry-button'
            >
                Повторить
            </Button>
        </div>
    );
};

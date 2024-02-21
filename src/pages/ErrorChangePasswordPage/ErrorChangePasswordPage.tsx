import { Typography, Button } from 'antd';
import error from '/png/error.png';

import './errorChangePasswordPage.css';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changePassword } from '@redux/ActionCreators';

const { Title, Text } = Typography;

export const ErrorChangePasswordPage = () => {
    const dispatch = useAppDispatch();
    const { password } = useAppSelector((state) => state.auth);
    const onClick = async () => {
        console.log('password: errorChangePassword', password);
        await dispatch(changePassword({ password: password, confirmPassword: password }));
        history.back();
    };
    return (
        <div className='error-change-password'>
            <img src={error} alt='Error' className='icon-error' />
            <div>
                <Title level={3} className='title'>
                    Данные не сохранились
                </Title>
                <Text type='secondary'>Что-то пошло не так. Попробуйте ещё раз</Text>
            </div>
            <Button
                block
                size={'large'}
                type='primary'
                className='button'
                onClick={onClick}
                data-test-id='change-retry-button'
            >
                Повторить
            </Button>
        </div>
    );
};

import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { changePassword } from '@redux/ActionCreators';
import { authSelector } from '@redux/slices/AuthSlice';
import { Button, Typography } from 'antd';

import error from '/png/error.png';

import './errorChangePasswordPage.css';

const { Title, Text } = Typography;

export const ErrorChangePasswordPage = () => {
    const dispatch = useAppDispatch();
    const { password } = useSelector(authSelector);
    const onClick = async () => {
        history.back();
        await dispatch(changePassword({ password, confirmPassword: password }));
    };

    return (
        <div className='error-change-password'>
            <img src={error} alt='Error' className='icon-error' />
            <div className='block-title'>
                <Title level={3} className='title'>
                    Данные не сохранились
                </Title>
                <Text type='secondary'>Что-то пошло не так. Попробуйте ещё раз</Text>
            </div>
            <Button
                block={true}
                size='large'
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

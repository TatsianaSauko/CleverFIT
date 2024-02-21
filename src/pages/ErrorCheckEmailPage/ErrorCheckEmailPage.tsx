import { Typography, Button } from 'antd';
import errorCheckEmail from '/png/errorCheckEmail.png';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { checkEmail } from '@redux/ActionCreators';

import './errorCheckEmailPage.css';
import { history } from '@redux/configure-store';

const { Title, Text } = Typography;

const onClick = () => {
    const dispatch = useAppDispatch();
    const { email } = useAppSelector((state) => state.auth);
    dispatch(checkEmail({ email }));
    // dispatch(back());
    history.back();
};

export const ErrorCheckEmailPage = () => (
    <div className='error-check-email'>
        <img src={errorCheckEmail} alt='Error' className='icon-error' />
        <div>
            <Title level={3} className='title'>
                Что-то пошло не так
            </Title>
            <Text type='secondary'>Произошла ошибка, попробуйте отправить форму ещё раз.</Text>
        </div>
        <Button
            type='primary'
            size={'large'}
            className='button'
            onClick={onClick}
            data-test-id='check-back-button'
        >
            Назад
        </Button>
    </div>
);

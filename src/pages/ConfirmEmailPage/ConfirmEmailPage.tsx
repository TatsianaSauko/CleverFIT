import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import { Loader } from '@components/Loader';
import { Path } from '@constants/paths';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { confirmEmail } from '@redux/ActionCreators';
import { history } from '@redux/configure-store';
import { authSelector } from '@redux/slices/AuthSlice';
import { Typography } from 'antd';

import suggested from '/png/suggested.png';

import './confirmEmailPage.css';

const { Title, Text } = Typography;

export const ConfirmEmailPage = () => {
    const location = useLocation();
    const { loading } = useSelector(authSelector);
    const [inputKey, setInputKey] = useState(Math.random());
    const [isCodeCorrect, setIsCodeCorrect] = useState(true);
    const dispatch = useAppDispatch();
    const { email } = useAppSelector((state) => state.auth);
    const handleVerificationComplete = async (code: string) => {
        await dispatch(confirmEmail({ email, code })).catch(() => {
            setIsCodeCorrect(false);
            setInputKey(Math.random());
        });
    };

    useEffect(() => {
        if (location.key === 'default') {
            history.push(Path.Auth);
        }
    }, []);

    return (
        <div className='config-email'>
            {loading && <Loader />}
            <div className='config-email__content'>
                <img src={suggested} alt='Error' className='icon-suggested' />
                <Title level={3} className='title'>
                    Введите код <br /> для восстановления аккауанта
                </Title>
                <Text type='secondary'>
                    `Мы отправили вам на e-mail <b>{email}</b>
                    <br /> шестизначный код. Введите его в поле ниже.`
                </Text>
                <div>
                    <VerificationInput
                        key={String(inputKey)}
                        inputProps={{ 'data-test-id': 'verification-input' }}
                        onComplete={handleVerificationComplete}
                        placeholder=''
                        length={6}
                        classNames={{
                            container: 'container',
                            character: `character ${isCodeCorrect ? '' : 'character_error'}`,
                            characterInactive: 'character--inactive',
                        }}
                    />
                </div>
                <Text type='secondary' className='subtitle'>
                    He пришло письмо? Проверьте папку Спам.
                </Text>
            </div>
        </div>
    );
};

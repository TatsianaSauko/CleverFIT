import { Typography, Button, Form, Input } from 'antd';
import './changePasswordPage.css';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changePassword } from '@redux/ActionCreators';
import { setPassword } from '@redux/slices/AuthSlice';
import { useEffect } from 'react';
import { history } from '@redux/configure-store';
import { Loader } from '@components/Loader';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

export const ChangePasswordPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { loading } = useAppSelector((state) => state.auth);

    const onFinish = async (values: any) => {
        await dispatch(
            changePassword({ password: values.password, confirmPassword: values.confirmPassword }),
        );
        dispatch(setPassword({ password: values.password }));
    };

    useEffect(() => {
        if (location.key === 'default') {
            history.push('/auth');
        }
    }, []);

    return (
        <div className='change-password'>
            {loading && <Loader />}
            <div className='change-password__content'>
                <Title level={3} className='title'>
                    Восстановление аккауанта
                </Title>
                <Form name='change-password' className='change-password-form' onFinish={onFinish}>
                    <Form.Item
                        name='password'
                        data-test-id='change-password'
                        help='Пароль не менее 8 символов, c заглавной буквой и цифрой'
                        rules={[
                            {
                                required: true,
                                message: '',
                                min: 8,
                            },
                            () => ({
                                validator(_, value) {
                                    const hasUppercase = /[A-Z]/.test(value);
                                    const hasDigit = /\d/.test(value);
                                    const hasSpecialCharacter =
                                        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
                                    if (hasUppercase && hasDigit && !hasSpecialCharacter) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(''));
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder='Новый пароль' />
                    </Form.Item>
                    <Form.Item
                        name='confirmPassword'
                        data-test-id='change-confirm-password'
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder='Повторить пароль' />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='primary'
                            size={'large'}
                            block
                            className='btn-save'
                            htmlType='submit'
                            data-test-id='change-submit-button'
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

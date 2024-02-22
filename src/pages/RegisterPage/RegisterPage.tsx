import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { register } from '@redux/ActionCreators';
import { setEmail, setPassword } from '@redux/slices/AuthSlice';
import { useForm } from 'antd/lib/form/Form';
import { FormRegister } from '../../types/Auth.interface';
import IconG from '/png/Icon-G+.png';

import './registerPage.css';

export const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const [form] = useForm();
    const [isDisabled, setIsDisabled] = useState(true);
    const onFinish = async (values: FormRegister) => {
        dispatch(setEmail({ email: values.email }));
        dispatch(setPassword({ password: values.password }));
        await dispatch(register({ email: values.email, password: values.password }));
    };

    const handleFormChange = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setIsDisabled(hasErrors);
    };
    return (
        <div className='register-page'>
            <Form
                name='register'
                className='register-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFieldsChange={handleFormChange}
                form={form}
            >
                <Form.Item
                    name={['email']}
                    rules={[
                        {
                            type: 'email',
                            message: '',
                        },
                        {
                            required: true,
                            message: 'Введите валидный E-mail',
                        },
                    ]}
                >
                    <Input addonBefore='e-mail:' data-test-id='registration-email' />
                </Form.Item>
                <Form.Item
                    name='password'
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
                                return Promise.reject(
                                    new Error(
                                        'Пароль не менее 8 символов, c заглавной буквой и цифрой',
                                    ),
                                );
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='Пароль' data-test-id='registration-password' />
                </Form.Item>
                <Form.Item
                    name='confirm'
                    key='confirm'
                    dependencies={['password']}
                    hasFeedback
                    data-test-id='registration-confirm-password'
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
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        size={'large'}
                        block
                        htmlType='submit'
                        disabled={isDisabled}
                        className='register-form-button'
                        data-test-id='registration-submit-button'
                    >
                        Войти
                    </Button>
                </Form.Item>
                <Button block size={'large'} className='btn_register-for-google'>
                    <img src={IconG} alt='G+' className='icon-G icon-hidden' />
                    Регистрация через Google
                </Button>
            </Form>
        </div>
    );
};

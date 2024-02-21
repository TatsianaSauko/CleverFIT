import { Button, Checkbox, Form, Input } from 'antd';
import './loginPage.css';
import IconG from '/png/Icon-G+.png';
import { checkEmail, login } from '@redux/ActionCreators';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useEffect, useState } from 'react';
import { setEmail } from '@redux/slices/AuthSlice';
import { FieldData } from 'rc-field-form/lib/interface';
import { useForm } from 'antd/lib/form/Form';

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const [form] = useForm();
    const { email } = useAppSelector((state) => state.auth);
    const [isDisabled, setIsDisabled] = useState(true);
    const [emailValue, setEmailValue] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    useEffect(() => {
        if (isEmailValid) {
            dispatch(setEmail({ email: emailValue }));
        }
    }, [isEmailValid]);

    const onFinish = async (values: any) => {
        await dispatch(login(values));
    };

    const handleForgotPassword = async () => {
        await dispatch(checkEmail({ email: email }));
    };

    const handleFieldsChange = (changedFields: FieldData[]) => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setIsDisabled(hasErrors);
        if (changedFields[0]?.name[0] === 'email') {
            setEmailValue(changedFields[0]?.value);
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            setIsEmailValid(emailRegex.test(emailValue));
        }
    };

    return (
        <div className='login-page'>
            <Form
                name='normal_login'
                className='login-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFieldsChange={(changedFields, _): void => {
                    handleFieldsChange(changedFields);
                }}
                form={form}
            >
                <Form.Item
                    name={['email']}
                    data-test-id='login-email'
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
                    <Input addonBefore='e-mail:' />
                </Form.Item>

                <Form.Item
                    name='password'
                    data-test-id='login-password'
                    rules={[
                        {
                            required: true,
                            message: '',
                            min: 8,
                        },
                        {
                            validator(_, value) {
                                const hasUppercase = /[A-Z]/.test(value);
                                const hasDigit = /\d/.test(value);
                                if (hasUppercase && hasDigit) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        'Пароль не менее 8 символов, c заглавной буквой и цифрой',
                                    ),
                                );
                            },
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='Пароль' />
                </Form.Item>
                <Form.Item>
                    <Form.Item
                        name='remember'
                        valuePropName='checked'
                        noStyle
                        className='login-form_login-form'
                        data-test-id='login-remember'
                    >
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>

                    <Button
                        type='link'
                        className='login-form_forgot'
                        disabled={!isEmailValid}
                        data-test-id='login-forgot-button'
                        onClick={handleForgotPassword}
                    >
                        Забыли пароль?
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button
                        type='primary'
                        size={'large'}
                        block
                        disabled={isDisabled}
                        htmlType='submit'
                        className='login-form-button'
                        data-test-id='login-submit-button'
                    >
                        Войти
                    </Button>
                </Form.Item>
                <Button size={'large'} block className='btn_register-for-google'>
                    <img src={IconG} alt='G+' className='icon-G icon-hidden' />
                    Войти через Google
                </Button>
            </Form>
        </div>
    );
};

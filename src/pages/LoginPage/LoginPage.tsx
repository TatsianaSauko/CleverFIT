import { useEffect, useState } from 'react';
import { BaseUrl, Endpoints } from '@constants/api';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { checkEmail, login } from '@redux/ActionCreators';
import { setEmail } from '@redux/slices/AuthSlice';
import { emailRules } from '@utils/emailRules';
import { passwordRules } from '@utils/passwordRules';
import { Button, Checkbox, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FieldData } from 'rc-field-form/lib/interface';

import IconG from '/png/Icon-G+.png';
import { ILogin } from '../../types/Types';

import './loginPage.css';

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const [form] = useForm();
    const [emailValue, setEmailValue] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isCheckbox, setIsCheckbox] = useState(false);

    useEffect(() => {
        if (isEmailValid) {
            dispatch(setEmail({ email: emailValue }));
        }
    }, [isEmailValid]);

    const onFinish = async (values: ILogin) => {
        values.remember = isCheckbox;
        await dispatch(login(values));
    };

    const handleForgotPassword = async () => {
        if (isEmailValid) {
            await dispatch(checkEmail({ email: emailValue }));
        }
    };

    const handleFieldsChange = (changedFields: FieldData[]) => {
        if (changedFields[0]?.name[0] === 'email') {
            setEmailValue(changedFields[0]?.value);
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

            setIsEmailValid(emailRegex.test(emailValue));
        }
    };

    const handleEnterGoogle = () => {
        window.location.href = `${BaseUrl}${Endpoints.AuthGoogle}`;
    };

    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        setIsCheckbox(e.target.checked);
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
                <Form.Item name={['email']} rules={emailRules}>
                    <Input addonBefore='e-mail:' data-test-id='login-email' />
                </Form.Item>

                <Form.Item name='password' rules={passwordRules}>
                    <Input.Password placeholder='Пароль' data-test-id='login-password' />
                </Form.Item>
                <Form.Item>
                    <Form.Item name='remember' noStyle={true} className='login-form_login-form'>
                        <Checkbox
                            data-test-id='login-remember'
                            checked={isCheckbox}
                            onChange={onChangeCheckbox}
                        >
                            Запомнить меня
                        </Checkbox>
                    </Form.Item>

                    <Button
                        type='link'
                        className='login-form_forgot'
                        data-test-id='login-forgot-button'
                        onClick={handleForgotPassword}
                    >
                        Забыли пароль?
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button
                        type='primary'
                        size='large'
                        block={true}
                        htmlType='submit'
                        className='login-form-button'
                        data-test-id='login-submit-button'
                    >
                        Войти
                    </Button>
                </Form.Item>
                <Button
                    size='large'
                    block={true}
                    className='btn_register-for-google'
                    onClick={handleEnterGoogle}
                >
                    <img src={IconG} alt='G+' className='icon-G icon-hidden' />
                    Войти через Google
                </Button>
            </Form>
        </div>
    );
};

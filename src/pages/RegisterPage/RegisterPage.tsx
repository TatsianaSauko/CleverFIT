import { useState } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { register } from '@redux/ActionCreators';
import { setEmail, setPassword } from '@redux/slices/AuthSlice';
import { confirmPasswordRules } from '@utils/confirmPsswordRules';
import { emailRules } from '@utils/emailRules';
import { passwordRules } from '@utils/passwordRules';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import IconG from '/png/Icon-G+.png';
import { FormRegister } from '../../types/Types';

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
                <Form.Item name={['email']} rules={emailRules}>
                    <Input addonBefore='e-mail:' data-test-id='registration-email' />
                </Form.Item>
                <Form.Item
                    name='password'
                    help='Пароль не менее 8 символов, c заглавной буквой и цифрой'
                    rules={passwordRules}
                >
                    <Input.Password placeholder='Пароль' data-test-id='registration-password' />
                </Form.Item>
                <Form.Item
                    name='confirm'
                    key='confirm'
                    dependencies={['password']}
                    hasFeedback={true}
                    data-test-id='registration-confirm-password'
                    rules={confirmPasswordRules}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        size='large'
                        block={true}
                        htmlType='submit'
                        disabled={isDisabled}
                        className='register-form-button'
                        data-test-id='registration-submit-button'
                    >
                        Войти
                    </Button>
                </Form.Item>
                <Button block={true} size='large' className='btn_register-for-google'>
                    <img src={IconG} alt='G+' className='icon-G icon-hidden' />
                    Регистрация через Google
                </Button>
            </Form>
        </div>
    );
};

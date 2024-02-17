import { Button, Checkbox, Form, Input } from 'antd';
import './loginPage.css';
import { NavLink } from 'react-router-dom';
import IconG from '/png/Icon-G+.png';

export const LoginPage = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className='login-page'>
            <Form
                name='normal_login'
                className='login-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name={['user', 'email']}
                    label='e-mail:'
                    rules={[
                        {
                            type: 'email',
                            message: '',
                        },
                        {
                            required: true,
                            message: '',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='password'
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
                                if (hasUppercase && hasDigit) {
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
                    <Input.Password placeholder='Пароль' />
                </Form.Item>
                <Form.Item>
                    <Form.Item
                        name='remember'
                        valuePropName='checked'
                        noStyle
                        className='login-form_login-form'
                    >
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>

                    <NavLink className='login-form_forgot' to='/auth/forgot'>
                        Забыли пароль?
                    </NavLink>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' block htmlType='submit' className='login-form-button'>
                        Войти
                    </Button>
                </Form.Item>
                <Button block className='btn_register-for-google'>
                    <img src={IconG} alt='G+' className='icon-G icon-hidden' />
                    Войти через Google
                </Button>
            </Form>
        </div>
    );
};

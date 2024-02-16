import { Button, Form, Input } from 'antd';
import IconG from '/png/Icon-G+.png';

import './registerPage.css';

export const RegisterPage = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className='register-page'>
            <Form
                name='normal_login'
                className='register-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name={['user', 'email']}
                    label='e-mail:'
                    rules={[
                        {
                            type: 'email',
                            message: 'Введите корректный адрес электронной почты!',
                        },
                        {
                            required: true,
                            message: 'Обязательное поле!',
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
                            message: 'Пароль не менее 8 символов, c заглавной буквой и цифрой',
                            min: 8,
                        },
                        () => ({
                            validator(_, value) {
                                const hasUppercase = /[A-Z]/.test(value);
                                const hasDigit = /\d/.test(value);
                                if (hasUppercase && hasDigit) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(''));
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='Пароль' />
                </Form.Item>
                <Form.Item
                    name='confirm'
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('Два введенных вами пароля не совпадают!'),
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' block htmlType='submit' className='register-form-button'>
                        Войти
                    </Button>
                </Form.Item>
                <Button block className='btn_register-for-google'>
                    <img src={IconG} alt='G+' className='icon-G icon-hidden' />
                    Регистрация через Google
                </Button>
            </Form>
        </div>
    );
};

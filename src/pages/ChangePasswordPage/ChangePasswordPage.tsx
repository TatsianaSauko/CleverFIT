import { Typography, Button, Form, Input } from 'antd';
import './changePasswordPage.css';

const { Title } = Typography;

export const ChangePasswordPage = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div className='change-password'>
            <div className='change-password__content'>
                <Title level={3} className='title'>
                    Восстановление аккауанта
                </Title>
                <Form
                    name='normal_login'
                    className='change-password-form'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='password'
                        extra='Пароль не менее 8 символов, c заглавной буквой и цифрой'
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
                        <Button type='primary' block className='btn-save'>
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

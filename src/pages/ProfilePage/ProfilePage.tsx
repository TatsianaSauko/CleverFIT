import { Alert, Button, DatePicker, Form, Input, Modal, Progress, Typography } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload';
import { useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { useSelector } from 'react-redux';
import { userSelector } from '@redux/slices/UserSlice';
import type { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { authSelector } from '@redux/slices/AuthSlice';
import { putUser, uploadImg } from '@redux/ActionCreators';
import { FileSizeExceedModal } from '@components/FileSizeExceedModal';
import { useForm } from 'antd/lib/form/Form';
import { FormUser } from '../../types/Types';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { ImgUrL } from '@constants/api';
import { ModalErrorSaveData } from '@components/ModalErrorSaveData';
import { useResponsiveVisibility } from '@hooks/useResponsiveVisibility';

import './profilePage.css';

const { Title } = Typography;

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const { user } = useSelector(userSelector);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>(
        user.imgSrc
            ? [
                  {
                      uid: '-1',
                      name: 'userImage.jpg',
                      status: 'done',
                      url: user.imgSrc,
                  },
              ]
            : [],
    );
    const [modalVisible, setModalVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isPasswordEntered, setIsPasswordEntered] = useState(false);
    const [form] = useForm();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [modalVisibleSaveData, setModalVisibleSaveData] = useState(false);
    const defaultVisibility = window.innerWidth < 576 ? false : true;
    const width = useResponsiveVisibility(defaultVisibility);
    const { token } = useSelector(authSelector);

    const uploadButton = (
        <>
            <div className='upload-button'>
                <PlusOutlined />
                <div
                    style={{
                        width: '70px',
                        lineHeight: '18.2px',
                        color: 'var(--character-light-secondary-45)',
                    }}
                >
                    Загрузить фото профиля
                </div>
            </div>
            <div className='upload-button-mobile'>
                <div className='title'>Загрузить фото профиля</div>
                <Button icon={<UploadOutlined />}>Загрузить</Button>
            </div>
        </>
    );

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleCancel = () => setPreviewOpen(false);

    const customRequest = async (options: RcCustomRequestOptions) => {
        const { file } = options;

        try {
            setLoading(true);
            const response = await uploadImg(file as RcFile, token);
            const updatedFile: UploadFile<RcFile> = {
                ...(file as UploadFile<RcFile>),
                url: `${ImgUrL}${response.data.url}`,
            };
            setIsDisabled(false);
            setFileList([updatedFile]);
            setLoading(false);
        } catch {
            setLoading(false);
            setModalVisible(true);
            setFileList([
                {
                    uid: '-5',
                    name: 'image.png',
                    status: 'error',
                },
            ]);
        }
    };
    
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    };

    const handleFormChange = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setIsDisabled(hasErrors);
    };

    const onFinish = async (values: FormUser) => {
        delete values.confirm;
        values = Object.fromEntries(
            Object.entries(values).filter(([_, value]) => value !== undefined && value !== ''),
        ) as FormUser;
        if (fileList.length && fileList[0].url) {
            values.imgSrc = fileList[0].url;
        }
        try {
            await dispatch(putUser(values, token));
            setShowSuccessMessage(true);
            form.resetFields();
            setIsDisabled(true);
            setIsPasswordEntered(false);
        } catch {
            setModalVisibleSaveData(true);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPasswordEntered(e.target.value.trim().length > 0);
    };

    return (
        <Content className='main profile-mobile'>
            {showSuccessMessage ? (
                <Alert
                    data-test-id='alert'
                    className='alert'
                    message='Данные профиля успешно обновлены'
                    type='success'
                    showIcon
                    closable
                    onClose={() => setShowSuccessMessage(false)}
                />
            ) : null}
            <ModalErrorSaveData
                visible={modalVisibleSaveData}
                onClose={() => setModalVisibleSaveData(false)}
            ></ModalErrorSaveData>
            <FileSizeExceedModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            ></FileSizeExceedModal>
            <Form
                className='profile-page'
                size='large'
                onFinish={onFinish}
                onFieldsChange={handleFormChange}
                form={form}
                initialValues={{ email: user.email }}
            >
                <Title level={5} className='title'>
                    Личная информация
                </Title>
                <div className='info-user__wrapper'>
                    <div data-test-id='profile-avatar'>
                        <Upload
                            name='avatar'
                            listType={width ? 'picture-card' : 'picture'}
                            className='avatar-uploader'
                            fileList={fileList}
                            onPreview={handlePreview}
                            customRequest={customRequest}
                            onRemove={handleRemove}
                        >
                            {loading ? (
                                <Progress percent={50} size='small' showInfo={false} />
                            ) : fileList.length === 0 ? (
                                uploadButton
                            ) : null}
                        </Upload>
                    </div>

                    <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img alt='example' style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    <div className='info-user__form'>
                        <Form.Item name='firstName' className='name'>
                            <Input placeholder='Имя' data-test-id='profile-name' />
                        </Form.Item>
                        <Form.Item name='lastName' className='surname'>
                            <Input placeholder='Фамилия' data-test-id='profile-surname' />
                        </Form.Item>

                        <Form.Item name='birthday' className='data-picker'>
                            <DatePicker
                                placeholder='Дата рождения'
                                format='DD.MM.YYYY'
                                data-test-id='profile-birthday'
                            />
                        </Form.Item>
                    </div>
                </div>
                <Title level={5} className='title  title-private'>
                    Приватность и авторизация
                </Title>
                <div className='private-info__form'>
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
                        <Input addonBefore='e-mail:' data-test-id='profile-email' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        help='Пароль не менее 8 символов, c заглавной буквой и цифрой'
                        rules={[
                            {
                                required: isPasswordEntered,
                                message: '',
                                min: 8,
                            },
                            () => ({
                                validator(_, value) {
                                    if (!value) {
                                        return Promise.resolve();
                                    }
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
                    >
                        <Input.Password
                            placeholder='Пароль'
                            onChange={handlePasswordChange}
                            data-test-id='profile-password'
                        />
                    </Form.Item>
                    <Form.Item
                        name='confirm'
                        key='confirm'
                        dependencies={['password']}
                        rules={[
                            {
                                required: isPasswordEntered,
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
                        <Input.Password
                            placeholder='Повторите пароль'
                            data-test-id='profile-repeat-password'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            data-test-id='profile-submit'
                            size='large'
                            htmlType='submit'
                            disabled={
                                isDisabled ||
                                (fileList.length > 0 && fileList[0].status === 'error')
                            }
                            className='btn-save'
                        >
                            Сохранить изменения
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Content>
    );
};

import { useState } from 'react';
import { Typography } from 'antd';
import VerificationInput from 'react-verification-input';
import suggested from '/png/suggested.png';

import './configEmailPage.css';

const { Title, Text } = Typography;

export const ConfigEmailPage = () => {
    const [isCodeCorrect, setIsCodeCorrect] = useState(true);
    const handleVerificationComplete = (code: string) => {
        console.log(code);
        const correctCode = '123456';
        setIsCodeCorrect(code === correctCode);
    };

    return (
        <div className='config-email'>
            <div className='config-email__content'>
                <img src={suggested} alt='Error' className='icon-suggested' />
                <Title level={3} className='title'>
                    Введите код <br /> для восстановления аккауанта
                </Title>
                <Text type='secondary'>
                    Мы отправили вам на e-mail<b> victorbyden@gmail.com</b>
                    <br /> шестизначный код. Введите eгo в поле ниже.
                </Text>
                <div>
                    <VerificationInput
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

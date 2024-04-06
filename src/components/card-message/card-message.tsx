import { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { ModalInfoUserTraining } from '@components/modal-info-user-training';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { putInvite } from '@redux/action-creators';
import { authSelector } from '@redux/slices/auth-slice';
import { Avatar, Button } from 'antd';
import moment from 'moment';

import { Invite } from '../../types/types';

import './card-message.css';


export const CardMessage = ({item }:{item: Invite}) => {
    const { token } = useSelector(authSelector);
    const dispatch = useAppDispatch();
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [isModal, setIsModal] = useState(false);

    const handleButtonTrainTogether = async() => {
        const data = {
            id: item._id,
            status: 'accepted'
        }

        await dispatch(putInvite(token, data))
    }

    const handleButtonReject = async() => {
        const data = {
            id: item._id,
            status: 'rejected'
        }

        await dispatch(putInvite(token, data))
    }

    const handleShowDetailsTraining = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect();

        setModalPosition({
            top: rect.top,
            left: rect.left,
        });
        setIsModal(true);

    }

    const handleButtonClose = () => {
        setIsModal(false);
    }

    return(
    <div className='card-message'>
        {isModal &&
                <ModalInfoUserTraining
                    closeClick={handleButtonClose}
                    position={modalPosition}
                    item={item}
                />}
        <div className='card-message__info-author'>
        {item.from.imageSrc
            ? <Avatar src={item.from.imageSrc} size="large" style={{width: '42px', height: '42px'}}/>
            : <Avatar icon={<UserOutlined />} size="large" style={{width: '42px', height: '42px'}}/>
        }
            <div className='fullName'>
                <div className='name'>{item.from.firstName}</div>
                <div className='surname'>{item.from.lastName}</div>
            </div>
        </div>
        <div className='card-message__content'>

            <div className='date'>{moment(item.createdAt).format('DD.MM.YYYY')}</div>

            <div className='card-message__message'>Привет, я ищу партнёра для совместных [силовых тренировок]. Ты хочешь присоединиться ко мне на следующих тренировках?</div>
            <Button type='link' className='btn-details' onClick={handleShowDetailsTraining}>Посмотреть детали тренировки</Button>
        </div>
        <div  className='btn__wrapper'>
            <Button type='primary' size='large' className='btn-joint' onClick={handleButtonTrainTogether}>Тренироваться вместе</Button>
            <Button size='large' className='btn-reject' onClick={handleButtonReject}>Отклонить запрос</Button>
        </div>
    </div>
);}

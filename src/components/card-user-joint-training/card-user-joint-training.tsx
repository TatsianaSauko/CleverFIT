import { useSelector } from 'react-redux';
import { CheckCircleFilled, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { deleteInvite } from '@redux/action-creators';
import { authSelector } from '@redux/slices/auth-slice';
import { Avatar, Button } from 'antd';

import { TrainingPals } from '../../types/types';

import './card-user-joint-training.css';


export const CardUserJointTraining = ({item,searchQuery}: {item:TrainingPals,  searchQuery: string}) => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    let statusMessage;

    if (item.status === 'accepted') {
        statusMessage = <div className='message'>тренировка одобрена<CheckCircleFilled style={{color: 'var(--character-light-success)', fontSize: '14px', paddingLeft: '9px'}}/></div>;
    } else if (item.status === 'pending') {
        statusMessage = <div className='message'>ожидает подтверждения</div>;
    } else if (item.status === 'rejected') {
        statusMessage = <div className='message'>тренировка отклонена<ExclamationCircleOutlined style={{color: 'var(--character-light-secondary-45)', fontSize: '14px', paddingLeft: '9px'}}/></div>;
    } else {
        statusMessage = <div className='message hidden'>hidden</div>;
    }

    const handleButtonCancel= async() => {
        await dispatch(deleteInvite(token, item.inviteId));
    }

    return(
    <div className={item.status === 'rejected'?'card-user-joint-training color': 'card-user-joint-training' }>
        <div className='card-user-joint-training__header'>
        {item.imageSrc
            ? <Avatar src={item.imageSrc} size="large" style={{width: '42px', height: '42px'}}/>
            : <Avatar icon={<UserOutlined />} size="large" style={{width: '42px', height: '42px'}}/>
        }
            <div className='name'>
    {item.name.split(' ').map((word) => {
        const wordParts = word.split(new RegExp(`(${searchQuery})`, 'gi'));

        return (
            <div key={crypto.randomUUID()}>
                {wordParts.map((part) => part.toLowerCase() === searchQuery.toLowerCase()
                    ? <span style={{color: 'var(--character-light-red-4)'}}>{part}</span>
                    : <span >{part}</span>
                )}
            </div>
        );
    })}
</div>
        </div>
        <div className='card-user-joint-training__details'>
            <div className='type__wrapper'>
                <div className='type'>Тип тренировки:</div>
                <div className='type'>Средняя нагрузка:</div>
            </div>
            <div className='value__wrapper'>
            <div className='value'>{item.trainingType}</div>
                <div className='value'>{item.avgWeightInWeek} кг/нед</div>
            </div>
        </div>
        {item.status === 'accepted'
    ? <Button block={true} size='small' className='btn__create-training'>Отменить тренировку</Button>
    : <Button block={true} type='primary' size='small' className='btn__create-training' disabled={item.status === 'pending' || item.status === 'rejected'} onClick={handleButtonCancel}>Создать тренировку</Button>
}
        {statusMessage}

    </div>
);}

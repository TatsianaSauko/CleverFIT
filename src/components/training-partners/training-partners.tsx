import { useSelector } from 'react-redux';
import { CardPartner } from '@components/card-partner';
import { jointTrainingSelector } from '@redux/slices/joint-training';
import { Typography } from 'antd';

import './training-partners.css';

const { Title } = Typography;

// const trainingPals = [{
//     id: '1',
//     name: 'Еленa Кручкова',
//     trainingType: 'Силовая',
//     imageSrc: 'https://joeschmoe.io/api/v1/random',
//     avgWeightInWeek: 154,
//     inviteId: 'string',
//     status: 'string'
// },
// {
//     id: '2',
//     name: 'Еленa Кручкова',
//     trainingType: 'Силовая',
//     imageSrc: 'https://joeschmoe.io/api/v1/random',
//     avgWeightInWeek: 154,
//     inviteId: 'string',
//     status: 'string'
// },
// {
//     id: '3',
//     name: 'Еленa Кручкова',
//     trainingType: 'Силовая',
//     imageSrc: 'https://joeschmoe.io/api/v1/random',
//     avgWeightInWeek: 154,
//     inviteId: 'string',
//     status: 'string'
// },
// {
//     id: '4',
//     name: 'Еленa Кручкова',
//     trainingType: 'Силовая',
//     imageSrc: 'https://joeschmoe.io/api/v1/random',
//     avgWeightInWeek: 154,
//     inviteId: 'string',
//     status: 'string'
// },
// ]

export const TrainingPartners = () => {
    const { trainingPals } = useSelector(jointTrainingSelector);

    return (
    <div className='training-partners'>
            <Title
            level={4}
             className='title'
            >
            Мои партнёры по тренировкам
        </Title>
        <div className='cards_partner'>
        {trainingPals.map((item, index)=> <CardPartner item={item} key={item.id} data-test-id={`joint-training-cards${index}`}/>)}
        </div>

    </div>
    );
};

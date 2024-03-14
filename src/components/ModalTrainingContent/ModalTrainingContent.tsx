import { getColorForName } from '@utils/getColorForName';

import { TrainingContentProps } from '../../types/Props';
import edit from '/png/buttonEdit.png';

import './modalTrainingContent.css';
import { useState } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

export const ModalTrainingContent = ({ value, onClick }: TrainingContentProps) => {


    const [selectedActivity, setSelectedActivity] = useState('');

    const handleEditClick = (activityName: string) => {
        setSelectedActivity(activityName);

    };

    return (
        <ul className='training-content'>
            {value.map((activity) => (
                <li key={activity.name}>
                    <div
                        className='marker'
                        style={{ backgroundColor: getColorForName(activity.name) }}
                    />
                    {activity.name}
                    <img
                        src={edit}
                        alt='Edit'
                        className='icon-edit'
                        onClick={()  => onClick(activity.name)}
                    />
                </li>
            ))}
        </ul>
    );
};

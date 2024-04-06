import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DrawerTrainings } from '@components/drawer-trainings';
import { ModalAlert } from '@components/modal-alert';
import { ModalTrainingListError } from '@components/modal-training-list-error';
import { TableTrainings } from '@components/table-trainings';
import { MESSAGES } from '@constants/message-alert';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { createTraining, getTrainingUser, putTraining } from '@redux/action-creators';
import { authSelector } from '@redux/slices/auth-slice';
import { cleanTraining, setDateTraining, trainingSelector } from '@redux/slices/training-slice';
import { getDataForDate } from '@utils/get-data-for-date';
import { isPastDate } from '@utils/past-date';
import { Button } from 'antd';
import moment from 'moment';

import './my-trainings-component.css';

export const MyTrainingsComponent = () => {
    const { getTrainingListError, activitiesData, training } = useSelector(trainingSelector);

    const [isDrawer, setIsDrawer] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState('');
    const dispatch = useAppDispatch();
    const dataForDate = getDataForDate(activitiesData, training.date);
    const itemWithName = dataForDate.find((item) => item.name === training.name);
    const { token } = useSelector(authSelector);
    const [IsModalErrorSaveTraining, setIsModalErrorSaveTraining] = useState(false);

    const handleModalToggle = () => {
        setIsModalErrorSaveTraining(false);
    };

    const handleButtonSave = async () => {
        const { _id, ...newTraining } = training;
        const cleanExercises = training.exercises.map(({ _id: exerciseId, ...rest }) => rest);
        const cleanTrainingObject = { ...newTraining, exercises: cleanExercises };

        if (itemWithName && itemWithName._id) {
            if (isPastDate(moment(itemWithName.date))) {
                cleanTrainingObject.isImplementation = true;
            }
            try {
                await dispatch(putTraining(token, cleanTrainingObject, itemWithName._id));
                await dispatch(getTrainingUser(token));
                dispatch(cleanTraining());
                setShowSuccessMessage(MESSAGES.TRAINING_UPDATE);
            } catch {
                setIsModalErrorSaveTraining(true);
            }
        } else {
            try {
                await dispatch(createTraining(token, cleanTrainingObject));
                await dispatch(getTrainingUser(token));
                dispatch(cleanTraining());
                setShowSuccessMessage(MESSAGES.NEW_TRAINING_ADDED);
            } catch {
                setIsModalErrorSaveTraining(true);
            }
        }
        setIsDrawer(false);
    };
    const handleCreateTraining = () => {
        setIsDrawer(true);
    };

    const closeDrawer = () => {
        setIsDrawer(false);
        dispatch(cleanTraining());
        dispatch(setDateTraining({ date: '' }));
    };

    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage('');
    };

    return (
        <div className='training-page__content'>
            <ModalTrainingListError
                isModalTrainingList={IsModalErrorSaveTraining}
                handleModalToggle={handleModalToggle}
            />
            <DrawerTrainings
                onClose={closeDrawer}
                isDrawer={isDrawer}
                handleButtonSave={handleButtonSave}
            />
            {showSuccessMessage && (
                <ModalAlert message={showSuccessMessage} onClose={handleCloseSuccessMessage} />
            )}
            {activitiesData.length === 0 ? (

<div className='my-training__empty'>
<div className='title'>У вас ещё нет созданных тренировок</div>
{getTrainingListError ? null : (
<Button
size='large'
type='primary'
className='btn-create'
onClick={handleCreateTraining}
>
Создать тренировку
</Button>
)}
</div>

            ) : (
                <TableTrainings onClick={handleCreateTraining} />
            )}
        </div>
    );
};

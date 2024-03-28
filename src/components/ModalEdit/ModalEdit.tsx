import { useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { ModalEditContent } from '@components/ModalEditContent';
import { ModalTrainingListError } from '@components/ModalTrainingListError';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { createTraining, getTrainingUser, putTraining } from '@redux/ActionCreators';
import { authSelector } from '@redux/slices/AuthSlice';
import { cleanTraining, setNameTraining, trainingSelector } from '@redux/slices/TrainingSlice';
import { getDataForDate } from '@utils/getDataForDate';
import { Button, Divider, Select, Spin } from 'antd';
import moment from 'moment';

import back from '/png/icon-back.png';
import { ModalEditTrainingProps } from '../../types/Props';

import './modalEdit.css';

const antIcon = <LoadingOutlined style={{ fontSize: 14, color: '#1D39C4' }} spin={true} />;

export const ModalEdit = ({
    backClick,
    position,
    modalAddTraining,
    closeModals,
}: ModalEditTrainingProps) => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const { activitiesData, trainingList, training, flag, loadingTraining } =
        useSelector(trainingSelector);
    const [selectedValue, setSelectedValue] = useState(
        training.name ? training.name : 'Выбор типа тренировки',
    );
    const [IsModalErrorSaveTraining, setIsModalErrorSaveTraining] = useState(false);
    const dataForDate = getDataForDate(activitiesData, training.date);

    const itemWithName = dataForDate.find((item) => item.name === training.name);

    const handleChange = (value: string) => {
        setSelectedValue(value);
        dispatch(cleanTraining());
        dispatch(setNameTraining({ value }));
    };

    const filteredOptions = trainingList.filter(
        (item) => !dataForDate.some((activity) => activity.name === item.name),
    );

    const handleSaveButton = async () => {
        const { _id, ...newTraining } = training;
        const cleanExercises = training.exercises.map(({ _id, ...rest }) => rest);
        const cleanTrainingObject = { ...newTraining, exercises: cleanExercises };

        if (itemWithName) {
            const id = itemWithName._id;

            if (id) {
                if (flag) {
                    cleanTrainingObject.isImplementation = true;
                }
                try {
                    await dispatch(putTraining(token, cleanTrainingObject, id));
                    await dispatch(getTrainingUser(token));
                    dispatch(cleanTraining());
                    backClick();
                } catch {
                    setIsModalErrorSaveTraining(true);
                }
            }
        } else if (!flag) {
            try {
                await dispatch(createTraining(token, cleanTrainingObject));
                await dispatch(getTrainingUser(token));
                dispatch(cleanTraining());
                backClick();
            } catch {
                setIsModalErrorSaveTraining(true);
            }
        } else {
            setIsModalErrorSaveTraining(true);
        }
    };

    const handleModalToggle = () => {
        setIsModalErrorSaveTraining(false);
        closeModals();
    };

    return (
        <div
            className='modal-training-edit'
            data-test-id='modal-create-exercise'
            style={{
                top: position.top - 24,
                right: moment(training.date).day() === 0 ? 29 : undefined,
                left: moment(training.date).day() !== 0 ? position.left - 8 : undefined,
            }}
        >
            <ModalTrainingListError
                isModalTrainingList={IsModalErrorSaveTraining}
                handleModalToggle={handleModalToggle}
            />
            <img
                data-test-id='modal-exercise-training-button-close'
                src={back}
                alt='back'
                className='btn-back'
                onClick={backClick}
            />
            <Select
                className='select-training'
                data-test-id='modal-create-exercise-select'
                value={selectedValue}
                onChange={handleChange}
                options={filteredOptions.map((item) => ({
                    value: item.name,
                    label: item.name,
                }))}
            />
            <ModalEditContent onClick={modalAddTraining} />
            <Divider />
            <div className='btn-wrapper'>
                <Button
                    className='btn__add-training'
                    block={true}
                    disabled={selectedValue === 'Выбор типа тренировки'}
                    onClick={modalAddTraining}
                >
                    Добавить упражнения
                </Button>
                <Button
                    type='text'
                    className='btn-save'
                    block={true}
                    onClick={handleSaveButton}
                    disabled={training.exercises.length === 0 || training.exercises[0].name === ''}
                >
                    {loadingTraining ? <Spin indicator={antIcon} className='spin' /> : null}
                    {itemWithName ? 'Сохранить изменения' : 'Сохранить'}
                </Button>
            </div>
        </div>
    );
};

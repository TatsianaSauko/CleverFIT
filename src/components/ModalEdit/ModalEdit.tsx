import { Button, Divider, Select, Spin } from 'antd';
import { ModalEditTrainingProps } from '../../types/Props';

import './modalEdit.css';
import { useSelector } from 'react-redux';
import { cleanTraining, setNameTraining, trainingSelector } from '@redux/slices/TrainingSlice';
import { getDataForDate } from '@utils/getDataForDate';

import back from '/png/icon-back.png';
import { useState } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { authSelector } from '@redux/slices/AuthSlice';

import { createTraining, getTrainingUser, putTraining } from '@redux/ActionCreators';
import { ModalEditContent } from '@components/ModalEditContent';
import { LoadingOutlined } from '@ant-design/icons';
import { ModalErrorSaveTraining } from '@components/ModalErrorSaveTraining';
import moment from 'moment';
const antIcon = <LoadingOutlined style={{ fontSize: 14, color: '#1D39C4' }} spin />;

export const ModalEdit = ({ backClick, position, modalAddTraining }: ModalEditTrainingProps) => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const { activitiesData, trainingList, training, flag, loadingTraining } =
        useSelector(trainingSelector);
    const [selectedValue, setSelectedValue] = useState(
        training.name ? training.name : 'Выбор типа тренировки',
    );
    const [IsModalErrorSaveTraining, setIsModalErrorSaveTraining] = useState(false);
    const dataForDate = getDataForDate(activitiesData, training.date);

    const handleChange = (value: string) => {
        setSelectedValue(value);
        dispatch(cleanTraining());
        dispatch(setNameTraining({ value }));
    };

    const filteredOptions = trainingList.filter((item) => {
        return !dataForDate.some((activity) => activity.name === item.name);
    });

    const handleSaveButton = async () => {
        const { _id, ...newTraining } = training;
        const cleanExercises = training.exercises.map(({ _id, ...rest }) => rest);
        const cleanTrainingObject = { ...newTraining, exercises: cleanExercises };
        const itemWithName = dataForDate.find((item) => item.name === training.name);
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
        } else {
            if (!flag) {
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
        }
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
            <ModalErrorSaveTraining
                IsModalErrorSaveTraining={IsModalErrorSaveTraining}
                handleModalToggle={() => setIsModalErrorSaveTraining(false)}
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
                style={{ width: 225 }}
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
                    block
                    disabled={selectedValue === 'Выбор типа тренировки'}
                    onClick={modalAddTraining}
                >
                    Добавить упражнения
                </Button>
                <Button
                    type='text'
                    className='btn-save'
                    block
                    onClick={handleSaveButton}
                    disabled={training.exercises.length === 0 || training.exercises[0].name === ''}
                >
                    {loadingTraining ? <Spin indicator={antIcon} className='spin' /> : null}
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

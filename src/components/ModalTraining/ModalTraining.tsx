import { Button, Divider, Empty, Select, Typography } from 'antd';
import { ModalTrainingProps } from '../../types/Props';
import empty from '/png/empty-image.png';
import close from '/png/close.png';
import './modalTraining.css';
import { useSelector } from 'react-redux';
import { cleanTraining, setDateTraining, setNameTraining, setTraining, trainingSelector } from '@redux/slices/TrainingSlice';
import { getDataForDate } from '@utils/getDataForDate';
import { ModalTrainingContent } from '@components/ModalTrainingContent';
import back from '/png/icon-back.png';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { authSelector } from '@redux/slices/AuthSlice';

import { createTraining, deleteTraining, putTraining } from '@redux/ActionCreators';
const { Title, Text } = Typography;

export const ModalTraining = ({
    onCancel,
    position,
    dayOfWeek,
    dateMoment,
    modalAddTraining,
}: ModalTrainingProps) => {
    const dispatch = useAppDispatch();
    const { trainingList, training } = useSelector(trainingSelector);
    const { activitiesData } = useSelector(trainingSelector);
    const [isActivityEdit, setIsActivityEdit] = useState(false);
    const dataForDate = getDataForDate(activitiesData, dateMoment);
    const { token } = useSelector(authSelector);
    const [selectedValue, setSelectedValue] = useState('Выбор типа тренировки');

    const handleChange = (value: string) => {
        dispatch(cleanTraining());
        dispatch(setNameTraining({value}));
        const date = dateMoment.toISOString();
        dispatch(setDateTraining({date}));
        setSelectedValue(value)
    };

    useEffect(() => {
        const date = dateMoment.toISOString();
        dispatch(setDateTraining({date}));

    }, []);

    const filteredOptions = trainingList.filter((item) => {

        return !dataForDate.some((activity) => activity.name === item.name);
    });



    const handleAddTraining = () => {
        modalAddTraining();
    };

    const handleSaveButton = () => {

        dispatch(createTraining(token));

        // dispatch(putTraining(token));
        // dispatch(deleteTraining(token));
    };

    const handleEditTraining = (value: string) => {
        dispatch(setNameTraining({value}));
        const filteredActivities = dataForDate.filter((item) =>item.name === value);
        dispatch(setTraining({training: filteredActivities[0]}))
        modalAddTraining();

    };

    return (
        <div
            className='modal-training'
            style={{
                top: position.top,
                right: dayOfWeek === 6 ? 29 : undefined,
                left: dayOfWeek !== 6 ? position.left : undefined,
            }}
        >
            {isActivityEdit ? (
                <>
                    <img
                        src={back}
                        alt='back'
                        className='btn-back'
                        onClick={() => setIsActivityEdit(false)}
                    />
                    <Select
                        className='select-training'
                        value={selectedValue}

                        style={{ width: 225 }}
                        onChange={handleChange}
                        options={filteredOptions.map((item) => ({
                            value: item.name,
                            label: item.name,
                        }))}
                    />
                </>
            ) : (
                <>
                    <img src={close} alt='close' className='btn-close' onClick={onCancel} />
                    <div className='block-title'>
                        <Title level={5} className='title'>
                            {`Тренировки на ${dateMoment.format('DD.MM.YYYY')}`}
                        </Title>
                        {!dataForDate.length ? (
                            <Text type='secondary' className='subtitle'>
                                Нет активных тренировок
                            </Text>
                        ) : null}
                    </div>
                </>
            )}

            {dataForDate.length ? (
                <ModalTrainingContent value={dataForDate} onClick={handleEditTraining}/>
            ) : (
                <Empty
                    image={empty}
                    imageStyle={{
                        height: 32,
                        width: 32,
                    }}
                    className='empty'
                    description={false}
                ></Empty>
            )}

            <Divider />
            {isActivityEdit ? (
                <div className='btn-wrapper'>
                    <Button className='btn__add-training' block disabled={selectedValue === 'Выбор типа тренировки'} onClick={handleAddTraining}>
                        Добавить упражнения
                    </Button>
                    <Button type='text' className='btn-save' block onClick={handleSaveButton}>
                        Сохранить
                    </Button>
                </div>
            ) : (
                <div className='btn-wrapper'>
                    <Button
                        type='primary'
                        className='btn-create'
                        size={'large'}
                        block
                        onClick={() => setIsActivityEdit(true)}
                        disabled={trainingList.length === dataForDate.length}
                    >
                        Создать тренировку
                    </Button>
                </div>
            )}
        </div>
    );
};

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Drawer, Space } from 'antd';
import { getColorForName } from '@utils/getColorForName';
import { FormAddTraining } from '@components/FormAddTraining';
import { createExercise, setTraining, trainingSelector } from '@redux/slices/TrainingSlice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { filterUncheckedExercises } from '@utils/filterUncheckedExercises';
import { DrawerProps } from '../../types/Props';
import moment from 'moment';
import { CloseOutlined } from '@ant-design/icons';
import { getDataForDate } from '@utils/getDataForDate';

import './myDrawer.css';

export const MyDrawer = ({ onClose, isDrawer }: DrawerProps) => {
    const dispatch = useAppDispatch();
    const { training, activitiesData } = useSelector(trainingSelector);
    const dataForDate = getDataForDate(activitiesData, training.date);
    const itemWithName = dataForDate.find((item) => item.name === training.name);
    const [modalWidth, setModalWidth] = useState(window.innerWidth < 576 ? 360 : 408);

    useEffect(() => {
        const handleResize = () => {
            setModalWidth(window.innerWidth < 576 ? 360 : 408);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const addForm = () => {
        dispatch(createExercise());
    };

    const deleteForm = () => {
        const resFilter = filterUncheckedExercises(training);
        dispatch(setTraining({ training: resFilter }));
    };

    const hasCheckedExercise = training.exercises.some((exercise) => exercise.checked);
    const buttonDisabled = hasCheckedExercise ? false : true;

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            title={itemWithName ? '+ Редактирование' : '+ Добавление упражнений'}
            placement='right'
            onClose={onClose}
            open={isDrawer}
            closable={false}
            width={modalWidth}
            extra={
                <Space>
                    <Button
                        icon={
                            <CloseOutlined
                                style={{
                                    color: 'var(--character-light-secondary-45)',
                                    fontSize: '12px',
                                }}
                            />
                        }
                        className='btn-close'
                        data-test-id='modal-drawer-right-button-close'
                        onClick={onClose}
                    ></Button>
                </Space>
            }
        >
            <div className='drawer-data__wrapper'>
                <div className='name-training'>
                    <span
                        className='marker'
                        style={{ backgroundColor: getColorForName(training.name) }}
                    />
                    {training.name}
                </div>
                <div className='drawer-data'>{moment(training.date).format('DD.MM.YYYY')}</div>
            </div>
            <div className='drawer__wrapper'>
                {training.exercises.length &&
                    training.exercises.map((item, index) => (
                        <FormAddTraining key={item._id} item={item} index={index} />
                    ))}
                <div className='buttons__wrapper'>
                    <Button
                        type='link'
                        size='large'
                        className='btn__add-more'
                        onClick={addForm}
                        block
                    >
                        Добавить ещё
                    </Button>
                    <Button
                        block
                        type='text'
                        size='large'
                        className='btn__delete'
                        onClick={deleteForm}
                        disabled={buttonDisabled}
                    >
                        Удалить
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

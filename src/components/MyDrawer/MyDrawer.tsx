import { useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { FormAddTraining } from '@components/FormAddTraining';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResponsiveWidth } from '@hooks/useResponsiveWidth';
import { createExercise, setTraining, trainingSelector } from '@redux/slices/TrainingSlice';
import { filterUncheckedExercises } from '@utils/filterUncheckedExercises';
import { getColorForName } from '@utils/getColorForName';
import { getDataForDate } from '@utils/getDataForDate';
import { Button, Drawer, Space } from 'antd';
import moment from 'moment';

import { DrawerProps } from '../../types/Props';

import './myDrawer.css';

export const MyDrawer = ({ onClose, isDrawer }: DrawerProps) => {
    const dispatch = useAppDispatch();
    const { training, activitiesData } = useSelector(trainingSelector);
    const dataForDate = getDataForDate(activitiesData, training.date);
    const itemWithName = dataForDate.find((item) => item.name === training.name);
    const modalWidth = useResponsiveWidth(360, 408);

    const addForm = () => {
        dispatch(createExercise());
    };

    const deleteForm = () => {
        const resFilter = filterUncheckedExercises(training);

        dispatch(setTraining({ training: resFilter }));
    };

    const hasCheckedExercise = training.exercises.some((exercise) => exercise.checked);
    const buttonDisabled = !hasCheckedExercise;

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            title={itemWithName ? '+ Редактирование' : '+ Добавление упражнений'}
            className='drawer-edit-training'
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
                    />
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
                        block={true}
                    >
                        Добавить ещё
                    </Button>
                    <Button
                        block={true}
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

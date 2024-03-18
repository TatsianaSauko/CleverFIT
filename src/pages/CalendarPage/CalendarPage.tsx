import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTrainingList } from '@redux/ActionCreators';
import { authSelector } from '@redux/slices/AuthSlice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { Calendar } from 'antd';
import type { Moment } from 'moment';
import { Content } from 'antd/lib/layout/layout';
import { ModalTrainingListError } from '@components/ModalTrainingListError';
import { locale } from '@constants/calendarLocale';
import { ModalTraining } from '@components/ModalTraining';
import moment from 'moment';
import { CalendarCell } from '@components/CalendarCell';
import {
    cleanTraining,
    setActivitiesData,
    setDateTraining,
    setFlag,
    setTraining,
    setTrainingFull,
    trainingSelector,
} from '@redux/slices/TrainingSlice';
import { filterEmptyExercises } from '@utils/filterEprtyExercises';
import { MyDrawer } from '@components/MyDrawer';
import { ModalEdit } from '@components/ModalEdit';

import './calendarPage.css';


export const CalendarPage = () => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const { activitiesData, training } = useSelector(trainingSelector);
    const [isModalTrainingList, setIsModalTrainingList] = useState(false);
    const [modalWidth, setModalWidth] = useState(window.innerWidth < 576 ? false : true);
    const [isDrawer, setIsDrawer] = useState(false);
    const [modalTraining, setModalTraining] = useState(false);
    const [modalTrainingEdit, setModalTrainingEdit] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const handleResize = () => {
            setModalWidth(window.innerWidth < 576 ? false : true);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [activitiesData]);

    const getDataTrainingList = async () => {
        try {
            await dispatch(getTrainingList(token));
        } catch {
            setIsModalTrainingList(true);
        }
    };
    useEffect(() => {
        getDataTrainingList();
    }, []);

    const update = async () => {
        setIsModalTrainingList(false);
        await getDataTrainingList();
    };

    const isPastDate = (date: Moment): boolean => {
        const today = moment().startOf('day');
        return date.isSameOrBefore(today, 'day');
    };

    const handleDateClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const cellRect = e.currentTarget.getBoundingClientRect();
        setModalPosition({
            top: cellRect.top,
            left: cellRect.left,
        });
        setModalTraining(true);
    };

    const handleSelectClick = (data: Moment) => {
        dispatch(setDateTraining({ date: data.toISOString() }));
        dispatch(cleanTraining());
        const isCurrentMonth = moment(data).isSame(moment(), 'month');
        dispatch(setFlag({ flag: isPastDate(data) }));
        if (!modalWidth && isCurrentMonth) {
            setModalPosition({
                top: 265,
                left: 24 + 8,
            });
            setModalTraining(true);
        }
    };

    const handleModalToggle = () => {
        if (isModalTrainingList) {
            setIsModalTrainingList(false);
            dispatch(setActivitiesData({ activitiesData: [] }));
        }
    };

    const closeDrawer = () => {
        setIsDrawer(false);
        if (training.exercises.length !== 1) {
            const resFilter = filterEmptyExercises(training);
            if (resFilter.exercises.length === 0) {
                dispatch(setTrainingFull());
            } else {
                dispatch(setTraining({ training: resFilter }));
            }
        }
    };

    return (
        <Content className='main calendar-page'>
            <MyDrawer onClose={closeDrawer} isDrawer={isDrawer} />
            <ModalTrainingListError
                isModalTrainingList={isModalTrainingList}
                handleModalToggle={handleModalToggle}
                update={update}
            />

            <Calendar
                fullscreen={modalWidth}
                locale={locale}
                onSelect={handleSelectClick}
                dateCellRender={(value) => (
                    <div onClick={handleDateClick} className='cell'>
                        <CalendarCell value={value} />
                    </div>
                )}
            />

            {modalTraining ? (
                <ModalTraining
                    onCancel={() => setModalTraining(false)}
                    position={modalPosition}
                    click={() => setModalTrainingEdit(true)}
                />
            ) : null}
            {modalTrainingEdit ? (
                <ModalEdit
                    backClick={() => setModalTrainingEdit(false)}
                    position={modalPosition}
                    modalAddTraining={() => setIsDrawer(true)}
                />
            ) : null}
        </Content>
    );
};

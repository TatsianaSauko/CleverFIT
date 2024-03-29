import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CalendarCell } from '@components/CalendarCell';
import { ModalEdit } from '@components/ModalEdit';
import { ModalTraining } from '@components/ModalTraining';
import { ModalTrainingListError } from '@components/ModalTrainingListError';
import { MyDrawer } from '@components/MyDrawer';
import { locale } from '@constants/calendarLocale';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResponsiveVisibility } from '@hooks/useResponsiveVisibility';
import { getTrainingList } from '@redux/ActionCreators';
import { authSelector } from '@redux/slices/AuthSlice';
import {
    cleanTraining,
    setActivitiesData,
    setDateTraining,
    setFlag,
    setIisModal,
    setTraining,
    setTrainingFull,
    trainingSelector,
} from '@redux/slices/TrainingSlice';
import { filterEmptyExercises } from '@utils/filterEprtyExercises';
import { Calendar } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import type { Moment } from 'moment';
import moment from 'moment';

import './calendarPage.css';

export const CalendarPage = () => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const { training, isModal } = useSelector(trainingSelector);
    const [isModalTrainingList, setIsModalTrainingList] = useState<boolean>(isModal);
    const [isDrawer, setIsDrawer] = useState(false);
    const [modalTraining, setModalTraining] = useState(false);
    const [modalTrainingEdit, setModalTrainingEdit] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const defaultVisibility = !(window.innerWidth < 576);
    const modalVisible = useResponsiveVisibility(defaultVisibility);

    const update = async () => {
        dispatch(setIisModal({ isModal: false }));
        try {
            await dispatch(getTrainingList(token));
        } catch {
            setIsModalTrainingList(true);
            dispatch(setIisModal({ isModal: true }));
        }
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
        if (!modalVisible && isCurrentMonth) {
            setModalPosition({
                top: 265,
                left: 24 + 8,
            });
            setModalTraining(true);
        }
    };

    const handleModalToggle = () => {
        setIsModalTrainingList(false);
        dispatch(setIisModal({ isModal: false }));
        dispatch(setActivitiesData({ activitiesData: [] }));
    };

    const closeModals = () => {
        setModalTrainingEdit(false);
        setModalTraining(false);
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

    const handleButtonBack = () => {
        setModalTrainingEdit(false);
        setModalTraining(true);
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
                fullscreen={modalVisible}
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
                    backClick={handleButtonBack}
                    position={modalPosition}
                    modalAddTraining={() => setIsDrawer(true)}
                    closeModals={closeModals}
                />
            ) : null}
        </Content>
    );
};

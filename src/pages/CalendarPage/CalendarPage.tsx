import { Button, Calendar, Drawer, Form, Input, Space } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Moment } from 'moment';
import { authSelector } from '@redux/slices/AuthSlice';
import './calendarPage.css';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getTrainingList, getTrainingUser } from '@redux/ActionCreators';
import { useSelector } from 'react-redux';
import { Content } from 'antd/lib/layout/layout';
import { ModalGetDataError } from '@components/ModalGetDataError';
import { ModalTrainingListError } from '@components/ModalTrainingListError';
import { locale } from '@constants/calendarLocale';
import { ModalTraining } from '@components/ModalTraining';
import moment from 'moment';
import close from '/png/Menu-Icon.png';
import { FormAddTraining } from '@components/FormAddTraining';

import { CalendarCell } from '@components/CalendarCell';
import { createExercise, setTraining, trainingSelector } from '@redux/slices/TrainingSlice';
import { getColorForName } from '@utils/getColorForName';
import { filterUncheckedExercises } from '@utils/filterUncheckedExercises';
import { filterEmptyExercises } from '@utils/filterEprtyExercises';
// import { v4 as uuidv4 } from 'uuid';


export const CalendarPage = () => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const { training } = useSelector(trainingSelector);
    const [isModalGetData, setIsModalGetData] = useState(false);
    const [isModalTrainingList, setIsModalTrainingList] = useState(false);
    const [modalWidth, setModalWidth] = useState(window.innerWidth < 576 ? false : true);
    const [modalTraining, setModalTraining] = useState(false);
    const [isDrawer, setIsDrawer] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [dayOfWeek, setDayOfWeek] = useState(1);
    const [date, setDate] = useState<Moment| undefined>(undefined);
    const [formCount, setFormCount] = useState(1);
    console.log('training',training)


    const addForm = () => {
        dispatch(createExercise());
    };

    const deleteForm = () => {
        const resFilter = filterUncheckedExercises(training)
        dispatch(setTraining({training: resFilter}))
    };

    useEffect(() => {
        const handleResize = () => {
            setModalWidth(window.innerWidth < 576 ? false : true);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // useEffect(() => {
    //     const resFilter = filterEmptyExercises(training);
    //     dispatch(setTraining({training: resFilter}))
    // }, [training]);

    useEffect(() => {
        dispatch(getTrainingUser(token))
            .then(() => {
                dispatch(getTrainingList(token)).catch(() => {
                    setIsModalTrainingList(true);
                });
            })
            .catch(() => {
                setIsModalGetData(true);
            });
    }, []);


    const update = () => {
        setIsModalTrainingList(false);
        dispatch(getTrainingList(token)).catch(() => {
            setIsModalTrainingList(true);
        });
    };

    // useEffect(() => {
    //     dispatch(cleanTraining())
    // }, []);

    const handleSelectClick = (data: Moment) => {
        const selectedDate = moment(data);
        // console.log('selectedDate',selectedDate)
        // const date = selectedDate.toISOString();
        // console.log('date',date)
        setDayOfWeek(selectedDate.day());
        setDate(selectedDate);
        const isCurrentMonth = selectedDate.isSame(moment(), 'month');
        if (!modalWidth && isCurrentMonth) {
            setModalPosition({
                top: 265,
                left: 24,
            });
            setModalTraining(true);
        }
    };

    const handleDateClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const cellRect = e.currentTarget.getBoundingClientRect();
        setModalPosition({
            top: cellRect.top,
            left: cellRect.left - cellRect.width - cellRect.width / 2 - cellRect.width / 4,
        });
        setModalTraining(true);
    };

    const handleModalToggle = () => {
        if (isModalTrainingList) {
            setIsModalTrainingList(false);
            //чистим стейт для use, т. к. при нажатии на эту кнопку данные  исчезают
        }

        if (isModalGetData) {
            setIsModalGetData(false);
            history.back();
        }
    };

    const closeDrawer =()=>  {
        setIsDrawer(false);

    }

    return (
        <Content className='main calendar-page'>
            <Drawer
                title='+ Добавление упражнений'
                placement='right'
                onClose={closeDrawer}
                open={isDrawer}
                closable={false}
                width={408}
                extra={
                    <Space>
                        <img
                            src={close}
                            alt='close'
                            className='btn-close'
                            onClick={() => setIsDrawer(false)}
                        />
                    </Space>
                }
            >
                <div className='drawer-data__wrapper'>
                    <div className='name-training'><span
                        className='marker'
                        style={{ backgroundColor: getColorForName(training.name) }}
                    />{training.name}</div>
                <div className='drawer-data'>{date && date.format('DD.MM.YYYY')}</div>
                </div>

                <div className='drawer__wrapper'>
                    {training.exercises.map((item, index) => (
                        <FormAddTraining item={item} index={index}/>
                    ))}
                    <div className='buttons__wrapper'>
                        <Button
                            type='link'
                            size='large'
                            className='btn__add-more'
                            onClick={addForm}
                            block
                        >
                            Добавить еще
                        </Button>
                        <Button
                        block
                            type="text"
                            size='large'
                            className='btn__delete'
                            onClick={deleteForm}
                        >
                             Удалить
                        </Button>
                    </div>
                </div>
            </Drawer>

            {/* {isModalGetData && ( */}
            <ModalGetDataError
                isModalGetData={isModalGetData}
                handleModalToggle={handleModalToggle}
            />
            {/* )} */}
            {/* {isModalTrainingList && ( */}
            <ModalTrainingListError
                isModalTrainingList={isModalTrainingList}
                handleModalToggle={handleModalToggle}
                update={update}
            />
            {/* )} */}
            {modalWidth ? (
                <Calendar
                    locale={locale}
                    onSelect={handleSelectClick}
                    dateCellRender={(value) => (
                        <div onClick={handleDateClick} className='cell'>
                            <CalendarCell value={value} />
                        </div>
                    )}
                />
            ) : (
                <Calendar fullscreen={false} locale={locale} onSelect={handleSelectClick} />
            )}
            {modalTraining && date? (
                <ModalTraining
                    onCancel={() => setModalTraining(false)}
                    position={modalPosition}
                    dayOfWeek={dayOfWeek}
                    dateMoment={date}

                    modalAddTraining={() => setIsDrawer(true)}
                />
            ) : null}
        </Content>
    );
};

import { useSelector } from 'react-redux';
import { trainingSelector } from '@redux/slices/TrainingSlice';
import { getColorForName } from '@utils/getColorForName';
import { getDataForDate } from '@utils/getDataForDate';
import moment from 'moment';

import { CalendarCellProps } from '../../types/Props';

import './calendarCell.css';

export const CalendarCell = ({ value }: CalendarCellProps) => {
    const { activitiesData } = useSelector(trainingSelector);
    const dataForDate = getDataForDate(activitiesData, moment(value).toISOString());

    return (
        <ul className='events'>
            {dataForDate.map((activity) => (
                <li key={activity.name}>
                    <span
                        className='marker'
                        style={{ backgroundColor: getColorForName(activity.name) }}
                    />
                    {activity.name}
                </li>
            ))}
        </ul>
    );
};

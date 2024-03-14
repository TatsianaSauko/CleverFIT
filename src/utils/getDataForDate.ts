import { ActivityData } from '../types/Types';
import moment from 'moment';
export function getDataForDate(activitiesData: ActivityData[], value: moment.Moment | string) {
    const formattedValue = typeof value === 'string' ? value : moment(value).format('DD.MM.YYYY');
    return activitiesData.filter(
        (activity) => moment(activity.date).format('DD.MM.YYYY') === formattedValue,
    );
}

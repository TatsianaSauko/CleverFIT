import { ActivityData } from '../types/Types';
import moment from 'moment';

export function getDataForDate(activitiesData: ActivityData[], value: string | number) {
    return activitiesData.filter(
        (activity) =>
            moment(activity.date).format('DD.MM.YYYY') === moment(value).format('DD.MM.YYYY'),
    );
}

import moment from 'moment';

import { ActivityData } from '../types/Types';

export function getDataForDate(activitiesData: ActivityData[], value: string | number) {
    return activitiesData.filter(
        (activity) =>
            moment(activity.date).format('DD.MM.YYYY') === moment(value).format('DD.MM.YYYY'),
    );
}

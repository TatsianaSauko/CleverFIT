import { useSelector } from 'react-redux';
import { DailyLoadList } from '@components/daily-load-list';
import { LoadChart } from '@components/load-chart';
import { NoTraining } from '@components/no-training';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { achievementSelector } from '@redux/slices/achievements-slice';
import { trainingSelector } from '@redux/slices/training-slice';
import {
    calculateAverageLoad,
    formatDate,
    sortAndFormatDays,
    sortDataByDate,
} from '@utils/load-сalculations';

import { DataLoad } from '../../types/types';

import './load-block.css';

export const LoadBlock = ({ dataLoad }: { dataLoad: DataLoad[] }) => {
    // const { activitiesData } = useSelector(trainingSelector);
    // const { selectedTags  } = useSelector(achievementSelector);
    // const today = new Date();
    // const sevenDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
    // const data = calculateAverageLoad(activitiesData, sevenDaysAgo, today, selectedTags);
    const dailyLoadList = sortAndFormatDays(dataLoad);

    let dataCart = sortDataByDate(dataLoad);

    dataCart = formatDate(dataLoad);

    return (
        <div className='load-block'>
            <LoadChart dataCart={dataCart} />
            <DailyLoadList title='Средняя нагрузка по дням недели' dataCart={dailyLoadList} />
        </div>
    );
};

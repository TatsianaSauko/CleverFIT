import { useSelector } from 'react-redux';
import { ExercisePercentageChart } from '@components/exercise-percentage-chart';
import { FilterPanel } from '@components/filter-panel';
import { LoadCards } from '@components/load-card';
import { MonthlyLoadChart } from '@components/monthly-load-chart';
import { MonthlyLoadList } from '@components/monthly-load-list';
import { NoTraining } from '@components/no-training';
import { TopExercisesCard } from '@components/top-exercises-card';
import { WeeklyFrequentExercises } from '@components/weekly-frequent-exercises';
import { achievementSelector } from '@redux/slices/achievements-slice';
import { trainingSelector } from '@redux/slices/training-slice';
import { getExerciseTitle } from '@utils/get-exercise-title';
import {
    calculateAverageLoad,
    calculateDailyLoad,
    calculateMostFrequentExercise,
    calculateMostFrequentTraining,
    calculateTotalApproaches,
    calculateTotalLoad,
    calculateTotalReplays,
    convertToPercentage,
    countExercisesByDay,
    filterActivityData,
    formatDate,
    get28DayPeriod,
    sortDataByDate,
    sortDataByWeekdays,
    transformExerciseData,
} from '@utils/load-сalculations';

import './monthly-training.css';

export const MonthlyTraining = () => {
    const { activitiesData } = useSelector(trainingSelector);
    const { selectedTags } = useSelector(achievementSelector);
    const { start, end } = get28DayPeriod();
    const filteredData = filterActivityData(activitiesData, start, end, selectedTags);
    const averageLoadList = calculateAverageLoad(activitiesData, start, end, selectedTags);
    const totalLoad = calculateTotalLoad(filteredData);
    const dailyLoad = calculateDailyLoad(totalLoad, 28);
    const totalReplays = calculateTotalReplays(filteredData, 28);
    const totalApproaches = calculateTotalApproaches(filteredData, 28);
    const mostFrequentExercise = calculateMostFrequentExercise(filteredData);
    const mostFrequentTraining = calculateMostFrequentTraining(filteredData);
    const allWeightsAreZero = averageLoadList.every((item) => item.weight === 0);
    const title = getExerciseTitle(selectedTags);

    const exercisesByDay = countExercisesByDay(activitiesData);
    const { data, res } = transformExerciseData(exercisesByDay);
    const weeklyFrequentExercises = sortDataByWeekdays(data);

    const percentageRes = convertToPercentage(res);

    let dataCart = sortDataByDate(averageLoadList);

    dataCart = formatDate(averageLoadList);

    const loadCardsData = [
        { title: 'Общая нагрузка, кг', value: totalLoad },
        { title: 'Нагрузка в день, кг', value: dailyLoad },
        { title: 'Количество повторений,раз', value: totalReplays },
        { title: 'Подходы, раз', value: totalApproaches },
    ];

    return (
        <div className='monthly-training__content'>
            <FilterPanel />
            {allWeightsAreZero ? (
                <NoTraining />
            ) : (
                <React.Fragment>
                    <MonthlyLoadChart dataCart={dataCart} />
                    <MonthlyLoadList averageLoadList={averageLoadList} />
                    <div className='load-cards'>
                        {loadCardsData.map((data) => (
                            <LoadCards key={data.title} title={data.title} value={data.value} />
                        ))}
                    </div>
                    <div className='top-exercises-cards'>
                        {selectedTags === 'Все' ? (
                            <TopExercisesCard
                                title='Самая частая тренировка'
                                value={mostFrequentTraining || ''}
                            />
                        ) : null}
                        <TopExercisesCard title={title} value={mostFrequentExercise || ''} />
                    </div>
                    <div className='frequent-exercises-stats'>
                        <ExercisePercentageChart data={percentageRes} />
                        <WeeklyFrequentExercises
                            data={weeklyFrequentExercises}
                            title='Самые частые  упражнения по дням недели за месяц'
                        />
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

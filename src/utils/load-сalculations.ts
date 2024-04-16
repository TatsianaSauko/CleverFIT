import { ActivityData, DataCart, DataItem, ExerciseData, ResItem } from '../types/types';

export const sortDataByDate = (data: Array<{ day: string; weight: number }>) =>
    data.sort(
        (a, b) =>
            new Date(a.day.split('.').reverse().join('.')).getTime() -
            new Date(b.day.split('.').reverse().join('.')).getTime(),
    );

export function formatDate(data: Array<{ day: string; weight: number }>) {
    return data.map((item) => {
        const day = new Date(item.day).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
        });

        return { ...item, day };
    });
}

export function sortAndFormatDays(data: Array<{ day: string; weight: number }>) {
    const daysOfWeek = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
    ];

    const formattedData = data.map((item) => {
        const date = new Date(item.day);
        const dayOfWeek = daysOfWeek[(date.getUTCDay() + 6) % 7];

        return { ...item, day: dayOfWeek };
    });

    return formattedData.sort((a, b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day));
}

export function filterActivityData(
    activitiesData: ActivityData[],
    start: Date,
    end: Date,
    trainingName: string,
) {
    return activitiesData.filter((activity) => {
        const activityDate = new Date(activity.date);

        return (
            activityDate >= start &&
            activityDate <= end &&
            (trainingName === 'Все' ? true : activity.name === trainingName)
        );
    });
}

export function calculateAverageLoad(
    activitiesData: ActivityData[],
    start: Date,
    end: Date,
    trainingName: string,
) {
    const filteredData = filterActivityData(activitiesData, start, end, trainingName);

    const loadByDay: { [key: string]: { totalLoad: number; totalExercises: number } } = {};

    for (const activity of filteredData) {
        for (const exercise of activity.exercises) {
            const load =
                exercise.approaches && exercise.replays && exercise.weight
                    ? exercise.approaches * exercise.weight * exercise.replays
                    : 0;
            const activityDate = new Date(activity.date).toISOString().split('T')[0];

            if (loadByDay[activityDate]) {
                loadByDay[activityDate].totalLoad += load;
                loadByDay[activityDate].totalExercises++;
            } else {
                loadByDay[activityDate] = { totalLoad: load, totalExercises: 1 };
            }
        }
    }

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const dateString = date.toISOString().split('T')[0];

        if (
            !loadByDay[dateString] ||
            (loadByDay[dateString] && loadByDay[dateString].totalLoad === 0)
        ) {
            loadByDay[dateString] = { totalLoad: 0, totalExercises: 1 };
        }
    }

    const result = Object.keys(loadByDay).map((date) => {
        const { totalLoad, totalExercises } = loadByDay[date];
        const averageLoad = Math.round(totalLoad / totalExercises);

        return { day: date, weight: averageLoad };
    });

    return result;
}

export function calculateTotalLoad(filteredData: ActivityData[]) {
    let totalLoad = 0;

    for (const activity of filteredData) {
        for (const exercise of activity.exercises) {
            const load =
                exercise.approaches && exercise.replays && exercise.weight
                    ? exercise.approaches * exercise.weight * exercise.replays
                    : 0;

            totalLoad += load;
        }
    }

    return totalLoad;
}

export function calculateDailyLoad(totalLoad: number, totalDays: number) {
    if (totalDays === 0) {
        return 0;
    }

    return Math.round(totalLoad / totalDays);
}

export function calculateTotalReplays(filteredData: ActivityData[], totalDays: number) {
    let totalReplays = 0;

    for (const activity of filteredData) {
        for (const exercise of activity.exercises) {
            if (exercise.replays !== undefined) {
                totalReplays += exercise.replays;
            }
        }
    }

    return Math.round(totalReplays / totalDays);
}

export function calculateTotalApproaches(filteredData: ActivityData[], totalDays: number) {
    let totalApproaches = 0;

    for (const activity of filteredData) {
        for (const exercise of activity.exercises) {
            if (exercise.approaches !== undefined) {
                totalApproaches += exercise.approaches;
            }
        }
    }

    return Math.round(totalApproaches / totalDays);
}

export function calculateMostFrequentExercise(activitiesData: ActivityData[]) {
    const exerciseCounts: Record<string, number> = {};

    for (const activity of activitiesData) {
        for (const exercise of activity.exercises) {
            if (exercise.name in exerciseCounts) {
                exerciseCounts[exercise.name]++;
            } else {
                exerciseCounts[exercise.name] = 1;
            }
        }
    }

    let mostFrequentExercise = null;
    let maxCount = 0;

    for (const exercise in exerciseCounts) {
        if (exerciseCounts[exercise] > maxCount) {
            mostFrequentExercise = exercise;
            maxCount = exerciseCounts[exercise];
        }
    }

    return mostFrequentExercise;
}

export function calculateMostFrequentTraining(activitiesData: ActivityData[]) {
    const trainingCounts: Record<string, number> = {};

    for (const activity of activitiesData) {
        if (activity.name in trainingCounts) {
            trainingCounts[activity.name]++;
        } else {
            trainingCounts[activity.name] = 1;
        }
    }

    let mostFrequentTraining = null;
    let maxCount = 0;

    for (const training in trainingCounts) {
        if (trainingCounts[training] > maxCount) {
            mostFrequentTraining = training;
            maxCount = trainingCounts[training];
        }
    }

    return mostFrequentTraining;
}

export function getDayOfWeek(date: Date | string) {
    const dayOfWeek = new Date(date).getDay();

    return isNaN(dayOfWeek)
        ? null
        : ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'][
              (dayOfWeek + 6) % 7
          ];
}

// Функция для подсчета упражнений по дням недели
export function countExercisesByDay(activitiesData: ActivityData[]) {
    const exercisesByDay: { [key: string]: any } = {};

    activitiesData.forEach((activity) => {
        const dayOfWeek = getDayOfWeek(new Date(activity.date));

        if (dayOfWeek !== null) {
            activity.exercises.forEach((exercise) => {
                if (!exercisesByDay[dayOfWeek]) {
                    exercisesByDay[dayOfWeek] = {};
                }
                if (!exercisesByDay[dayOfWeek][exercise.name]) {
                    exercisesByDay[dayOfWeek][exercise.name] = 0;
                }
                exercisesByDay[dayOfWeek][exercise.name]++;
            });
        }
    });

    return exercisesByDay;
}

export function transformExerciseData(exercisesByDay: ExerciseData) {
    const data: DataItem[] = [];
    const res: ResItem[] = [];

    Object.keys(exercisesByDay).forEach((dayOfWeek) => {
        let mostFrequentExercise = null;
        let maxCount = 0;

        Object.keys(exercisesByDay[dayOfWeek]).forEach((exercise) => {
            if (exercisesByDay[dayOfWeek][exercise] > maxCount) {
                mostFrequentExercise = exercise;
                maxCount = exercisesByDay[dayOfWeek][exercise];
            }
            const foundExercise = res.find((item) => item.type === exercise);

            if (foundExercise) {
                foundExercise.value += exercisesByDay[dayOfWeek][exercise];
            } else {
                res.push({ type: exercise, value: exercisesByDay[dayOfWeek][exercise] });
            }
        });
        data.push({ week: dayOfWeek, value: mostFrequentExercise });
    });

    return { data, res };
}

export function convertToPercentage(res: ResItem[]) {
    const totalExercises = res.reduce((total, exercise) => total + exercise.value, 0);

    res.forEach((exercise) => {
        exercise.value = Math.round((exercise.value / totalExercises) * 100);
    });

    return res;
}

export function sortDataByWeekdays(data: DataItem[]) {
    const weekDays = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
    ];

    const sortedData = weekDays.map((day) => {
        const foundDay = data.find((item) => item.week === day);

        return foundDay || { week: day, value: '' };
    });

    return sortedData;
}

export function get28DayPeriod() {
    const today = new Date();
    const twentyEightDaysAgo = new Date(today.getTime() - 27 * 24 * 60 * 60 * 1000);

    // Получаем день недели для даты 28 дней назад (0 - воскресенье, 1 - понедельник, ..., 6 - суббота)
    const dayOfWeek = twentyEightDaysAgo.getDay();

    // Вычисляем, сколько дней нужно добавить, чтобы получить ближайший следующий понедельник
    const daysToAdd = dayOfWeek >= 1 ? 8 - dayOfWeek : 1;

    // Получаем дату ближайшего следующего понедельника
    const nextMonday = new Date(twentyEightDaysAgo.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    // Получаем дату, которая на 28 дней позже от ближайшего следующего понедельника
    const endDate = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    return { start: nextMonday, end: endDate };
}

export function groupByWeeks(data: DataCart[]) {
    const weeks = new Map<string, DataCart[]>();

    data.forEach((item) => {
        const date = new Date(item.day);
        const dayOfWeek = date.getDay();
        const weekStart = new Date(
            date.setDate(date.getDate() - ((dayOfWeek + 6) % 7)),
        ).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
        const weekEnd = new Date(
            date.setDate(date.getDate() - date.getDay() + 6),
        ).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
        const weekRange = `неделя ${weekStart}-${weekEnd}`;

        if (!weeks.has(weekRange)) {
            weeks.set(weekRange, []);
        }

        const formattedDay = new Date(item.day).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        weeks.get(weekRange)!.push({ ...item, day: formattedDay });
    });

    return weeks;
}

import { ActivityData } from '../types/types';

export const transformedData = (originalData: ActivityData[]) =>
    originalData.map(({ _id, name, date, exercises, isImplementation }) => ({
        _id,
        name,
        date,
        isImplementation,
        exercises: exercises.map(
            ({
                _id: innerId,
                name: exerciseName,
                replays,
                weight,
                approaches,
                isImplementation: exerciseIsImplementation,
            }) => ({
                _id: innerId,
                name: exerciseName,
                replays,
                weight,
                approaches,
                isImplementation: exerciseIsImplementation,
            }),
        ),
    }));

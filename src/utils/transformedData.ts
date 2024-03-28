import { ActivityData } from '../types/Types';

export const transformedData = (originalData: ActivityData[]) =>
    originalData.map(({ _id, name, date, exercises, isImplementation }) => ({
        _id,
        name,
        date,
        isImplementation,
        exercises: exercises.map(
            ({ name, replays, weight, approaches, isImplementation, _id }) => ({
                _id,
                name,
                replays,
                weight,
                approaches,
                isImplementation,
            }),
        ),
    }));

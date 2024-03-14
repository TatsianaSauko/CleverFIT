import { ActivityData } from "../types/Types";

export const transformedData = (originalData: ActivityData[]) => {
    return originalData.map(({ _id, name, date, exercises }) => ({
      _id,
      name,
      date,
      exercises: exercises.map(({ name, replays, weight, approaches, isImplementation }) => ({
        name,
        replays,
        weight,
        approaches,
        isImplementation
      }))
    }));
  };

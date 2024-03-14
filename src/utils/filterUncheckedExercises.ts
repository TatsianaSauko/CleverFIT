import { ActivityData } from "../types/Types";

export function filterUncheckedExercises(res: ActivityData) {
    const filteredExercises = res.exercises.filter(exercise => !exercise.checked);
    res.exercises = filteredExercises;
    return res;
}

import { ActivityData } from "../types/Types";

export function filterEmptyExercises(res: ActivityData) {
    const filteredExercises = res.exercises.filter(exercise => exercise.name.trim() !== "" && !exercise.checked && !exercise.isImplementation);
    res.exercises = filteredExercises;
    return res;
}

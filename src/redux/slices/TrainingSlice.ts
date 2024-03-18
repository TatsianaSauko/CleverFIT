import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrainingList, ActivityData, Exercise } from '../../types/Types';
import { RootState } from '@redux/configure-store';

type InitialState = {
    trainingList: TrainingList;
    activitiesData: ActivityData[];
    training: ActivityData;
    flag: Boolean;
    loadingTraining: Boolean;
};

const initialState: InitialState = {
    trainingList: [],
    activitiesData: [],
    training: {
        _id: crypto.randomUUID(),
        name: '',
        date: '',
        exercises: [
            {
                _id: crypto.randomUUID(),
                name: '',
                replays: undefined,
                weight: undefined,
                approaches: undefined,
                isImplementation: false,
                checked: false,
            },
        ],
    },
    flag: false,
    loadingTraining: false,
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setTrainingList(state, action: PayloadAction<{ trainingList: TrainingList }>) {
            state.trainingList = action.payload.trainingList;
        },

        setLoading(state, action: PayloadAction<{ loadingTraining: Boolean }>) {
            state.loadingTraining = action.payload.loadingTraining;
        },

        setActivitiesData(state, action: PayloadAction<{ activitiesData: ActivityData[] }>) {
            state.activitiesData = action.payload.activitiesData;
        },

        setNameTraining(state, action: PayloadAction<{ value: string }>) {
            state.training.name = action.payload.value;
        },

        setDateTraining(state, action: PayloadAction<{ date: string }>) {
            state.training.date = action.payload.date;
        },

        setTraining(state, action: PayloadAction<{ training: ActivityData }>) {
            state.training = action.payload.training;
        },
        setFlag(state, action: PayloadAction<{ flag: Boolean }>) {
            state.flag = action.payload.flag;
        },

        setTrainingFull(state) {
            state.training.exercises = [
                {
                    _id: crypto.randomUUID(),
                    name: '',
                    replays: undefined,
                    weight: undefined,
                    approaches: undefined,
                    isImplementation: false,
                },
            ];
        },

        setExercises(state, action: PayloadAction<{ exercise: Exercise; index: number }>) {
            const { exercise, index } = action.payload;
            const updatedExercises = [...state.training.exercises];
            updatedExercises[index] = exercise;
            state.training.exercises = updatedExercises;
        },

        cleanTraining(state) {
            state.training = {
                _id: crypto.randomUUID(),
                name: '',
                date: state.training.date,
                exercises: [
                    {
                        _id: crypto.randomUUID(),
                        name: '',
                        replays: undefined,
                        weight: undefined,
                        approaches: undefined,
                        isImplementation: false,
                        checked: false,
                    },
                ],
            };
        },

        createExercise(state) {
            state.training.exercises.push({
                _id: crypto.randomUUID(),
                name: '',
                replays: undefined,
                weight: undefined,
                approaches: undefined,
                isImplementation: false,
            });
        },
    },
});

export const {
    setTrainingList,
    setActivitiesData,
    setTrainingFull,
    setLoading,
    setFlag,
    setNameTraining,
    setExercises,
    setTraining,
    cleanTraining,
    createExercise,
    setDateTraining,
} = trainingSlice.actions;

export const trainingSelector = (state: RootState) => state.training;

export default trainingSlice.reducer;

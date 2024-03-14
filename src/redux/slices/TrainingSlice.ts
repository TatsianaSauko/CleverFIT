import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrainingList, ActivityData, Exercise } from '../../types/Types';
import { RootState } from '@redux/configure-store';

type InitialState = {
    trainingList: TrainingList;
    activitiesData: ActivityData[];
    training: ActivityData;
};

const initialState: InitialState = {
    trainingList: [],
    activitiesData: [],
    training: {
        name: '',
        date: '',
        exercises: [
            {
                name: '',
                replays: undefined,
                weight: undefined,
                approaches: undefined,
                isImplementation: false,
                checked: false
            },
        ]
    },

};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setTrainingList(state, action: PayloadAction<{ trainingList: TrainingList }>) {
            state.trainingList = action.payload.trainingList;
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

        // setExercises(state, action: PayloadAction<{ exercise: Exercise }>) {
        //     state.training.exercises.push(action.payload.exercise);
        // },

        // setExercises(state, action: PayloadAction<{ exercise: Exercise, id: number }>) {
        //     if (id) {
        //         state.training.exercises[id] =  action.payload.exercise;
        //     }

        // },

        // setExercises(state, action) {
        //     const { exercise, id } = action.payload;

        //     const updatedExercises = [...state.training.exercises];
        //     updatedExercises[id] = { ...exercise };

        //     return {
        //         ...state,
        //         training: {
        //             ...state.training,
        //             exercises: updatedExercises,
        //         },
        //     };
        // },

        // setExercise(state, action: PayloadAction<{ exercise: Exercise }>) {
        //     state.exercise.name = action.payload.exercise.name;
        //     state.exercise.replays = action.payload.exercise.replays;
        //     state.exercise.weight = action.payload.exercise.weight;
        //     state.exercise.approaches = action.payload.exercise.approaches;
        //     state.exercise.isImplementation = action.payload.exercise.isImplementation;
        // },

        cleanTraining(state) {
            state.training.name='';
            state.training.date='';
            state.training.exercises= [
                {
                    name: '',
                    replays: undefined,
                    weight: undefined,
                    approaches: undefined,
                    isImplementation: false
                },
            ];

        },
        createExercise(state) {
            state.training.exercises.push({
                name: '',
                replays: undefined,
                weight: undefined,
                approaches: undefined,
                isImplementation: false
            });
        },
    },
});

export const { setTrainingList, setActivitiesData, setNameTraining,setTraining, cleanTraining, createExercise, setDateTraining } = trainingSlice.actions;

export const trainingSelector = (state: RootState) => state.training;

export default trainingSlice.reducer;

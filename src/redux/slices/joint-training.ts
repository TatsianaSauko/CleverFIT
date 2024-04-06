import { RootState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Invite, TrainingPals, UserTrainingList } from '../../types/types';


type InitialState = {
    trainingPals: TrainingPals[];
    userJointTrainingList: UserTrainingList[];
    isUserList: boolean;
    inviteList: Invite[];
}

const initialState: InitialState = {
    trainingPals: [],
    userJointTrainingList: [],
    isUserList: false,
    inviteList:[]
};

export const jointTrainingSlice = createSlice({
    name: 'jointTraining',
    initialState,
    reducers: {
        setTrainingPals(state, action: PayloadAction<{ trainingPals: TrainingPals[] }>) {
            state.trainingPals = action.payload.trainingPals;
        },
        setUserJointTrainingList(state, action: PayloadAction<{ userJointTrainingList: UserTrainingList[] }>) {
            state.userJointTrainingList = action.payload.userJointTrainingList;
        },
        setIsUserList(state, action: PayloadAction<{isUserList:boolean}>){
            state.isUserList = action.payload.isUserList
        },

        setInviteList(state, action: PayloadAction<{inviteList: Invite[]}>){
            state.inviteList = action.payload.inviteList
        }

    },
});

export const { setTrainingPals, setUserJointTrainingList, setIsUserList,setInviteList  } = jointTrainingSlice.actions;

export const jointTrainingSelector = (state: RootState): InitialState => state.jointTraining;

export default jointTrainingSlice.reducer;

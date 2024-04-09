import { RootState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Invite, TrainingPals, UserTrainingList } from '../../types/types';

type InitialState = {
    trainingPals: TrainingPals[];
    userJointTrainingList: UserTrainingList[];
    userJointTrainingListWitchTrainingType: UserTrainingList[];
    isUserList: boolean;
    inviteList: Invite[];
    isTrainingPartnerFinderComponent: boolean;
};

const initialState: InitialState = {
    trainingPals: [],
    userJointTrainingList: [],
    userJointTrainingListWitchTrainingType: [],
    isUserList: false,
    inviteList: [],
    isTrainingPartnerFinderComponent: true,
};

export const jointTrainingSlice = createSlice({
    name: 'jointTraining',
    initialState,
    reducers: {
        setTrainingPals(state, action: PayloadAction<{ trainingPals: TrainingPals[] }>) {
            state.trainingPals = action.payload.trainingPals;
        },
        setUserJointTrainingList(
            state,
            action: PayloadAction<{ userJointTrainingList: UserTrainingList[] }>,
        ) {
            state.userJointTrainingList = action.payload.userJointTrainingList;
        },
        setUserJointTrainingListWitchTrainingType(
            state,
            action: PayloadAction<{ userJointTrainingListWitchTrainingType: UserTrainingList[] }>,
        ) {
            state.userJointTrainingListWitchTrainingType =
                action.payload.userJointTrainingListWitchTrainingType;
        },
        setIsUserList(state, action: PayloadAction<{ isUserList: boolean }>) {
            state.isUserList = action.payload.isUserList;
        },

        setInviteList(state, action: PayloadAction<{ inviteList: Invite[] }>) {
            state.inviteList = action.payload.inviteList;
        },
        setIsTrainingPartnerFinderComponent(
            state,
            action: PayloadAction<{ isTrainingPartnerFinderComponent: boolean }>,
        ) {
            state.isTrainingPartnerFinderComponent =
                action.payload.isTrainingPartnerFinderComponent;
        },
    },
});

export const {
    setTrainingPals,
    setUserJointTrainingList,
    setIsUserList,
    setInviteList,
    setUserJointTrainingListWitchTrainingType,
    setIsTrainingPartnerFinderComponent,
} = jointTrainingSlice.actions;

export const jointTrainingSelector = (state: RootState): InitialState => state.jointTraining;

export default jointTrainingSlice.reducer;

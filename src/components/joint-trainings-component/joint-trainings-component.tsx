import React from 'react';
import { useSelector } from 'react-redux';
import { MessagesComponent } from '@components/messages-component';
import { TrainingPartnerFinder } from '@components/training-partner-finder';
import { TrainingPartners } from '@components/training-partners';
import { UserList } from '@components/users-component';
import { jointTrainingSelector } from '@redux/slices/joint-training';

export const JointTrainingsComponent = () => {
    const { isUserList, inviteList } = useSelector(jointTrainingSelector);

    return(
    <div className='training-page__content'>

        {isUserList ? <UserList/>: <React.Fragment>
        {inviteList.length === 0 ? <MessagesComponent/> : null}
        <TrainingPartnerFinder/>
        <TrainingPartners/>
        </React.Fragment>}

    </div>
);}

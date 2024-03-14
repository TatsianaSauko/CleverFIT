import { ReactNode } from 'react';
import { ActivityData, Exercise, Feedback, FormFeedback } from './Types';
import { Moment } from 'moment';

export type CardProps = {
    title: string;
    link: string;
    icon: ReactNode;
    onClick: () => void;
};

export type ModalProps = {
    isModal: boolean;
    handleModalToggle: () => void;
    handleFeedbackSubmit: (formData: FormFeedback) => void;
};

export type ButtonSiderToggleProps = {
    collapsed: boolean;
    toggleCollapsed: () => void;
};

export type ModalErrorProps = {
    isModalGetData: boolean;
    handleModalToggle: () => void;
};
export type ModalTrainingProps = {
    onCancel: () => void;
    modalAddTraining: () => void;
    position: { top: number; left: number };
    dayOfWeek: number;
    dateMoment: Moment;
};
export type ModalEditTrainingProps = {
    backClick: () => void;
    position: { top: number; left: number };
    dayOfWeek: number;
    modalAddTraining: () => void;
};

export type ModalTrainingListErrorProps = {
    isModalTrainingList: boolean;
    handleModalToggle: () => void;
    update: () => void;
};

export type ModalFeedbackErrorProps = {
    isModalError: boolean;
    handleModalToggle: () => void;
    handleCreateFeedback: () => void;
};

export type ModalFeedbackSuccessProps = {
    isModalSuccess: boolean;
    handleModalToggle: () => void;
};

export type CommentItemProps = {
    data: Feedback;
};

export interface CalendarCellProps {
    value: moment.Moment | string;
}

export interface TrainingContentProps {
    value: ActivityData[];
    onClick: (value: string)=> void;
}
export interface FormAddTrainingProps {
    item: Exercise;
    index: number;
}

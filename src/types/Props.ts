import { ReactNode } from 'react';
import { Moment } from 'moment';

import { ActivityData, Exercise, Feedback, FormFeedback } from './Types';

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

export type ModalErrorSaveTrainingProps = {
    IsModalErrorSaveTraining: boolean;
    handleModalToggle: () => void;
};

export type ModalTrainingProps = {
    onCancel: () => void;
    position: { top: number; left: number };
    click: () => void;
};

export type ModalEditTrainingProps = {
    backClick: () => void;
    position: { top: number; left: number };
    modalAddTraining: () => void;
    closeModals: () => void;
};

export type ModalTrainingListErrorProps = {
    isModalTrainingList: boolean;
    handleModalToggle: () => void;
    update?: () => void;
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
    value: Moment;
}

export interface TrainingContentProps {
    value: ActivityData[];
    onClick: (value: string) => void;
}
export interface FormAddTrainingProps {
    item: Exercise;
    index: number;
}

export interface TrainingEditProps {
    onClick: () => void;
}

export type DrawerProps = {
    onClose: () => void;
    isDrawer: boolean;
};

export type DrawerTariffProps = {
    onClose: () => void;
    isDrawer: boolean;
    onModalPayment: () => void;
};

export type FileSizeExceedModalProps = {
    onClose: () => void;
    visible: boolean;
};

export type ModalErrorSaveDataProps = FileSizeExceedModalProps;

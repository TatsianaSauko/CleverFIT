import { ReactNode } from 'react';
import { Feedback, FormFeedback } from './Types';

export type CardProps = {
    title: string;
    link: string;
    icon: ReactNode;
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
    isModalGetFeedback: boolean;
    handleModalToggle: () => void;
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

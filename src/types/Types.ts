export type IRegister = {
    email: string;
    password: string;
};

export type ILogin = {
    email: string;
    password: string;
    remember: boolean;
};

export type ICheckEmail = {
    email: string;
};

export type IConfirmEmail = {
    email: string;
    code: string;
};

export type IChangePassword = {
    password: string;
    confirmPassword: string;
};

export type FormRegister = {
    email: string;
    password: string;
    confirm: string;
};

export type AxiosError = {
    response?: {
        status?: number;
        data?: {
            message?: string;
        };
    };
};

export type InitialState = {
    email: string;
    password: string;
    token: string;
    remember: boolean;
    loading: boolean;
};

export type EmailPayload = {
    email: string;
};

export type PasswordPayload = {
    password: string;
};

export type LoadingPayload = {
    loading: boolean;
};

export type LoginSuccessPayload = {
    token: string;
    remember: boolean;
};

export type IGetFeedback = {
    token: string;
};

export type Feedback = {
    createdAt: string;
    fullName: string | null;
    id: string;
    imageSrc: string | null;
    message: string;
    rating: number;
};

export type UserFeedback = {
    message: string;
    rating: number;
};

export type FormFeedback = {
    message: string;
    rating: number;
};

export type TrainingList = Training[];

export type Training = {
    name: string;
    key: string;
};
export type Exercise = {
    _id?: string;
    name: string;
    replays: number | undefined;
    weight: number | undefined;
    approaches: number | undefined;
    isImplementation?: boolean;
    checked?: boolean;
};

export type ActivityData = {
    _id?: string;
    name: string;
    date: string | number;
    isImplementation?: boolean;
    userId?: string;
    parameters?: {
        repeat: boolean;
        period: number;
        jointTraining: boolean;
        participants: [string];
    };
    exercises: Exercise[];
};

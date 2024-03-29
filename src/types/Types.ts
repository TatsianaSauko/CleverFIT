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
    name: string;
    replays: number | undefined;
    weight: number | undefined;
    approaches: number | undefined;
    isImplementation?: boolean;
    checked?: boolean;
    _id?: string;
};

type Parameters = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: [string];
};

export type ActivityData = {
    name: string;
    date: string | number;
    exercises: Exercise[];
    _id?: string;
    userId?: string;
    isImplementation?: boolean;
    parameters?: Parameters;
};

type Tariff = {
    tariffId: string;
    expired: string | number;
};

export type User = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string | number;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    password?: string;
    tariff?: Tariff;
};

export type FormUser = {
    email: string;
    firstName?: string;
    lastName?: string;
    birthday?: string | number;
    imgSrc?: string;
    password?: string;
    confirm?: string;
    readyForJointTraining?: boolean;
    sendNotification?: boolean;
};

type Periods = {
    text: string;
    cost: number;
    days: number;
};

export type TariffList = {
    _id: string;
    name: string;
    periods: Periods[];
};

export type TariffPayment = {
    tariffId: string;
    days: number;
};

export type DataTestId = {
    [key: string]: string;
};

export interface IRegister {
    email: string;
    password: string;
}
export interface ILogin {
    email: string;
    password: string;
    remember: boolean;
}
export interface ICheckEmail {
    email: string;
}
export interface IConfirmEmail {
    email: string;
    code: string;
}
export interface IChangePassword {
    password: string;
    confirmPassword: string;
}

export interface FormRegister {
    email: string;
    password: string;
    confirm: string;
}

export interface AxiosError {
    response?: {
        status?: number;
        data?: {
            message?: string;
        };
    };
}

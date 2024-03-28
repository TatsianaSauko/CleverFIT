import { passwordValidator } from './passwordValidator';

export const passwordRules = [
    {
        required: true,
        message: '',
        min: 8,
    },
    passwordValidator,
];

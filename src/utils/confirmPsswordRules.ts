import { confirmPasswordValidator } from './confirmPasswordValidator';

export const confirmPasswordRules = [
    {
        required: true,
        message: '',
    },
    confirmPasswordValidator,
];

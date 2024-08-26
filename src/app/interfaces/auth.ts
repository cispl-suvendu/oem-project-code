export interface RegisterData {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string
}

export interface LoginData {
    email: string;
    password: string;
}

export interface PasswordReset extends LoginData {
}
export interface IRegisterUser {
    email: string;
    username: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    role: "student" | "landlord" | "admin";
}

export interface ILoginUser {
    email: string;
    password: string;
}
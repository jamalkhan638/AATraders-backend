import { TokenPayload } from "../../types/token-payload.type";
export declare class Users {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isSuperAdmin: string;
    status: string;
    createdAt: Date;
    comparePassword(attempt: string): Promise<any>;
    toResponseObject(): TokenPayload;
    emailToLowerCase(): void;
    hashPassword(): Promise<void>;
}

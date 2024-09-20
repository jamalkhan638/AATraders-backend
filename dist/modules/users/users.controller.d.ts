import { SignupDto, UserUpdateDto } from './dto/users.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    register(data: SignupDto): Promise<{
        user: import("./user.entity").Users;
        token: string;
    }>;
    login(data: any): Promise<{
        user: import("../../types/token-payload.type").TokenPayload;
        token: string;
    }>;
    logOutUser(data: any): Promise<string>;
    getUser(id: number): Promise<import("./user.entity").Users>;
    updateUser(id: number, data: UserUpdateDto, headers: Headers): Promise<import("./user.entity").Users>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}

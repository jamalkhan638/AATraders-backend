import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Users } from './user.entity';
import { Connection, Repository } from 'typeorm';
import { Request } from 'express';
import { TokenPayload } from 'src/types/token-payload.type';
import { ConfigService } from 'nestjs-config';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, UserUpdateDto } from './dto/users.dto';
export declare class UsersService extends TypeOrmQueryService<Users> {
    private readonly usersRepository;
    private readonly jwtService;
    private readonly config;
    private readonly request;
    private readonly connection;
    constructor(usersRepository: Repository<Users>, jwtService: JwtService, config: ConfigService, request: Request, connection: Connection);
    getUser(id: number): Promise<Users>;
    getUsers(page: any, limit: any): Promise<any>;
    mysql_real_escape_string_func(str: any): any;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
    logOutUser(): Promise<string>;
    login(email: string, password: string): Promise<{
        user: TokenPayload;
        token: string;
    }>;
    private getJwtToken;
    register(data: SignupDto): Promise<{
        user: Users;
        token: string;
    }>;
    update(id: number, data: UserUpdateDto): Promise<Users>;
}

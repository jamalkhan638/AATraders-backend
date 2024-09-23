import { TypeOrmQueryService } from "@nestjs-query/query-typeorm";
import { Shop } from "./shop.entity";
import { Connection, Repository } from "typeorm";
import { Request } from "express";
import { ConfigService } from "nestjs-config";
import { JwtService } from "@nestjs/jwt";
export declare class ShopService extends TypeOrmQueryService<Shop> {
    private readonly shopRepository;
    private readonly jwtService;
    private readonly config;
    private readonly request;
    private readonly connection;
    constructor(shopRepository: Repository<Shop>, jwtService: JwtService, config: ConfigService, request: Request, connection: Connection);
    getShop(id: number): Promise<any>;
    getAllShops(): Promise<any>;
    deleteShop(id: number): Promise<string>;
    register(data: any): Promise<"alreadyexist" | "done">;
    addExpense(data: any): Promise<string>;
    getAllExpense(): Promise<any>;
    updateExpense(data: any, id: any): Promise<string>;
    deleteExpense(id: number): Promise<string>;
    deleteAllExpenses(): Promise<any>;
    mysql_real_escape_string_func(str: any): any;
    update(id: number, data: any): Promise<any>;
}

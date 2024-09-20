import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Product } from './products.entity';
import { Connection, Repository } from 'typeorm';
import { Request } from 'express';
import { ConfigService } from 'nestjs-config';
import { JwtService } from '@nestjs/jwt';
export declare class ProductService extends TypeOrmQueryService<Product> {
    private readonly productRepository;
    private readonly jwtService;
    private readonly config;
    private readonly request;
    private readonly connection;
    constructor(productRepository: Repository<Product>, jwtService: JwtService, config: ConfigService, request: Request, connection: Connection);
    getProducts(id: number): Promise<any>;
    getAllProducts(): Promise<any>;
    deleteProdcuct(id: number): Promise<string>;
    register(data: any): Promise<"alreadyexist" | "done">;
    mysql_real_escape_string_func(str: any): any;
    update(id: number, data: any): Promise<any>;
}

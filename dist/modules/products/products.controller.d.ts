import { Response } from 'express';
import { UpdateProductDto } from './dto/products.dto';
import { ProductService } from './products.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    register(data: any, headers: Headers, res?: Response): Promise<Response<any, Record<string, any>>>;
    getProduct(id: number, res?: Response): Promise<Response<any, Record<string, any>>>;
    getAllCandidates(res?: Response): Promise<Response<any, Record<string, any>>>;
    updateProduct(id: number, mydata: UpdateProductDto, headers: Headers, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteProduct(id: number): Promise<string>;
}

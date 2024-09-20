import { Response } from 'express';
import { updateShopDto } from './dto/shop.dto';
import { ShopService } from './shop.service';
export declare class ShopController {
    private readonly shopService;
    constructor(shopService: ShopService);
    register(data: any, headers: Headers, res?: Response): Promise<Response<any, Record<string, any>>>;
    getShop(id: number, res?: Response): Promise<Response<any, Record<string, any>>>;
    getAllCandidates(res?: Response): Promise<Response<any, Record<string, any>>>;
    updateShop(id: number, mydata: updateShopDto, headers: Headers, res: Response): Promise<Response<any, Record<string, any>>>;
    addExpense(data: any, headers: Headers, res?: Response): Promise<Response<any, Record<string, any>>>;
    udpateExpense(id: number, data: any, headers: Headers, res?: Response): Promise<Response<any, Record<string, any>>>;
    deleteExpense(id: number): Promise<string>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_dto_1 = require("./dto/products.dto");
const products_service_1 = require("./products.service");
const axios = require("axios").default;
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async register(data, headers, res) {
        try {
            var response = await this.productService.register(data);
            if (response == "alreadyexist") {
                return res.status(common_1.HttpStatus.OK).json({ statusCode: res.statusCode, statusMessage: "Product Already Exist", data: "Product Already Exist" });
            }
            else {
                return res.status(common_1.HttpStatus.OK).json({ statusCode: res.statusCode, statusMessage: "Product has been registered successfully", data: "Product has been registered successfully" });
            }
        }
        catch (ex) {
            throw ex;
        }
    }
    async getProduct(id, res) {
        try {
            if (!id)
                throw new common_1.HttpException('Please enter a valid id', common_1.HttpStatus.BAD_REQUEST);
            var response = await this.productService.getProducts(id);
            if (response) {
                return res.status(common_1.HttpStatus.OK).json({ statusCode: res.statusCode, statusMessage: "Product detail", data: response });
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({ statusCode: res.statusCode, statusMessage: "Something went wrong", data: "" });
            }
        }
        catch (ex) {
            ex;
        }
    }
    async getAllCandidates(res) {
        try {
            var response = await this.productService.getAllProducts();
            if (response) {
                return res.status(common_1.HttpStatus.OK).json({ statusCode: res.statusCode, statusMessage: "Products detail", data: response });
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({ statusCode: res.statusCode, statusMessage: "Something went wrong", data: "" });
            }
        }
        catch (ex) {
            ex;
        }
    }
    async updateProduct(id, mydata, headers, res) {
        try {
            if (!id)
                throw new common_1.HttpException('Please enter a valid id', common_1.HttpStatus.BAD_REQUEST);
            var response = await this.productService.update(id, mydata);
            if (response) {
                return res.status(common_1.HttpStatus.OK).json({ statusCode: res.statusCode, statusMessage: "Product has been updated successfully", data: response });
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({ statusCode: res.statusCode, statusMessage: "Something went wrong", data: "" });
            }
        }
        catch (ex) {
            throw ex;
        }
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                },
                weight: {
                    type: 'string'
                },
                unit: {
                    type: 'string'
                },
                productCode: {
                    type: 'string'
                },
                rateCode: {
                    type: 'string'
                },
                price: {
                    type: 'string'
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)('/prod/getAllProducts'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllCandidates", null);
__decorate([
    (0, common_1.Put)('/prod/:id'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                },
                weight: {
                    type: 'string'
                },
                unit: {
                    type: 'string'
                },
                productCode: {
                    type: 'string'
                },
                rateCode: {
                    type: 'string'
                },
                price: {
                    type: 'string'
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, products_dto_1.UpdateProductDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    (0, swagger_1.ApiTags)('Product'),
    __metadata("design:paramtypes", [products_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=products.controller.js.map
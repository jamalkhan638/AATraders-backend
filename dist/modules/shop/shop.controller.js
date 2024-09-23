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
exports.ShopController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shop_dto_1 = require("./dto/shop.dto");
const shop_service_1 = require("./shop.service");
const axios = require("axios").default;
let ShopController = class ShopController {
    constructor(shopService) {
        this.shopService = shopService;
    }
    async register(data, headers, res) {
        try {
            var response = await this.shopService.register(data);
            if (response == "alreadyexist") {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Shop Already Exist",
                    data: "shop Already Exist",
                });
            }
            else {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Shop has been registered successfully",
                    data: "Shop has been registered successfully",
                });
            }
        }
        catch (ex) {
            throw ex;
        }
    }
    async getShop(id, res) {
        try {
            if (!id)
                throw new common_1.HttpException("Please enter a valid id", common_1.HttpStatus.BAD_REQUEST);
            var response = await this.shopService.getShop(id);
            if (response) {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Shop detail",
                    data: response,
                });
            }
            else {
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Something went wrong",
                    data: "",
                });
            }
        }
        catch (ex) {
            ex;
        }
    }
    async getAllCandidates(res) {
        try {
            var response = await this.shopService.getAllShops();
            if (response) {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Shops detail",
                    data: response,
                });
            }
            else {
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Something went wrong",
                    data: "",
                });
            }
        }
        catch (ex) {
            ex;
        }
    }
    async updateShop(id, mydata, headers, res) {
        try {
            if (!id)
                throw new common_1.HttpException("Please enter a valid id", common_1.HttpStatus.BAD_REQUEST);
            var response = await this.shopService.update(id, mydata);
            if (response) {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Shop has been updated successfully",
                    data: response,
                });
            }
            else {
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Something went wrong",
                    data: "",
                });
            }
        }
        catch (ex) {
            throw ex;
        }
    }
    async deleteShop(id) {
        try {
            if (!id)
                throw new common_1.HttpException("Please enter a valid id", common_1.HttpStatus.BAD_REQUEST);
            return await this.shopService.deleteShop(id);
        }
        catch (ex) {
            throw ex;
        }
    }
    async addExpense(data, headers, res) {
        try {
            var response = await this.shopService.addExpense(data);
            if (response == "alreadyexist") {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Expense Already Exist",
                    data: "Expense Already Exist",
                });
            }
            else {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Expense has been registered successfully",
                    data: "Expense has been registered successfully",
                });
            }
        }
        catch (ex) {
            throw ex;
        }
    }
    async getAllExpense(res) {
        try {
            var response = await this.shopService.getAllExpense();
            if (response) {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Expense detail",
                    data: response,
                });
            }
            else {
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Something went wrong",
                    data: "",
                });
            }
        }
        catch (ex) {
            ex;
        }
    }
    async udpateExpense(id, data, headers, res) {
        try {
            var response = await this.shopService.updateExpense(data, id);
            if (response == "alreadyexist") {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Expense Already Exist",
                    data: "Expense Already Exist",
                });
            }
            else {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "Expense has been registered successfully",
                    data: "Expense has been registered successfully",
                });
            }
        }
        catch (ex) {
            throw ex;
        }
    }
    async deleteExpense(id) {
        try {
            if (!id)
                throw new common_1.HttpException("Please enter a valid id", common_1.HttpStatus.BAD_REQUEST);
            return await this.shopService.deleteExpense(id);
        }
        catch (ex) {
            throw ex;
        }
    }
    async deleteAllExpenses(res) {
        try {
            const response = await this.shopService.deleteAllExpenses();
            if (response.affectedRows > 0) {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "All expenses have been deleted successfully",
                    data: response,
                });
            }
            else {
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json({
                    statusCode: res.statusCode,
                    statusMessage: "No expenses found to delete",
                    data: "",
                });
            }
        }
        catch (ex) {
            throw new common_1.HttpException("Error occurred while deleting all expenses", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Post)("/register"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                },
                ntn: {
                    type: "string",
                },
                strn: {
                    type: "string",
                },
                contactPerson: {
                    type: "string",
                },
                address: {
                    type: "string",
                },
                cnic: {
                    type: "string",
                },
                cell: {
                    type: "string",
                },
                credit: {
                    type: "string",
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
], ShopController.prototype, "register", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "getShop", null);
__decorate([
    (0, common_1.Get)("/prod/getAllShops"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "getAllCandidates", null);
__decorate([
    (0, common_1.Put)("/shp/:id"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                },
                ntn: {
                    type: "string",
                },
                strn: {
                    type: "string",
                },
                contactPerson: {
                    type: "string",
                },
                address: {
                    type: "string",
                },
                cnic: {
                    type: "string",
                },
                cell: {
                    type: "string",
                },
                credit: {
                    type: "string",
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, shop_dto_1.updateShopDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "updateShop", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "deleteShop", null);
__decorate([
    (0, common_1.Post)("/addExpense"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                expenseType: {
                    type: "string",
                },
                expense: {
                    type: "string",
                },
                created_at: {
                    type: "string",
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
], ShopController.prototype, "addExpense", null);
__decorate([
    (0, common_1.Get)("/expense/getAllExpense"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "getAllExpense", null);
__decorate([
    (0, common_1.Put)("/udpateExpense/:id"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                expenseType: {
                    type: "string",
                },
                expense: {
                    type: "string",
                },
                created_at: {
                    type: "string",
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "udpateExpense", null);
__decorate([
    (0, common_1.Delete)("/expense/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "deleteExpense", null);
__decorate([
    (0, common_1.Delete)("/expenses/deleteAll"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "deleteAllExpenses", null);
ShopController = __decorate([
    (0, common_1.Controller)("Shop"),
    (0, swagger_1.ApiTags)("Shop"),
    __metadata("design:paramtypes", [shop_service_1.ShopService])
], ShopController);
exports.ShopController = ShopController;
//# sourceMappingURL=shop.controller.js.map
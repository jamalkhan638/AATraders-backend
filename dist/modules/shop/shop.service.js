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
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const query_typeorm_1 = require("@nestjs-query/query-typeorm");
const shop_entity_1 = require("./shop.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const core_1 = require("@nestjs/core");
const nestjs_config_1 = require("nestjs-config");
const jwt_1 = require("@nestjs/jwt");
var moment = require('moment');
const axios = require("axios").default;
let ShopService = class ShopService extends query_typeorm_1.TypeOrmQueryService {
    constructor(shopRepository, jwtService, config, request, connection) {
        super(shopRepository, { useSoftDelete: true });
        this.shopRepository = shopRepository;
        this.jwtService = jwtService;
        this.config = config;
        this.request = request;
        this.connection = connection;
    }
    async getShop(id) {
        try {
            var selectUserQuery = 'SELECT shops.* from shops where shops.id =' + id;
            var user = await this.connection.query(selectUserQuery);
            if (!user) {
                throw new common_1.NotFoundException(`User #${id} not found`);
            }
            return user[0];
        }
        catch (ex) {
            throw ex;
        }
    }
    async getAllShops() {
        try {
            var selectAllShops = 'SELECT * from shops';
            var getShopsList = await this.connection.query(selectAllShops);
            return getShopsList;
        }
        catch (ex) {
            throw ex;
        }
    }
    async deleteShop(id) {
        try {
            var delete_query = "DELETE from shops where id = " + id;
            var delete_query_execute = await this.connection.query(delete_query);
            if (delete_query_execute) {
                return "deleted";
            }
        }
        catch (ex) {
            throw ex;
        }
    }
    async register(data) {
        try {
            if (data.name) {
                let shopExist = await this.shopRepository.findOne({
                    where: { name: data.name }, withDeleted: true
                });
                if (shopExist) {
                    return "alreadyexist";
                }
            }
            const shop = new shop_entity_1.Shop();
            shop.name = data.name;
            shop.ntn = data.ntn;
            shop.strn = data.strn;
            shop.contactPerson = data.contactPerson;
            shop.channel = data.channel;
            shop.cell = data.cell;
            shop.credit = data.credit;
            shop.createdAt = moment().format('YYYY-MM-DD');
            var execute_user = await this.shopRepository.save(shop);
            if (execute_user) {
            }
            return "done";
        }
        catch (err) {
            throw err;
        }
    }
    async addExpense(data) {
        try {
            if (data.expenseType) {
                var selectUserQuery = 'SELECT id from expenses where type ="' + data.expenseType + '"';
                var expenseExist = await this.connection.query(selectUserQuery);
                if (expenseExist.length > 0) {
                    return "alreadyexist";
                }
            }
            var delete_query = "INSERT into expenses(type,expense)VALUES('" + data.expenseType + "','" + data.expense + "')";
            var delete_query_execute = await this.connection.query(delete_query);
            if (delete_query_execute) {
                return "done";
            }
        }
        catch (err) {
            throw err;
        }
    }
    async updateExpense(data, id) {
        try {
            var delete_query = "UPDATE expenses set type='" + data.expenseType + "',expense='" + data.expense + "' where  id =" + id;
            var delete_query_execute = await this.connection.query(delete_query);
            if (delete_query_execute) {
                return "done";
            }
        }
        catch (err) {
            throw err;
        }
    }
    async deleteExpense(id) {
        try {
            var delete_query = "DELETE from expenses where id = " + id;
            var delete_query_execute = await this.connection.query(delete_query);
            if (delete_query_execute) {
                return "deleted";
            }
        }
        catch (ex) {
            throw ex;
        }
    }
    mysql_real_escape_string_func(str) {
        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\" + char;
            }
        });
    }
    async update(id, data) {
        try {
            const shop = new shop_entity_1.Shop();
            shop.name = data.name;
            shop.ntn = data.ntn;
            shop.strn = data.strn;
            shop.contactPerson = data.contactPerson;
            shop.channel = data.channel;
            shop.cell = data.cell;
            shop.credit = data.credit;
            await this.shopRepository.update(id, shop);
            return await this.getShop(id);
        }
        catch (ex) {
            throw ex;
        }
    }
};
ShopService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shop_entity_1.Shop)),
    __param(3, (0, common_1.Inject)(core_1.REQUEST)),
    __param(4, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        nestjs_config_1.ConfigService, Object, typeorm_2.Connection])
], ShopService);
exports.ShopService = ShopService;
//# sourceMappingURL=shop.service.js.map
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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const query_typeorm_1 = require("@nestjs-query/query-typeorm");
const products_entity_1 = require("./products.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const core_1 = require("@nestjs/core");
const nestjs_config_1 = require("nestjs-config");
const jwt_1 = require("@nestjs/jwt");
var moment = require('moment');
const axios = require("axios").default;
let ProductService = class ProductService extends query_typeorm_1.TypeOrmQueryService {
    constructor(productRepository, jwtService, config, request, connection) {
        super(productRepository, { useSoftDelete: true });
        this.productRepository = productRepository;
        this.jwtService = jwtService;
        this.config = config;
        this.request = request;
        this.connection = connection;
    }
    async getProducts(id) {
        try {
            var selectUserQuery = 'SELECT products.* from products where products.id =' + id;
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
    async getAllProducts() {
        try {
            var selectAllProducts = 'SELECT * from products';
            var getproductsList = await this.connection.query(selectAllProducts);
            return getproductsList;
        }
        catch (ex) {
            throw ex;
        }
    }
    async deleteProdcuct(id) {
        try {
            var delete_query = "DELETE from products where id = " + id;
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
                let productsExist = await this.productRepository.findOne({
                    where: { name: data.name }, withDeleted: true
                });
                if (productsExist) {
                    return "alreadyexist";
                }
            }
            const product = new products_entity_1.Product();
            product.name = data.name;
            product.weight = data.weight;
            product.unit = data.unit;
            product.productCode = data.productCode;
            product.rateCode = data.rateCode;
            product.price = data.price;
            product.createdAt = moment().format('YYYY-MM-DD');
            var execute_user = await this.productRepository.save(product);
            if (execute_user) {
            }
            return "done";
        }
        catch (err) {
            throw err;
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
            const product = new products_entity_1.Product();
            product.name = data.name;
            product.weight = data.weight;
            product.unit = data.unit;
            product.productCode = data.productCode;
            product.rateCode = data.rateCode;
            product.price = data.price;
            await this.productRepository.update(id, product);
            return await this.getProducts(id);
        }
        catch (ex) {
            throw ex;
        }
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(3, (0, common_1.Inject)(core_1.REQUEST)),
    __param(4, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        nestjs_config_1.ConfigService, Object, typeorm_2.Connection])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=products.service.js.map